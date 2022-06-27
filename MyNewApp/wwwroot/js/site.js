// Please see documentation at 
// https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify 
// static web assets.
// Write your JavaScript code.
// Use React or Angular
// Monitor certain processes
// Tag identification to trend (difficult)
// Data updadtes quickly, daily -> minute by minute
// display data in a number format, estimate too
// flaring - methane, gas as fuel - co2, diesel - co2
// measure electricity
// numbers similar between fuel and electricity generated
// machine learning for identification of data
// Ithica data

function getRegressionPrediction(dateTime) {
    $.ajax({
        type: "POST",
        url: "api/Insights",
        data: sDateTime = dateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) { console.log("Result: " + data); },
        error: function () { console.log("Prediction failed!"); }
    });
}

async function returnRegressionPrediction(dateTime) {
    let predictionPromise = await getRegressionPrediction(dateTime);

    return predictionPromise;
}

function getRegressionData() {
    return $.ajax({
        type: "POST",
        url: "api/Insights/Index",
        traditional: true,
        async: true,
        dataType: "json",
        success: function (data, status) { return data; },
        error: function () { console.log("Prediction failed!"); }
    });
}

function getRegressionAverage(dateTimes) {
    $.ajax({
        type: "POST",
        url: "api/Insights/RegressionAverage",
        data: sDateTimes = dateTimes,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) { console.log("Result: " + data); },
        error: function () { console.log("Prediction failed!"); }
    });
}



async function returnRegressionAverage(dateTimes) {
    let averagePromise = await getRegressionAverage(dateTimes);

    return averagePromise;
}

/**
 * Author: Joao Liang Xu
 * 
 * About: This major function is what loads and returns a bunch of values in a 
 *        certain interval. The pIntervals requires the most confusing variable: 
 *        just make it as high (1000, give or take). If you don't get as much
 *        data as you think you should, increase the value.
 *        
 * @param {any} pUrl
 * @param {any} pPoints
 * @param {any} pTag
 * @param {any} pDataSource
 * @param {any} pStartTime
 * @param {any} pEndTime
 */
function loadDataInInterval(pUrl, pIntervals, pTag, pDataSource,
    pStartTime, pEndTime)
{

    return $.ajax(
        {
            url: pUrl,
            type: "GET", 
            data: {
                points: pIntervals,

                tagNames: pTag,

                dataSourceName: pDataSource,

                startTime: pStartTime,
               endTime: pEndTime
           },
            // These three aren't that important to understand;
            // just know that you need them
            traditional: true,
            async: true,
            dataType: "json"
        }
    ).done(function (values) {
        //console.log(values);
        return values;
    });
}

/**
 * Author: Thomas Cotter
 * About: Similar to loadDataInInterval but has no interval, so the start time and end time can be decided in the c# code.
 * @param {any} pUrl
 * @param {any} pIntervals
 * @param {any} pTag
 * @param {any} pDataSource
 */

function loadDataNoInterval(pUrl, pIntervals, pTag, pDataSource) {
    return $.ajax(
        {
            url: pUrl,
            type: "GET",
            data: {
                points: pIntervals,

                tagNames: pTag,

                dataSourceName: pDataSource
            },
            traditional: true,
            async: true,
            dataType: "json"
        }
    ).done(function (values) {
        return values;
    });
}


/**
 * Author: Thomas Cotter
 * About: Some c# functions need the capacity of the machines to work so this needs to be passed in the Ajax call
 */

function loadDataWithCapacity(pUrl, pIntervals, pTag, pDataSource, pStartTime, pEndTime, pCapacity) {
    return $.ajax(
        {
            url: pUrl,
            type: "GET",
            data: {
                points: pIntervals,
                tagNames: pTag,
                dataSourceName: pDataSource,
                startTime: pStartTime,
                endTime: pEndTime,
                capacity: pCapacity
            },
            traditional: true,
            async: true,
            dataType: "json"
        }
    ).done(function (values) {
        //console.log(values)
        return values;
    });
}


/**
 * A constructor function that creates and object holding the
 * data loaded from a loadDataInInterval call, plus some functions
 * to interpret that data.
 * 
 * @param {any} rawData
 */
function DataSet(rawData) {
    this.rawData = rawData;

    /**
     * Converts the numeric values of the raw data into an array of decimals
     * and returns that array
     * @param {any} source
     * @param {any} tag
     */
    this.toNumericArray = function (source, tag) {
        const values = this.rawData[source][tag].values;

        return values.map(element => element.numericValue);
    };

    this.toTimeArray = function (source, tag) {
        const values = this.rawData[source][tag].values;

        return values.map(element => element.utcSampleTime);
    };
}

