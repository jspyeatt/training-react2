import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// define action generators
const addExpense = ({ description = '',
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

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            console.log("REMOVE ID",action.id);
            return state.filter((expense) => action.id !== expense.id );
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    console.log("Subscribe received event:");
});

const expense1 = store.dispatch(addExpense({ description: 'rent', amount: 100 }));
const expense2 = store.dispatch(addExpense({ description: 'coffee', amount: 300 }));
console.log(store.getState());

store.dispatch(removeExpense({id: expense1.expense.id}));
console.log(store.getState());

const demoState = {
    expenses: [
        {
            id: '123',
            description: 'January Rent',
            note: 'This was the January rent',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};