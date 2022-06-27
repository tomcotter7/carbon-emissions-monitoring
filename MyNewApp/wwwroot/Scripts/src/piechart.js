export class PieChart extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.data);
        this.myChart.data.datasets[0].backgroundColor = this.props.colors;
        this.myChart.update();
    }


    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'doughnut',
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    data: this.props.data.map(d => d.data),
                    backgroundColor: this.props.colors
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: '#000000',
                    }
                }
            }
        });
    }


    render() {
        return (
            <canvas ref={this.canvasRef} />
        );
    }


}