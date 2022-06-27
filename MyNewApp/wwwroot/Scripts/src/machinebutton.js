/**
 * Author: Thomas Cotter
 * 
 * Date:   02/04/21
 * 
 * About:  This class is a button class that changes it's colour based on 
 *         which machine it pertains to and how that machine is performing.
 */
export class MachineButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            machineTag: props.tag,
            machineName: props.name,
            buttonColor : "green",
            dataGot: false
        }

        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.getData();
    }

    getData() {
        if (!this.state.dataGot) {
            var data = window.weeklyEmissionsState(this.state.machineTag);
            data.then((result) => {
                this.setState({ buttonColor: result["color"], dataGot: true });
            })
        }
    }

    handleClick() {
        this.props.handleClick(this.state.machineName);
    }

    render() {

        var buttonStyle = {
            backgroundColor: this.state.buttonColor
        }

        return (
            <button
                style={buttonStyle}
                onClick={this.handleClick} >

                {this.state.machineName}

            </button>
            )
    }         
}