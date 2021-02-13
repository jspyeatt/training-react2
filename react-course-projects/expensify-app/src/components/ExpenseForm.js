import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format());

export default class ExpenseForm extends React.Component {
    state = {
        description: '',
        note: '',
        amount: '',
        createdAt: moment(),
        calendarFocused: false
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
    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }));
    };
    onDateFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
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
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onDateFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=> false}
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