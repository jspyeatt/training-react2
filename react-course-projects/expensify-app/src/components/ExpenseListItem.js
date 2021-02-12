import React from 'react';
import {connect} from 'react-redux'
import {removeExpense} from '../actions/expenses';
const ExpenseListItem = ({description, amount, createdAt, id, dispatch}) => (
    <div>
        <span>{description}</span>
        <span>{amount}</span>
        <span>{createdAt}</span>
        <span>
            <button onClick={(e) => {
                console.log('remove hit', id);
                dispatch(removeExpense({id:id}));
            }}>Remove</button>
            </span>
    </div>
);
export default connect()(ExpenseListItem);