import jsPDF from 'jspdf';
import { LineChart } from './linechart.js';


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Author: Tom Cotter
 * About: this calls the machine learning algorithm to give a prediction of what the c02 emissions over the next year will be
 */
class Analysis extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalC02Emissions: 0,
            chartData: [],
            labels: []
        };

        this.generateReport = this.generateReport.bind(this);
        this.getData = this.getData.bind(this);
        this.getData();
    }

    generateReport() {

        var doc = new jsPDF();

        doc.advancedAPI(doc => {

            doc.setFontSize(25);           
            doc.text("C02 Emissions Prediction for the next year", 25, 20,);
            doc.setFontSize(10);
            doc.text("The total amount of C02 you are expected to use is: " + this.state.totalC02Emissions + " tonnes", 10, 30);

            doc.text(10, 40, "Breakdown by month is below:");

            for (var i = 0; i < 12; i++) {
                doc.text((10), (50 + i * 5), this.state.labels[i] + ":" + this.state.chartData[0]["data"][i] + " tonnes");
            }

            doc.save("prediction-report.pdf", { returnPromise: true }).then(() => { alert("PDF render all done!") });
        })
    }

    getData() {

       
        let newLabels = [];
        let newData = [];

        var now = new Date();

        for (var j = 0; j < 12; j++) {
            newLabels.push(months[now.getMonth()] + " " + now.getFullYear());
            now.setMonth(now.getMonth() + 1);

        }

        // TODO: fix newLabels to show months

        var data = window.MLRegression();
        data.then((result) => {

            for (var i = 0; i < (result.length); i += 2) {

                // change this to per month rather than per hour

                newData.push(parseFloat(result[i + 1]));
            }

            var finalData = [{
                label: "C02 Emissions Prediction",
                data: newData,
                borderColor: "#437DBF",
                pointRadius: "0.001"
            }]

            
            var sum = newData.reduce((a, b) => a + b);
        

            this.setState({ chartData: finalData, labels: newLabels, totalC02Emissions: sum });
        });
    }
    
    render() {

        const pStyle = {
            display: 'table', margin: 'auto',
            backgroundColor: 'white', textAlign: 'center',
            fontSize: 16, fontFamily: 'sans-serif'
        };

       
        return (
            <div style={{ textAlign: 'center' }}>

                <p style={pStyle}>
                    Please select a data source and then wait. A chart will be shown on screen showing our predictions for your c02 usage over the next year. It will also display a total, so you can figure out if this is above or below target.
                    Clicking generate report will download this information into a usable pdf.
                </p>

                <br />

                <button onClick={() => this.generateReport()}>Generate Report</button>

                <br />
                <br />


                <div style={{ textAlign: 'center' }}>

                    <p style={pStyle}> The total predicted emissions over the next year: {(this.state.totalC02Emissions).toFixed(3)} tonnes</p>

                    <br />
                    <br />

                    <div style={{ height: "55vh" }}>
                        <LineChart dataset={this.state.chartData} labels={this.state.labels} yLabel={"Tonnes"} />
                    </div>
                </div>
            </div>);
    }
}

ReactDOM.render(
    <Analysis/>,
    document.getElementById("analysis")
);


