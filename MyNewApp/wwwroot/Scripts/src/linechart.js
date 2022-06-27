export class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    /**
     * when component updates i.e the props changes, update the graph
     */
    componentDidUpdate() {
        this.myChart.data.labels = this.props.labels
        this.myChart.data.datasets = this.props.dataset;
        this.myChart.options.scales.yAxes[0].scaleLabel.labelString = this.props.yLabel;
        this.myChart.update();
    }

    /**
     * If a component in the DOM begins its lifetime, it has been mounted.
     * Will draw the chart using the labels and values given.
     */
    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            data: {
                labels: this.props.labels,
                datasets: this.props.dataset
            },
            options: {

                maintainAspectRatio: false,

                legend: {
                    labels: {
                        fontColor: '#000000',
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 0,
                            fontColor: "#000000"
                        },
                        gridLines: {
                            zeroLineColor: '#000000'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time',
                            fontColor: '#000000'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: '#000000',
                            beginAtZero: true,
                            suggestedMax: 100
                        },
                        gridLines: {
                            zeroLineColor: '#000000'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "",
                            fontColor: '#000000'
                        }
                    }]
                }
            }
        });
    }

    /**
     * Will return the graph drawn.
     */
    render() {
        return (
            <canvas ref={this.canvasRef}/>
        );
    }
}