import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, setSortByAmount, setSortByDate, setStartDate, setEndDate } from '../actions/filters';
import { isMoment, moment } from 'moment';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        console.log('onDatesChange()');
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = ((calendarFocused) => {
        this.setState(() => ({ calendarFocused: calendarFocused }))
    });

    render() {
        return (
            <div>
                <input
                    type='text'
                    value={this.props.filters.text} onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                    }} />
                <select
                    value={this.props.filters.sortBy}
                    onChange={(e) => {
                        const v = e.target.value;
                        switch (v) {
                            case 'date':
                                this.props.dispatch(setSortByDate());
                                return;
                            case 'amount':
                                this.props.dispatch(setSortByAmount());
                                return;
                        }
                    }}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};
export default connect(mapStateToProps)(ExpenseListFilters);