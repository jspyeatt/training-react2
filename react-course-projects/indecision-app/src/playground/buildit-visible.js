const appRoot = document.getElementById("app");
const textId = "textId";

class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visible: false
        };
    }
    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visible: !prevState.visible
            }
        })
    }
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>{this.state.visible ? "Hide" : "Show"}</button>
                {this.state.visible && <div><p id={textId}>Showing text</p></div>}
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle />, appRoot);
