import React from 'react';
import {Link} from 'react-router-dom';
const ExpenseListItem = ({description, amount, createdAt, id}) => (
    <div>
        <span><Link to={`/edit/${id}`}>{description}</Link></span>
        <span>{amount}</span>
        <span>{createdAt}</span>

    </div>
);
export default ExpenseListItem;