/**
 * Made a change to this so that it always defaults to the ithaca dataset for now - we can change it back if we need but just makes things easier for now.*/
function getCurrentDataSource() {
    /*var DataSourceName = document.getElementById("DataSourceName");
    return DataSourceName.value;*/
    return "7404BBBA5A773C7AC89411978E9B7F415B939B0DBC6B3C5B17AD59251D587B6A.Alba PI Historian";
}

/**
 * Author: Jacques Yon
 * 
 * About: Returns data from a tag since a given number of hours ago; 
 *        eventually allow it to return that data using .then
 * 
 * @param {any} tag
 * @param {any} hours
 */
async function getDataSince(tag, hours) {
    var now = new Date();
    var then = new Date();
    then.setHours(then.getHours() - hours);

    let rawData = await loadDataInInterval("api/DataLoad/values", 1000, tag,
        getCurrentDataSource(), then.toISOString(), now.toISOString());
    let dataSet = new DataSet(rawData);

    return dataSet;
}

/**
 * Author: Joao Liang Xu
 * 
 * About: Returns data from a tag since a given number months
 *        Eventually allow it to return that data using .then
 *
 * @param {any} tag
 * @param {any} hours
 */
async function getDataSinceMonth(tag, month) {
    var now = new Date();
    var then = new Date();
    then.setMonth(then.getMonth() - month);

    let rawData = await loadDataInInterval("api/DataLoad/values", 1000, tag,
        getCurrentDataSource(), then.toISOString(), now.toISOString());
    let dataSet = new DataSet(rawData);

    return dataSet;
}

/**
 * Contains all the tags that are important.
 */
var importantTags = ["ALB-JI_52402.PV", "ALB-XI_51004.PV",
    "ALB-FI_27905.PV", "ALB-JB_G1.FQLM1", "ALB-JI_52802.PV", "ALB-XI_51800.PV",
    "ALB-FI_27904.PV", "ALB-FLC_P2302A.PV", "ALB-FIC_23017.PV",
    "ALB-FLC_P2302B.PV", "ALB-FIC_23020.PV", "ALB-FLC_P2302C.PV",
    "ALB-FIC_23830.PV", "ALB-FLC_P2302D.PV", "ALB-FIC_23930.PV",
    "ALB-FLC_P2302E.PV", "ALB-FI_23354.PV", "ALB-FLC_P2101A.PV",
    "ALB-FLC_P2101B.PV", "ALB-FLC_P2101C.PV", "ALB-FLC_K0801A.PV",
    "ALB-FLC_K0801B.PV", "ALB-FLC_P0521S.PV", "ALB-FLC_P0521.PV",
    "ALB-FLC_P0321.PV", "ALB-FLC_P0321S.PV", "ALB-FLC_P0322.PV",
    "ALB-FLC_P0401.PV", "ALB-FLC_P0402.PV"];

/**
 * Contains all the tags related to the two turbines for the Alba North 
 * Platform.
 */
var machines = {
    JohnBrownFramo6: {
        name: "John Brown Framo 6",
        tags: ["ALB-JI_52402.PV", "ALB-XI_51004.PV",
            "ALB-FI_27905.PV", "ALB-JB_G1.FQLM1"]
    },
    SolarMars: {
        name: "Solar Mars",
        tags: ["ALB-JI_52802.PV", "ALB-XI_51800.PV", "ALB-FI_27904.PV"]
    }
};

function getMachine(machine, hours) {
    var machineDataPromise = getDataSince(machine.tags, hours);

    machineDataPromise.then((result) => {
        console.log(result.rawData);
    });

}

function JohnBrown() {
    getMachine(machines.JohnBrownFramo6, 24);
}
function SolarMars() {
    getMachine(machines.SolarMars, 24);
}

/**
 * Authors: Jacques Yon, Joao Liang Xu, Housu Zhang
 * 
 * About: Takes input from a temporary html form in Index.cshtml and loads data 
 *        from a given number of hours
 * 
 *        Takes the data and exports the array into a CSV file.
 *        Downloads the file onclick 
 *        
 *        Add labels at the top.
 * 
 * @param {any} form
 * 
 */
