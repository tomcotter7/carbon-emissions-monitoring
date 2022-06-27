import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Performance } from './performance.js';
import { Emissions } from './emissions.js'


/**
 * Author: Thomas Cotter
 * 
 * About: This is used to list the machines relevant for the plant overview.
 */
const options = {
    "Water Pumps": {
        "Names": ["Water Pump A", "Water Pump B", "Water Pump C", "Water Pump D", "Water Pump E"],
        "FLC": ["ALB-FLC_P2302A.PV", "ALB-FLC_P2302B.PV", "ALB-FLC_P2302C.PV", "ALB-FLC_P2302D.PV", "ALB-FLC_P2302E.PV"],
        "Efficiency": ["ALB-FIC_23017.PV", "ALB-FIC_23020.PV", "ALB-FIC_23830.PV", "ALB-FIC_23930.PV", "ALB-FI_23354.PV"],
        "Constant": 4900
    }, 
    "Seawater Lift Pumps": {
        "Names": ["SWLP A", "SWLP B", "SWLP C"],
        "FLC": ["ALB-FLC_P2101A.PV", "ALB-FLC_P2101B.PV", "ALB-FLC_P2101C.PV"],
        "Efficiency": "",
        "Constant": 1220   
    },
    "Gas Compressors": {
        "Names": ["Gas Comp A", "Gas Comp B"],
        "FLC": ["ALB-FLC_K0801A.PV", "ALB-FLC_K0801B.PV"],
        "Efficiency": "",
        "Constant": 2380
    },
    "Export Pumps": {
        "Names": ["Export Pump A", "Export Pump B"],
        "FLC": ["ALB-FLC_P0521S.PV", "ALB-FLC_P0521.PV"],
        "Efficiency": "",
        "Constant": 280
    },
    "Coalescer Water Pumps": {
        "Names": ["Coalescer Water Pump A", "Coalescer Water Pump B", "Coalescer Water Pump C"],
        "FLC": ["ALB-FLC_P0321.PV", "ALB-FLC_P0321S.PV", "ALB-FLC_P0322.PV"],
        "Efficiency": "",
        "Constant": 90
    },
    "Other Pumps": {
        "Names": ["Test Seperator Pump", "Clean-up Separator Pump"],
        "FLC": ["ALB-FLC_P0401.PV", "ALB-FLC_P0402.PV"],
        "Efficiency": "",
        "Constant": 110
    },
}

/**
 * Author: Thomas Cotter
 * About: Usable time frames for insights
 */

const timeFrames = { "Month" : 30, "Week" : 7 , "Day": 1};
  
/**
* Author: Rohan Mistry + Thomas Cotter
* 
* Date: 10/03/2021
* 
* About: Displays the paragraph as well as the checkboxes
*        which will determine what content is displayed for the particular
*        machine.
*/
export class Insights extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: "Emissions",
            setOfMachines: "Water Pumps",
            emissions: true,
            performance: false,
            timeFrame: 30,
            capacity: 4900

        }

        this.onChangeValue = this.onChangeValue.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTimeFrameChange = this.handleTimeFrameChange.bind(this);
    }

    onChangeValue(event) {
        // the state is set to whatever button is pressed so we can show the 
        // data from here
        if (event.target.value == "Emissions") {
            this.setState({
                type: event.target.value, emissions: true,
                performance: false
            });
        } else if (event.target.value == "Performance") {
            this.setState({
                type: event.target.value, emissions:
                    false, performance: true
            });
        }
    }

    handleSelectChange(event) {
        this.setState({ setOfMachines: event.target.value, capacity: options[event.target.value]["Constant"] });
    }

    handleTimeFrameChange(event) {
        this.setState({ timeFrame: timeFrames[event.target.value] });
    }
    

    render() {


        const renderOption = item => <option key={item} value={item}>{item}
                                     </option>

        const selectOptions = Object.keys(options);
        const timeOptions = Object.keys(timeFrames);

        return (
            <div>
                <div style={{
                    fontWeight: 700,
                    transform: "scale(1.25)",
                    fontFamily: "sans-serif",
                    textAlign: 'center',
                    backgroundColor: 'white'
                }} onChange={this.onChangeValue}>

                    Time Period:    
                    <select onChange={this.handleTimeFrameChange}>
                        {timeOptions.map(renderOption)}
                    </select>
                    <br />

                    Machine:    
                    <select onChange={this.handleSelectChange}>
                        {selectOptions.map(renderOption)}
                    </select>   
                    <br />
                
                    <input type="radio" value="Emissions" name="insights" defaultChecked /> 
                    View Trend of Power Output for Machines
                    <br />
                    <input type="radio" value="Performance" name="insights" /> 
                    View Data for Machine Performance Analysis
                    <br />

                    
                
                </div>

                <br />


                <div style={{ height: '60vh' }}>
                    {this.state.emissions ? <Emissions tags={options[this.state.setOfMachines]["FLC"]} timeFrame={this.state.timeFrame} capacity={this.state.capacity} names={options[this.state.setOfMachines]["Names"]} /> : null}
                    {this.state.performance ? <Performance show={this.state.performance} machine={this.state.setOfMachines} timeFrame={this.state.timeFrame} names={options[this.state.setOfMachines]["Names"]} flc={options[this.state.setOfMachines]["FLC"]} eff={options[this.state.setOfMachines]["Efficiency"]} cons={options[this.state.setOfMachines]["Constant"]} /> : null}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Insights />,
    document.getElementById('insights')
);
