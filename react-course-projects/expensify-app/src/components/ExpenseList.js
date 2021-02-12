import React from 'react';
import {connect} from 'react-redux';
const ExpenseList = (props) => (
    <div>
        <h1>Expense List: {props.expenses.length}</h1>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    };
};
// connect is a higher order function, so we need to call that, with another component argument.
export default connect(mapStateToProps)(ExpenseList);
