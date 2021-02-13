import React from 'react';

export default class ExpenseForm extends React.Component {
    state = {
        description: '',
        note: '',
        amount: ''
    }

    // add a class method to handle the change in the description
    onDescriptionChange = (e) => {
        const desc = e.target.value;
        this.setState(() => ({ description: desc }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <textarea
                        value={this.state.note}
                        onChange={this.onNoteChange}
                        placeholder="Add a note"></textarea>
                    <button>
                        Add Expense
                    </button>
                </form>
            </div>
        )
    }
}