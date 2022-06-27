
import { calculateColors } from './colorArray.js';
import { LineChart } from './linechart.js';

/**
 * Author: Thomas Cotter
 * About: A react component to show the user details about emissions for specific machines*/
export class Emissions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            lables: []
        }

        this.getData = this.getData.bind(this);
        this.getData();
    }

    getData() {


        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - this.props.timeFrame);
        var numberOfMachines = this.props.tags.length;
        let newLabels = [];
        let newData = [];
        var colors = calculateColors(numberOfMachines);


        for (var i = 1; i < this.props.timeFrame; i++) {
            newLabels.push(currentDate.getDate() + "/" + (currentDate.getMonth()+1)+ "/" + currentDate.getFullYear());
            currentDate.setDate(currentDate.getDate() + 1);
        }

        var data = window.InsightsEmissions(this.props.tags, this.props.capacity, this.props.timeFrame);

        data.then((result) => {

            for (var i = 0; i < numberOfMachines; i++) {
                var dataset = {
                    label: this.props.names[i],
                    data: result[i],
                    borderColor: colors[i],
                    pointRadius: "0.001"   
                }

                newData.push(dataset);
            }

            

            this.setState({ data: newData, label: newLabels });

        });


    }

    // if the time frame changes then request new data with the new time frame.
    componentDidUpdate(prevProps) {
        if (prevProps.timeFrame != this.props.timeFrame || prevProps.tags != this.props.tags) {
            this.getData();
        }
    }

    render() {

        return (

            <LineChart dataset={this.state.data} labels={this.state.label} yLabel={"MW"} />
            
        )


    }
}