import uuid from 'uuid';

// define action generators
export const addExpense = ({ description = '',
    note = '',
    amount = 0,
    createdAt = 0 } = {}) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    });

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates
});