import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format());

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: (props.expense) ? props.expense.description : '',
            note: (props.expense) ? props.expense.note : '',
            amount: (props.expense) ? (props.expense.amount / 100).toString() : '',
            createdAt: (props.expense) ? moment(props.expense.createdAt): moment(),
            calendarFocused: false,
            errorMessage: ''
        };
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
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onDateFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    };
    onSubmit = (e) => {
        e.preventDefault();

        // validate description and amount
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ errorMessage: "You must specify description and amount." }));
        } else {
            this.setState(() => ({ errorMessage: "" }));

            // call the onSubmit property function value passed in with the <ExpenseForm> tag.
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 10,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <div>
                {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
                <form onSubmit={this.onSubmit}>
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
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onDateFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
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