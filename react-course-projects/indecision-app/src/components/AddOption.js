import React from 'react';
export default class AddOption extends React.Component {
        state = {
            error: undefined
        }
        handleAddOptionChild = (e) => {
            e.preventDefault();
            const option = e.target.elements.optionButton.value.trim();
            const errMsg = this.props.handleAddOption(option);  // CALLS the parent method, passing in the new value.
            this.setState(() => ({ error: errMsg }));
            if (!errMsg) {
                e.target.elements.optionButton.value = '';
            }
        }
    /*
     * we keep this handleAddOption method because there are still things
     * we really should do in the AddOption component. Specifically we
     * disable the form submission with e.preventDefault() and we pluck
     * the new value from the e.target.elements.optionButton.value so we
     * can pass that value up to the parent method.
     */

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