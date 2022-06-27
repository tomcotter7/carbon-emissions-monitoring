import { LineChart } from './linechart.js';
import { MachineButton } from './machinebutton.js';
import { ChartDataset } from './chartdataset';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

/**
 * Author: Thomas Cotter
 * 
 * Hardcoded metadata due to the poor nature of the data we can 
 * get from the API.
 * 
 */
const options = {
    "WI Pump A": ["ALB-FLC_P2302A.PV", 4900, "FLC%"],
    "WI Pump B": ["ALB-FLC_P2302B.PV", 4900, "FLC%"],
    "WI Pump C": ["ALB-FLC_P2302C.PV", 4900, "FLC%"],
    "WI Pump D": ["ALB-FLC_P2302D.PV", 4900, "FLC%"],
    "WI Pump E": ["ALB-FLC_P2302E.PV", 4900, "FLC%"],
    "SWLP A": ["ALB-FLC_P2101A.PV", 1220, "FLC%"],
    "SWLP B": ["ALB-FLC_P2101B.PV", 1220, "FLC%"],
    "SWLP C": ["ALB-FLC_P2101C.PV", 1220, "FLC%"],
    "Gas Comp A": ["ALB-FLC_K0801A.PV", 2380, "FLC%"],
    "Gas Comp B": ["ALB-FLC_K0801B.PV", 2380, "FLC%"],
    "Export Pump A": ["ALB-FLC_P0521S.PV", 280, "FLC%"],
    "Export Pump B": ["ALB-FLC_P0521.PV", 280, "FLC%"],
    "Coalescer Water Pump A": ["ALB-FLC_P0321.PV", 90, "FLC%"],
    "Coalescer Water Pump B": ["ALB-FLC_P0321S.PV", 90, "FLC%"],
    "Coalescer Water Pump C": ["ALB-FLC_P0322.PV", 90, "FLC%"],
    "Test Seperator Pump": ["ALB-FLC_P0401.PV", 110, "FLC%"],
    "Clean-up Separator Pump": ["ALB-FLC_P0402.PV", 110, "FLC%"],
    "Accommodation": ["ALB-II_52423.PV", 11, "Amps"],
    "General Service 1": ["ALB-II_52415.PV", 11, "Amps"],
    "General Service 2": ["ALB-II_52417.PV", 11, "Amps"],
    "Essential Services": ["ALB-II_52431.PV", 11, "Amps"],
    "Drilling 1": ["ALB-II_52433.PV", 11, "Amps"],
    "Drilling 2": ["ALB-II_52425.PV", 11, "Amps"]
};

/**
 * Author: Thomas Cotter + Rohan Mistry (added more comments)
 * 
 * Date: 16/02/2021
 * 
 * @param {any} array Converts the loaded data into an array format
 *                    so it is easy to manipulate to display the line 
 *                    chart easily.
 * 
 * About: Converts the read-in data into an array format so that we can 
 *        easily display the data as a line graph format.
 */
function convertToReadable( array ) {
    let data = [];
    // data currently here is an empty array structure to be manipulated.

    for (var i in array) {
        var timeData = array[i]; // for any value in array, get the data 
                                 // for each time.

        var timeObject = new Date(timeData['utcSampleTime']);
        var labelToAdd = timeObject.getDate() + "/" + timeObject.getMonth()
            + " - " + timeObject.toLocaleTimeString();

        if (timeData['numericValue'] != 'NaN') {
            data.push({
                label: labelToAdd,
                value: timeData["numericValue"]
            });
        }
    }

    return data;
}

/**
 * Author: Thomas Cotter
 * Date: 4/5/21
 * About: converts an hour to a nice time label
 * @param {any} hour
 */
