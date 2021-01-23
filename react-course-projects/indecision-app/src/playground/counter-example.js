class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {  // we define all the pieces of state we want in the class.
            count: 0
        }
    }

    componentDidMount(prevProps, prevState) {

        const json = localStorage.getItem('count');
        if (json) {
            const newValue = parseInt(json, 10);
            if (!isNaN(newValue)) {
                this.setState(() => {
                    return { count: newValue };
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        if (prevState.count != this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }
    handleAddOne() {
        console.log("handleAddOne");
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });
    }
    handleMinusOne() {
        console.log("handleMinusOne");
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }
    handleReset() {
        console.log("handleReset");
        this.setState(() => {
            return {
                count: 0
            };
        })
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter count={3} />, document.getElementById('app'));