function getDataCSV(form) {
    var tag = document.getElementById("mlHelperTag");
    var hours = document.getElementById("mlHelperHours");
    var dataPromise = getDataSince(tag.value, hours.value);
    dataPromise.then((result) => {
        var numericValues = result.toNumericArray(getCurrentDataSource(),
            tag.value);
        var timeValues = result.toTimeArray(getCurrentDataSource(), tag.value);

        console.log("Numeric Values: ");
        var numericValuesOutput = "";

        var rows = new Array();



        for (var i = 0; i < numericValues.length+1; i++) {
            numericValuesOutput += numericValues[i] + ",";
            rows[i] = new Array();
            if (i == 0) {
                rows[i].push("values");
            }
            else {
                rows[i].push(numericValues[i-1]);
            }
            
        }
        console.log(numericValuesOutput);

        console.log("Time Values: ");
        var timeValuesOutput = "";
        for (var j = 0; j < timeValues.length+1; j++) {
            timeValuesOutput += timeValues[j] + ",";
            if (j == 0) {
                rows[j].push("time");
            }
            else {
                rows[j].push(timeValues[j-1]);
            }
            
        }
        console.log(timeValuesOutput);

        let csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); 

        link.click();
    });

    return false;
}

/**
 * Author: Thomas Cotter
 * About: function to load ALL the data into a csv.
 */
function makeCSVForPCA() {
    var now = new Date();
    var then = new Date();
    then.setMonth(then.getMonth() - 1);
    loadDataInInterval("api/TrainingData/PCASetUp", 1000, "",
        getCurrentDataSource(), then.toISOString(), now.toISOString()); 
}

/**
 * Author : Thomas Cotter
 * Date: 18/02/21
 * @param {any} tagName The name of tag we should look at the data for.
 * About: Function returns data in a 24 hour period in an array containing 
 *        just the returned values. Calls a query in DashboardController.cs
 */

var getDashboardData = async function (tagName) {
    var now = new Date();
    var aDayAgo = new Date();
    aDayAgo.setHours(aDayAgo.getHours() - 24);

    // this now uses the Dashboard controller to load in data to fix an issue 
    // with the promise.
    let data = await loadDataInInterval("api/Dashboard/DashboardValues", 1000,
        tagName,
        getCurrentDataSource(), aDayAgo.toISOString(), now.toISOString());

    return data;
}


/**
 * Author: Thomas Cotter
 * Date: 28/02/21
 * About: Function will call a query to return data about the turbines - 
 *        used for calculating the total energy usage. Calls a function in
 *        DashboardController.cs*
 */

var getTurbineData = async function () {

    var now = new Date();
    var aDayAgo = new Date();
    aDayAgo.setHours(aDayAgo.getHours() - 24);

    let data = await loadDataInInterval("api/Dashboard/DashboardTurbineValues",
        100000,
        (machines.JohnBrownFramo6.tags).concat(machines.SolarMars.tags),
        getCurrentDataSource(), aDayAgo.toISOString(), now.toISOString())

    return data;
}

/**
 * Author: Bolaji Adewale
 * 
 * About: Collects all the data into one
 * 
 * @param {any} form
 */
var WaterPumps = {
    WaterPumpA: { name: "Water Pump A", flc: ["ALB-FLC_P2302A.PV"] },
    WaterPumpB: { name: "Water Pump B", flc: ["ALB-FLC_P2302B.PV"] },
    WaterPumpC: { name: "Water Pump C", flc: ["ALB-FLC_P2302C.PV"] },
    WaterPumpD: { name: "Water Pump D", flc: ["ALB-FLC_P2302D.PV"] },
    WaterPumpE: { name: "Water Pump E", flc: ["ALB-FLC_P2302E.PV"] }
};

var SeaWaterLiftPump = {
    SeaWaterLiftPumpA: {},
    SeaWaterLiftPumpB: {},
    SeaWaterLiftPumpC: {},
};

var insightsData = async function () {

    var now = new Date();
    var aMonthAgo = new Date();
    aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

    var data = await loadDataInInterval("api/Insights/AverageEmissions", 100000,
        (machines.JohnBrownFramo6.tags).concat(machines.SolarMars.tags).concat(
            WaterPumps.WaterPumpA.flc).concat(WaterPumps.WaterPumpB.flc).concat(
                WaterPumps.WaterPumpC.flc).concat(WaterPumps.WaterPumpD.flc).concat(
                        WaterPumps.WaterPumpE.flc),
        getCurrentDataSource(), aMonthAgo.toISOString(), now.toISOString())
}


var EmissionsDataForCSV = async function () {

    var now = new Date();
    var aYearAgo = new Date();
    aYearAgo.setUTCFullYear(aYearAgo.getFullYear() - 1);

    var data = await loadDataInInterval("api/Insights/EmissionsToCSV", 100000,
        (machines.JohnBrownFramo6.tags).concat(machines.SolarMars.tags),
        getCurrentDataSource(), aYearAgo.toISOString(), now.toISOString())
}





