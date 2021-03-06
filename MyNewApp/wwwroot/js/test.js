$(function () {
    let currentDataSource = '';
    let currentTagNameFilter = '';
    let currentPage = 1;

    // Whenever the selected data source changes, 
    // the change will be emitted by this RxJS subject.
    const dataSourceSubject = new rxjs.Subject();
    const dataSource$ = dataSourceSubject
        .pipe(
            // Wait until a new data source is selected.
            rxjs.operators.distinctUntilChanged(),
            // Emit a filter that will search the new data source 
            // with the current tag name filter.
            rxjs.operators.map(function (dsn) {
                currentDataSource = dsn;
                currentPage = 1;
                return {
                    dataSourceName: currentDataSource,
                    tagNameFilter: currentTagNameFilter,
                    page: currentPage
                };
            })
        );

    // Whenever the tag name filter changes, the 
    // change will be emitted by this RxJS subject.
    const tagNameFilterSubject = new rxjs.Subject();
    const tagNameFilter$ = tagNameFilterSubject
        .pipe(
            // After a new tag name filter is set, #
            // wait 300ms in case the user is still typing.
            rxjs.operators.debounceTime(300),
            // Don't emit anything unless the value has changed.
            rxjs.operators.distinctUntilChanged(),
            // Emit a filter that will search the current data source 
            // with the new tag name filter.
            rxjs.operators.map(function (filter) {
                currentTagNameFilter = filter;
                currentPage = 1;
                return {
                    dataSourceName: currentDataSource,
                    tagNameFilter: currentTagNameFilter,
                    page: currentPage
                }
            })
        );

    // Whenever the results page for the tag search changes, 
    // the change will be emitted by this RxJS
    // subject.
    const pageSubject = new rxjs.Subject();
    const page$ = pageSubject
        .pipe(
            // Wait until the user pages forwards or backwards.
            rxjs.operators.distinctUntilChanged(),
            // Emit a filter that will search the current data source with 
            // the current tag name filter,
            // but with a different page number.
            rxjs.operators.map(function (page) {
                currentPage = page;
                return {
                    dataSourceName: currentDataSource,
                    tagNameFilter: currentTagNameFilter,
                    page: currentPage
                }
            })
        );

    // Merge the data source, tag name, and page number streams together.
    const tagSearchSubscription = rxjs.merge(dataSource$, tagNameFilter$,
        page$)
        .pipe(
            // Wait until the composite search filter has changed.
            rxjs.operators.distinctUntilChanged(function (x, y) {
                return x.dataSourceName === y.dataSourceName && x.tagNameFilter
                    === y.tagNameFilter && x.page === y.page;
            }),
            // Initial value for this observable.
            rxjs.operators.startWith({
                dataSourceName: currentDataSource,
                tagNameFilter: currentTagNameFilter,
                page: currentPage
            }),
            // Ignore items that don't have a data source name set.
            rxjs.operators.filter(function (f) {
                return f.dataSourceName ? true : false;
            }),
            // Call fetchTags for each composite search filter 
            // emitted by the observable and emit the
            // result instead.
            rxjs.operators.switchMap(fetchTags),
            // Make the observable "hot".
            rxjs.operators.share()
        )
        .subscribe(function (next) {
            if (currentPage === 1) {
                // This is a new tag name filter or data source name; 
                // replace the entire tag - container
                // element content.
                $('#tags-container').html(next.response);
            } else {
                // This is a new page of results for the current data 
                // source name and tag name filter;
                // replace the load-next-page element with the results.
                $('#load-next-page').replaceWith(next.response);
            }
        });

    // Whenever chart data must be loaded for a data source and tag, 
    // this information will be
    // emitted by this RxJS subject.
    const chartDataSubject = new rxjs.Subject();
    const chartDataSubscription = chartDataSubject
        .pipe(
            // Ignore items that don't define a data source name and a tag 
            // name.
            rxjs.operators.filter(function (v) {
                return v.dataSourceName && v.tagName ? true : false;
            }),
            // Call fetchChartData whenever an item is emitted by the 
            // stream and emit the result of
            // that function instead.
            rxjs.operators.switchMap(fetchChartData),
            // Make the observable "hot".
            rxjs.operators.share()
        )
        .subscribe(function (next) {

            /* DEBUG ONLY
             * Maps data loaded data to a dictionary for printing out
             * - Jacques
             */
            var data = next.next.response.map(function (v) {
                return {
                    x: new Date(v.utcSampleTime),
                    y: v.numericValue
                };
            });
            for (var i = 0; i < data.length; i++)
                console.log(data[i]);

            // Create and display a chart every time chart data is 
            // emitted by the observable.
            createChart(next.tagName, next.next.response);
        });

    function fetchTags(filter) {
        // Perform a tag search and emit the results using an RxJS observable.
        return rxjs.ajax.ajax({
            method: 'post',
            url: '@Url.Action("FindTags")',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                DataSourceName: filter.dataSourceName,
                TagNameFilter: filter.tagNameFilter,
                Page: filter.page
            },
            responseType: 'text'
        });
    }

    function fetchChartData(query) {
        // Perform a data query and emit the results using an RxJS observable.
        return rxjs.ajax.ajax({
            method: 'post',
            url: '@Url.Action("ChartData")',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                DataSourceName: query.dataSourceName,
                TagName: query.tagName,
            }
        }).pipe(
            // When we receive chart data from the server, emit an object 
            // that describes the data
            // source name, tag name, and the HTTP response.
            rxjs.operators.map(function (next) {
                /* DEBUG ONLY
                 * Shows that the data source selected by the user is the 
                 * same as what the query finds.
                 * We need to replicate this query in our site.js file.
                 * Either we may be able to achieve this with ajax, or 
                 * we could find put how to use rxjs.
                 * Worst case scenario, there's nothing stopping us 
                 * ditching site.js and writing our code
                 * within this <script> tag, but that would be too messy 
                 * for my liking.
                 * - Jacques
                 */
                console.log(document.getElementById("DataSourceName").value +
                    ": " + query.dataSourceName);
                return {
                    next: next, dataSourceName: query.dataSourceName,
                    tagName: query.tagName
                };
            })
        );
    }

    function createChart(tagName, tagValues) {
        // Create a ChartJS chart using the provided tag values.
        const ctx = $('#chart');
        let chart = ctx.data('chart');
        if (chart) {
            chart.destroy();
        }

        const vw = Math.max(document.documentElement.clientWidth ||
            0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight ||
            0, window.innerHeight || 0);

        ctx.attr('width', 0.8 * vw);
        ctx.attr('height', 0.6 * vh);

        const data = tagValues.map(function (v) {
            return {
                x: new Date(v.utcSampleTime),
                y: v.numericValue
            };
        });

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: tagName,
                    data: data,
                    backgroundColor: 'rgba(255, 152, 51, 0.2)',
                    borderColor: 'rgba(255, 152, 51, 1)',
                    pointBackgroundColor: 'rgba(255, 152, 51, 1)',
                    pointBorderColor: 'rgba(255, 102, 0, 1)',
                    pointHoverBackgroundColor: 'rgba(255, 102, 0, 0.8)',
                    pointHoverBorderColor: 'rgba(255, 152, 51, 1)'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        unit: 'hour'
                    }]
                }
            }
        });

        ctx.data('chart', chart);
        //$('#chart-modal').modal();
    }

    // Wire up data source name and tag name control event handlers.

    $('#DataSourceName').on('change', function () {
        $('#tag-name-filter').prop('disabled', false);
        dataSourceSubject.next($(this).val());
    });

    $('#tag-name-filter').on('keyup', function () {
        tagNameFilterSubject.next($(this).val());
    });

    // Loads the specified page number for the current data source 
    // name and tag name filter.
    window.loadPage = function (page) {
        pageSubject.next(page);
    }

    // Loads and displays chart data for the specified data 
    // source name and tag name.
    window.loadChart = function (dataSourceName, tagName) {
        chartDataSubject.next({
            dataSourceName: dataSourceName,
            tagName: tagName
        });
    }
});