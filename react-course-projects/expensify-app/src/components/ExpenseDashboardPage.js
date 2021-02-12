import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
const ExpenseDashboardPage = () => (
    <div>
        <div>this is the dashboard</div>
        <ExpenseListFilters/>
        <ExpenseList />
    </div>
);
export default ExpenseDashboardPage;