/**
 * Author: Thomas Cotter
 * Date: 02/04/21
 * About: function calls a function in dashboard controller for the buttons to know if they are red or not
 * @param {any} tagName - the id of the tag to work out the color of.
 */
var weeklyEmissionsState = async function (tagName) {
    var now = new Date();
    var aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);

    let color = await loadDataInInterval("api/Dashboard/WeeksAverage", 100000, [tagName], getCurrentDataSource(), aWeekAgo.toISOString(), now.toISOString());

    return color;
}

/**
 * Author : Thomas Cotter
 * Date: 18/02/21 
 * About: function returns whether the user has selected a data source, returns true if not selected
 */
var testDataSource = function () {

    if (getCurrentDataSource() == "Select a data source") {
        return true;
    } else { return false; }
}


/**
 * Author: Thomas Cotter
 * Date: 09/04/21
 * About: function calls the c02 emission data function 7 times to produce a week's worth of data for the plant 
 */

var entirePlantWeekData = async function () {
    let data = loadDataNoInterval("api/Dashboard/EntirePlantC02Data", 100000, (machines.JohnBrownFramo6.tags).concat(machines.SolarMars.tags), getCurrentDataSource());
    return data;
}

/**
 * Author: Thomas Cotter
 * Date: 13/04/21
 * About: function calls a controller method to get efficiency of both turbines.
 * */

var turbineEfficiency = async function () {

    var now = new Date();
    var aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);

    let data = loadDataInInterval("api/Dashboard/TurbineEfficiency", 100000, (machines.JohnBrownFramo6.tags).concat(machines.SolarMars.tags), getCurrentDataSource(), aWeekAgo.toISOString(), now.toISOString());
    return data;
}

/**
 * Author: Thomas Cotter
 * Date: 28/04/21
 * About: function will get the total through put of n machines over time period t*/

var insightsEfficiency = async function (tags, timeFrame) {

    var now = new Date();
    // temp for now will eventually be passed in
    var start = new Date();
    start.setDate(start.getDate() - timeFrame);

    let data = loadDataInInterval("api/Insights/Throughput", 100000, tags, getCurrentDataSource(), start.toISOString(), now.toISOString());

    return data;
}

/**
 * Author: Thomas Cotter
 * Date: 03/05/21
 * About: function returns the diesel / gas usage for the last week */

var fuelUsage = async function () {
    let data = loadDataNoInterval("api/Dashboard/FuelUsage", 100000, ["ALB-FI_27905.PV", "ALB-JB_G1.FQLM1", "ALB-FI_27904.PV", "ALB-JI_52802.PV"], getCurrentDataSource());
    return data;
}

/**
 * Author: Thomas Cotter
 * Date: 07/05/21
 * About: function to call bolajis code about emissions for specific plants*/

var insightsEmissions = async function (tags, capacity, timeFrame) {

    var now = new Date();
    var start = new Date();
    start.setDate(start.getDate() - timeFrame);

    let data = loadDataWithCapacity("api/Insights/EmissionsForMachines", 10000, tags, getCurrentDataSource(), start.toISOString(), now.toISOString(), capacity);
    return data;


}

/**
 * Author: Thomas Cotter
 * About: function to get data from ML model*/
var MLRegression = async function () {

    let data = await getRegressionData();
    return data;                 

}


var MLCSV = async function () {
    var now = new Date();
    var start = new Date();
    start.setMonth(start.getMonth() - 12);

    let data = loadDataInInterval("api/Insights/EmissionsToCSV", 10000, ["ALB-JI_52402.PV", "ALB-FI_27905.PV", "ALB-JB_G1.FQLM1"], getCurrentDataSource(), start.toISOString(), now.toISOString());

    return data;

}

// Window functions - allows the functions written in site.js to be called from other .js files that we are using.
window.TurbineEfficiency = turbineEfficiency;
window.TestDataSource = testDataSource;
window.GetDashboardData = getDashboardData;
window.GetTurbineData = getTurbineData;
window.WeeklyEmissionsState = weeklyEmissionsState;
window.EntirePlantWeekData = entirePlantWeekData;
window.InsightsData = insightsData;
window.InsightsEfficiency = insightsEfficiency;
window.FuelUsage = fuelUsage;
window.InsightsEmissions = insightsEmissions;
window.MLRegression = MLRegression;
window.MLCSV = MLCSV;

$("#machine_learning_helper").submit(function (e) {
    e.preventDefault();
});