import { LineChart } from './linechart.js';
import { calculateColors } from './colorArray.js';

const options = {
    "WI Pump A": "ALB-FLC_P2302A.PV",
    "WI Pump B": "ALB-FLC_P2302B.PV",
    "WI Pump C": "ALB-FLC_P2302C.PV", 
    "WI Pump D": "ALB-FLC_P2302D.PV", 
    "WI Pump E": "ALB-FLC_P2302E.PV", 
    "SWLP A": "ALB-FLC_P2101A.PV",
    "SWLP B": "ALB-FLC_P2101B.PV", 
    "SWLP C": "ALB-FLC_P2101C.PV",
    "Gas Comp A": "ALB-FLC_K0801A.PV",
    "Gas Comp B": "ALB-FLC_K0801B.PV", 
    "Export Pump A": "ALB-FLC_P0521S.PV", 
    "Export Pump B": "ALB-FLC_P0521.PV", 
    "Coalescer Water Pump A": "ALB-FLC_P0321.PV", 
    "Coalescer Water Pump B": "ALB-FLC_P0321S.PV", 
    "Coalescer Water Pump C": "ALB-FLC_P0322.PV", 
    "Test Seperator Pump": "ALB-FLC_P0401.PV",
    "Clean-up Separator Pump": "ALB-FLC_P0402.PV"
};


function fixData(array) {
    let data = [];
    for (var i in array) {
        var timeData = array[i];
        if (timeData["numericValue"] != 'NaN' && timeData["numericValue"] <= 100) {
            data.push(timeData["numericValue"]);
        }
    }

    return data;
}

function convertHour(hour) {

    if (hour < 12) {
        return hour + ":00 AM";
    } else {
        return hour + ":00 PM";
    }

}

/**
 * Author: Thomas Cotter
 * About: This React components display a graph showing the FLC% of all machines on the plant
 * */
export class ChartDataset extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chartData: [],
            labels: [],
            dataLoaded: false
        };

        this.getData = this.getData.bind(this);
        this.getData();
    }

    async getData() {

        

        let newLabels = []
        let newDataset = []

        var start = new Date();
        start.setHours(start.getHours() - 24);

        for (var i = 0; i < 24; i++) {
            newLabels.push(convertHour(start.getHours()));
            start.setHours(start.getHours() + 1);
        }

        var colors = calculateColors(Object.keys(options).length);

        var j = 0;
        for (var i in options) {
            var data = window.getDashboardData(options[i]);
            await data.then((result) => {
                var dataset = {
                    label: i,
                    data: fixData(result["tagValues"]),
                    borderColor: colors[j],
                    pointRadius: "0.001"
                }

                newDataset.push(dataset);                
            })
            j += 1;
        }

        this.setState({ chartData: newDataset, labels: newLabels, dataLoaded: true });
    }

    render() {
        return (
            <div style={{ minWidth: '50%', height: '55vh' }}>
                { this.state.dataLoaded ? < LineChart dataset={this.state.chartData} labels={this.state.labels} yLabel={"FLC%"} /> : null} 
            </div>
        )
    }
}