function convertHour(hour) {

    if (hour < 12) {
        return hour + ":00 AM";
    } else {
        return hour + ":00 PM";
    }

}

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.chartRef = React.createRef();

        this.state = {
            typeOfMachine: "",
            machineName: "",
            tagName: "asdasd",
            mainData: [],
            totalEnergyConsumedToday: 0,
            totalC02BurntToday: 0,
            totalCostToday: 0,
            turbineDataSet: false,
            hoursOnline: null,
            averageFLC: 0,
            dlr: 0,
            machineAvgConsumption: 0,   
            machineAvgEne: 0,
            machineCost: 0,
            machineC02: 0,
            buttonClicked: false,
            labels: []
        };

        this.getData = this.getData.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.revertBack = this.revertBack.bind(this);
    }

    /**
     * Author: Thomas Cotter
     * 
     * Date: 08/03/21
     * 
     * About: Handles when the user changes what machine they want to look at.
     * 
     * @param {any} event the event of clicking on a new machine
     */
    handleTagChange(name) {
        this.setState({
            machineName: name,
            tagName: options[name][0],
            dlr: options[name][1],
            typeOfMachine: options[name][2],
            buttonClicked: true
        }, function () {
                this.scrollToBottom();
                this.getData();
        });
    }

    /**
     * Author: Thomas Cotter
     * 
     * Date: 02/04/21
     * 
     * About: Scrolls to the bottom of the dashboard when the user clicks a 
     *        button
     */
    scrollToBottom() {
        this.chartRef.current.scrollIntoView({ behaviour: 'smooth' });
    }

    /**
     * Author: Thomas Cotter + Rohan Mistry (added more comments)
     * 
     * Date: 16/02/21
     * 
     * About: Gets the data from the selected tag and updates the component
     *        state once the data has veen returned.
     */
    getData() {

        // If no datasource has been selected - don't try to load any tag data.
        if (!(window.testDataSource()) && this.state.buttonClicked) {
   
            // if the turbine data hasn't been set before then set it.
            if (this.state.turbineDataSet == false) {
                var turbineData = window.getTurbineData();

                turbineData.then((result) => {

                    var energy = result[0];
                    var co2 = result[1];
                    var cost = result[2];

                    var ratio = this.state.machineAvgEne / energy;
                    var singleMachineCost = ratio * cost;
                    var singleMachineC02 = ratio * co2;
                    
                    this.setState({
                        totalEnergyConsumedToday: energy,
                        totalC02BurntToday: co2,
                        totalCostToday: cost,
                        machineCost: singleMachineCost,
                        machineC02: singleMachineC02,
                        turbineDataSet: true
                    });
                })
            } 
            var machineData = window.getDashboardData(this.state.tagName);

            machineData.then((result) => {
                // once data returns perform the calculations on it.

                var values = convertToReadable(result["tagValues"]);

                var tempData = [{
                    label: this.state.machineName,
                    data: values.map(d => d.value),
                    borderColor: "#4C30FF"
                }]

                let newLabels = []

                var start = new Date();
                start.setHours(start.getHours() - 24);

                for (var i = 0; i < 24; i++) {
                    newLabels.push(convertHour(start.getHours()));
                    start.setHours(start.getHours() + 1);
                }


                // returns the number of hours the machine was on for.

                var timeOnline = result["timeOnline"];
                
                // returns a filtered array with just the 
                // numeric values of the data.
                var numericValues = result["tagValues"].filter(function (elem)
                {
                    if (elem.numericValue == 'NaN' || elem.numericValue == 0) {
                        return false;
                    }
                    return true;
                }).map(element => element.numericValue);

                var nvAvg = 0;

                // if the machine was online during the 24 hours,
                // then work out the average value.
                if (timeOnline != 0) {
                    nvAvg = numericValues.reduce((a, b) => a + b, 0)
                        / numericValues.length;
                }

                var averageConsumption = 0;

                if (this.state.typeOfMachine == "FLC%") {

                    var averageConsumption = ((nvAvg / 100) * this.state.dlr);

                } else {

                    var averageConsumption = ((nvAvg) * this.state.dlr * 0.95
                        * Math.sqrt(3));
                }

                var energyUsage = averageConsumption * timeOnline;

                var ratio = (energyUsage) /
                    (this.state.totalEnergyConsumedToday);

                var singleMachineCost = ratio * this.state.totalCostToday;
                var machineC02Prod = ratio * this.state.totalC02BurntToday;

                // updates the state of the dashboard to contain the new data.
                this.setState({
                    machineAvgEne: energyUsage,
                    machineAvgConsumption: averageConsumption,
                    mainData: tempData,
                    labels: newLabels,
                    averageFLC: nvAvg,
                    hoursOnline: timeOnline,
                    machineCost: singleMachineCost,
                    machineC02: machineC02Prod
                });
            })
        }
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
            this.setState({ turbineDataSet: false })
            this.getData();
            // If data been mounted on DOM, refresh data 
            // every "60" seconds for the tag.
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID); // clear the mounted data from DOM.
    }

    revertBack() {
        this.setState({ buttonClicked: false });
    }
 
    render() {
        const renderOption = item =>
            <MachineButton key={item} name={item} tag={options[item][0]}
                handleClick={(name) => { this.handleTagChange(name) }} />
 
        const selectOptions = Object.keys(options);

        return (
            <div className="Dashboard" style={{
                fontFamily: "sans-serif"
            }}>
                <div
                    style={{
                        flexWrap: 'wrap',
                        textAlign: 'center'
                    }}
                >
                        {selectOptions.map(renderOption)}
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                {this.state.buttonClicked ? null : < ChartDataset />}
               
                {/*
                 * Author: Rohan Mistry
                 * 
                 * Date:   05/03/2021
                 * 
                 * About:  Used a table format to nicely display the 
                 *         averages above the line graph.
                 */}
                {this.state.buttonClicked ? < div >

                <div style={{ textAlign: 'center' }}>
                    <button onClick={() => this.revertBack()}> Entire Plant View </button>
                </div>

                <br />

                <div ref={this.chartRef} />
                <Table style={{
                    backgroundColor: 'orange',
                    textAlign: 'center'
                }}>
                        <Thead style={{
                            textDecoration: 'underline',
                        }}>
                        <Tr>
                            <Th>Average {this.state.typeOfMachine}:</Th>
                                <Th>Average Power Consumption:</Th>
                                <Th>Energy Consumed Last 24-Hours:</Th>
                                <Th>CO2 Production Last 24-Hours</Th>
                                <Th>Cost of Running Last 24-Hours</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td>{(this.state.averageFLC).toFixed(3)}</Td>
                            <Td>{(this.state.machineAvgConsumption).toFixed(3)}
                                kW</Td>
                            <Td>{(this.state.machineAvgEne).toFixed(3)}
                                kWh</Td>
                            <Td>{(this.state.machineC02).toFixed(3)}
                                tonnes</Td>
                            <Td>€{(this.state.machineCost).toFixed(2)}</Td>
                            </Tr>
                    </Tbody>
                </Table>

                <div style={{ minWidth: '100%', height: '54vh' }}>
                    <br />
                    <LineChart
                            dataset={this.state.mainData} // returns the data
                            labels={this.state.labels}
                            yLabel={this.state.typeOfMachine}
                        />
                    </div>
                    <br />
                </div>
                : <br /> }
                
            </div>
        );
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('dashboard')
);