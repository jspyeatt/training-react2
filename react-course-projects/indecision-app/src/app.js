class IndecisionApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: props.options
        }
        this.handleDeleteAllOptions = this.handleDeleteAllOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
    }

    componentDidMount(prevProps, prevState) {
        console.log("componentDidMount");
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
    }
    componentWillUnmount(prevProps, prevState) {
        console.log("componentWillUnmount");
    }
    // we define this method in the parent component, but
    // we pass it into the child component <Options> so it
    // can be called during Remove All.
    handleDeleteAllOptions() {
        console.log("handleDeleteAllOptions");
        this.setState(() => ({options: []}));
    }

    handleDeleteOption(optionToRemove) {
        console.log("handleDeleteOption", optionToRemove);
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove != option;
            })
        }));
    }
    handlePick() {
        console.log("handlePick");
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const selectedOption = this.state.options[randomNum];
        alert(selectedOption);
    }
    handleAddOption(option) {
        console.log("IndecisionApp: handleAddOption " + option);

        // In this case we are going to return an error string if
        // they didn't enter anything or in the else, if there is a 
        // duplicate. 
        // the normal behavior for this method would be to return undefined.
        // if a string is returned, there must be an error.
        if (!option) {
            return 'Error valid value!!';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'The value ' + option + ' already exists.';
        }

        // set the new state.
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer.';
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteAll={this.handleDeleteAllOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        )
    }
}
IndecisionApp.defaultProps = {
    options: []
}
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>);
};
Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}>
                What should I do?
            </button>
        </div>
    )
};

const Options = (props) => {
    return (
        <div>
            <h2>Options</h2>
            <button onClick={props.handleDeleteAll}>Remove All</button>
                {
                    props.options.map((option) => (
                        <Option 
                        key={option} 
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                        />
                        ))
                }
        </div>
    )
};

const Option = (props) => {
    return (
        <div>{props.optionText}
        <button 
        onClick={(e) => {
            props.handleDeleteOption(props.optionText)
        }}
        >
        remove
        </button>
        </div>
    )
}

class AddOption extends React.Component {

    // Need to setup the constructor because we need to bind handleAddOption.
    constructor(props) {
        super(props);
        this.handleAddOptionChild = this.handleAddOptionChild.bind(this);
        this.state = {
            error: undefined
        }
    }
    /*
     * we keep this handleAddOption method because there are still things
     * we really should do in the AddOption component. Specifically we
     * disable the form submission with e.preventDefault() and we pluck
     * the new value from the e.target.elements.optionButton.value so we
     * can pass that value up to the parent method.
     */
    handleAddOptionChild(e) {
        e.preventDefault();
        const option = e.target.elements.optionButton.value.trim();

        const errMsg = this.props.handleAddOption(option);  // CALLS the parent method, passing in the new value.
        this.setState(() => ({error: errMsg}));
        e.target.elements.optionButton.value = '';
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOptionChild}>
                    <input type='text' name="optionButton" />
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));