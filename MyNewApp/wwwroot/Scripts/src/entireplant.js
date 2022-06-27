import { LineChart } from './linechart.js';
import { calculateColors } from './colorArray.js';

function dayString(day) {

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"];

    return days[day];
}

function dateString(date) {

    if (date == 1) {
        return "1st";
    } else if (date == 2) {
        return "2nd";
    } else if (date == 3) {
        return "3rd";
    } else {
        return date + "th";
    }

}

/**
 * Author: Thomas Cotter
 * Function returns the data in a format that can be used by chart.js
 * @param {any} data
 */
function fixData(data) {

    let fixedData = [];

    let energyUse = []

    var dates = data.dow;
    var values = data.iar;

    for (var i in values) {

        var timeObject = new Date(dates[i]);
        var dataToAdd = (values[i].value)[1];
        var labelToAdd = dayString(timeObject.getDay()) + " " +
            dateString(timeObject.getDate()); 

        fixedData.push({
            label: labelToAdd,
            value: dataToAdd
        })

        var energyData = (values[i].value)[0];
        energyUse.push({
            label: labelToAdd,
            value: energyData
        });
    }

    var returnObject = [fixedData, energyUse];

    return returnObject;
}

/**
 * Author: Thomas Cotter
 * About: functional component to show the user that the data is loading*/
const Loading = () => {
    return (
        <p style={{
            textAlign: 'center', fontWeight: '700',
            fontSize: '3vh', marginBottom: '1vh',
            fontFamily: 'sans-serif'
        }}> Data Loading... </p>  
    )
}

/**
 * Author: Thomas Cotter
 * functional component to show the data for the efficiency of the turbine
 * @param {any} props
 */
const EfficiencyData = (props) => {

    var JBValue, SMValue;

    if (props.JB == "NaN" || props.JB < 0) {
        JBValue = "-"
    } else {
        JBValue = (props.JB).toFixed(5);
    }

    if (props.SM == "NaN" || props.SM < 0) {
        SMValue = "-"
    } else {
        SMValue = (props.SM).toFixed(5);
    }

    return (
        <div>
            <p style={{
                fontSize: '1.9vh', marginBottom: '0.5vh',
                marginTop: '0.5vh', fontFamily: 'sans-serif'
            }}> John Brown: {JBValue} MW/kg of {props.fuel} </p>
            <p style={{
                fontSize: '1.9vh', marginBottom: '0.5vh',
                marginTop: '0.5vh', fontFamily: 'sans-serif'
            }}> Solar Mars: {SMValue} MW/kg of {props.fuel} </p>
        </div>
    )
}

/**
 * Author: Thomas Cotter
 * About: class shows a graph showing the c02 production for that week and also a text box showing the efficiency of the turbine*/
export class EntirePlant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mainData: [],
            secondaryData: [],
            labels: [],
            dataLoadedR: false,
            turbineEfficiencyJBGas: 0,
            turbineEfficiencySMGas: 0,
            turbineEfficiencyJBDiesel: 0,
            turbineEfficiencySMDiesel: 0,
            dataLoadedE: false
        }

        this.getData = this.getData.bind(this);

        this.getData();

    }

    getData() {

        
        if (!(window.TestDataSource())) {

            var data = window.EntirePlantWeekData();
            var efficiencyData = window.TurbineEfficiency();
            var fuelUsage = window.FuelUsage();

            // this loads in the data needed for the graph displaying fuel / c02 usage.
            data.then((result) => {

                var fixedResult = fixData(result);

                var newLabels = fixedResult[0].map(d => d.label);
                var values = fixedResult[0].map(d => d.value);

                var colors = calculateColors(3);

                var tempData = [{
                    label: "C02 Output for the Entire Plant over the Last Week",
                    data: values,
                    borderColor: colors[0]
                }];

                fuelUsage.then((result) => {
                    var fixedResult = fixData(result);
                    var dieselData = fixedResult[0].map(d => d.value);
                    var gasData = fixedResult[1].map(d => d.value);

                    var chartData = [{
                        label: "Gas Use this Week",
                        data: gasData,
                        borderColor: colors[1]
                    }, {
                        label: "Diesel Use this Week",
                        data: dieselData,
                        borderColor: colors[2]
                    }]

                    var completedData = tempData.concat(chartData);

                    console.log(completedData);
                    this.setState({
                        mainData: completedData,  labels: newLabels, dataLoadedR: true
                    });

                });
            });

            // this loads in the data needed for the efficiency text box about both turbines   
            efficiencyData.then((result) => {
                this.setState({
                    dataLoadedE: true,
                    turbineEfficiencyJBGas: result[0],
                    turbineEfficiencySMGas: result[1],
                    turbineEfficiencyJBDiesel: result[2],
                    turbineEfficiencySMDiesel: result[3]
                });
            });

            

        }

    }

    render() {

        const titleStyle = {
            textDecoration: "underline", fontFamily: 'sans-serif',
            fontSize: '2.3vh', marginBottom: '1vh',
            fontWeight: 700
        }
        const smallTitleStyle = {
            fontSize: '2vh', fontFamily: 'sans-serif',
            fontWeight: 700, marginBottom: '0.6vh',
            marginTop: '0.6vh', textDecoration: 'underline'
        }

        const descriptionStyle = {
            backgroundColor: "white",
            height: "25vh", textAlign: 'center',
            minWidth: "50%",
            margin: 'auto',
            display: 'table'
        }

        return (
            <div style={{ display: "flex" }}>
                <div style={{ minWidth: '50%', height: '55vh'}}>
                    <LineChart
                        dataset={this.state.mainData}
                        yLabel="Tonnes"
                        labels={this.state.labels}
                    />
                </div>    

                    <div style={descriptionStyle}>

                        <p style={titleStyle}> Current Efficiency of Both Turbines </p>

                        <p style={smallTitleStyle}> Efficiency of Gas </p>

                        {this.state.dataLoadedE ?
                            <EfficiencyData JB=
                                {this.state.turbineEfficiencyJBGas}
                                SM={this.state.turbineEfficiencySMGas}
                                fuel="gas" /> : <Loading />}

                        <p style={smallTitleStyle}> Efficiency of Diesel </p>
                        {this.state.dataLoadedE ?
                            <EfficiencyData
                                JB={this.state.turbineEfficiencyJBDiesel}
                                SM={this.state.turbineEfficiencySMDiesel}
                                fuel="diesel" /> : <Loading />}                    
                    </div> 
                  
            </div>
        )
    }
}

ReactDOM.render(
    <EntirePlant />,
    document.getElementById('entireplant')
);

