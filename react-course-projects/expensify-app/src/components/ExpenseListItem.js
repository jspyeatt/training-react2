import React from 'react';

const ExpenseListItem = ({description, amount, createdAt}) => (
    <div>
        <span>{description}</span>
        <span>{amount}</span>
        <span>{createdAt}</span>
    </div>
);
export default ExpenseListItem;