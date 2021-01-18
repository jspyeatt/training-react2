class IndecisionApp extends React.Component {
    
    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer.';
        const options = ['Thing one', 'Thing two'];
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action/>
                <Options options={options}/>
                <AddOption/>
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
                <button>What should I do?</button>
            </div>
        )
    }
}
class Options extends React.Component {
    render() {
        return (
            <div>
                <h2>Options</h2>
                <ol>
                {
                    this.props.options.map((option) => <Option optionText={option}/>)
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
            <li key={v}>{v}</li>
        )
    }
}
class AddOption extends React.Component {
    render() {
        return (
            <div>Add Here</div>
        )
    }
}

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));