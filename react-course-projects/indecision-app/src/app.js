class IndecisionApp extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Action/>
                <Options/>
                <AddOption/>
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
            <h1>Indecision</h1>
            <h2>Put your life in the hands of a computer.</h2>
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
                <h2>Options here</h2>
                <ol>
                <li><Option/></li>
                </ol>
            </div>
        )
    }
}
class Option extends React.Component {
    render() {
        return (
            <div>Option here</div>
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