class IndecisionApp extends React.Component {

    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer.';
        const options = ['Thing one', 'Thing two'];
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action />
                <Options options={options} />
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
    handlePick() {
        console.log('handlePick');
    }
    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        )
    }
}


class Options extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }
    handleRemoveAll() {
        console.log('Remove all',this.props.options);
    }
    render() {
        return (
            <div>
                <h2>Options</h2>
                <button onClick={this.handleRemoveAll}>Remove All</button>
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