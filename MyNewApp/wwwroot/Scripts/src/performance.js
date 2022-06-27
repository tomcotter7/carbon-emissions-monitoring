import { PieChart } from './piechart.js';
import { calculateColors } from './colorArray.js';


// a simple stateless component to show the user when data is loading
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
 * A react component that contains a pie chart displaying efficiency for the water pumps and a short description explaining what the pie chart is to the user
 * @param {any} props
 */

export class Performance extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            arrayData: [],
            colors: [],
            show: false,
            unit: "" 
        }

        this.getData = this.getData.bind(this);
        this.getData();
    }


    // gets the efficiency in m^3 / kW for each machine passed in (only works for water pumps atm because data is not good)
    getData() {

        var flcTags = this.props.flc;
        var effTags = this.props.eff;
        var constant = this.props.cons;
        var names = this.props.names;
        

        var data = window.InsightsEfficiency(flcTags.concat(effTags), this.props.timeFrame);
        data.then((result) => {
            
            var throughput = result.l1;
            var flc = result.l2;

            let energy = [];

            for (var i in flc) {
                energy.push((flc[i] * constant) / 1000);
            }

            var newColors = calculateColors(flc.length);

            let results = [];

            throughput.forEach((t, index) => {
                var dataToAdd = 'NaN';
                if (energy[index] != 0) {
                    dataToAdd = t / (energy[index]);    
                }
                results.push({
                    label: names[index],
                    data: dataToAdd
                });
            })

            // arrayData is when will be passed into the pie chart as a dataset, colors are the randomly generated colors for the slices
            // TODO: update colors to not be random
            this.setState({ arrayData: results, show: true, colors: newColors })
         
        });

    }

    // if the time frame changes then request new data with the new time frame.
    componentDidUpdate(prevProps) {
        if (prevProps.timeFrame != this.props.timeFrame) {
            this.getData();
        }
    }

    render() {

        const titleStyle = {
            textDecoration: "underline", fontFamily: 'sans-serif',
            fontSize: '2.3vh', marginBottom: '1vh',
            fontWeight: 700
        }

        return (
            <div style={{ minWidth: '100%', display: "flex", height: '54vh' }}>

                <div style={{ minWidth: '48%', height: '54vh' }}>
                    {this.state.show ? <PieChart title={this.props.machine} data={this.state.arrayData} colors={this.state.colors} /> : <Loading />}
                </div>

                <div style={{ minWidth: '48%', height: '54vh', margin: 'auto', textAlign: 'center' }}>
                    <div style={{ backgroundColor: 'white', height: '15vh'}}>
                    <p style={titleStyle} > Explanation of Graph </p>
                    <p style={{ fontSize: '1vh' }}> Anything in the key that is crossed out, has not been turned on in this time period </p>
                        <p style={{ fontSize: '1vh' }}> If anything isn't crossed out, but is not showing on the graph, this means that the machine was using energy but didn't do anything with that energy (i.e. 0% efficiency) </p>
                        <p style={{ fontSize: '1vh' }}> The unit for the pie chart is m<sup>3</sup> / MWh </p>

                    </div>
                </div>
            </div>
        );
    }


}