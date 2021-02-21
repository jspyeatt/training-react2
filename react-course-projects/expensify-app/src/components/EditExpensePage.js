import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm
                expense={props.expense}        // adding the expense property to ExpenseForm and pass in the props.expense which was found in mapStateToProps
                onSubmit={(expense) => {
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />
            <span>
                <button onClick={(e) => {
                    console.log('remove hit', props.expense.id);
                    props.dispatch(removeExpense({ id: props.expense.id }));
                    props.history.push('/');
                }}>Remove</button>
            </span>
        </div>
    );
};
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;  // return true if the expense.id matches the prop id passed in.
        })
    }
};
export default connect(mapStateToProps)(EditExpensePage);