class IndecisionApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: ['One', 'Two', 'Three']
        }
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
    }

    // we define this method in the parent component, but
    // we pass it into the child component <Options> so it
    // can be called during Remove All.
    handleDeleteOptions() {
        console.log("handleDeleteOptions");
        this.setState(() => {
            return {
                options: []
            };
        });
    }

    handlePick() {
        console.log("handlePick");
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const selectedOption = this.state.options[randomNum];
        alert(selectedOption);
    }
    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer.';
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action 
                hasOptions={this.state.options.length > 0} 
                handlePick={this.handlePick}
                />
                <Options 
                options={this.state.options} 
                handleDelete={this.handleDeleteOptions}
                />
                <AddOption />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>);
    }
}

class Action extends React.Component {

    render() {
        return (
            <div>
                <button 
                onClick={this.props.handlePick}
                disabled={!this.props.hasOptions}>
                    What should I do?
                </button>
            </div>
        )
    }
}


class Options extends React.Component {
    render() {
        return (
            <div>
                <h2>Options</h2>
                <button onClick={this.props.handleDelete}>Remove All</button>
                <ol>
                    {
                        this.props.options.map((option) => <Option key={option} optionText={option} />)
                    }
                </ol>
            </div>
        )
    }
}
class Option extends React.Component {
    render() {
        const v = this.props.optionText;
        return (
            <li>{v}</li>
        )
    }
}
class AddOption extends React.Component {
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.optionButton.value.trim();
        if (option) {
            console.log('adding option', option);
        }
        e.target.elements.optionButton.value = '';
    }
    render() {
        return (
            <form onSubmit={this.handleAddOption}>
                <input type='text' name="optionButton" />
                <button>Add Option</button>
            </form>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));