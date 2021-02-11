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

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates
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
            console.log("REMOVE ID", action.id);
            return state.filter((expense) => action.id !== expense.id);
        case 'EDIT_EXPENSE':
            console.log('EDIT ', action.id);
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                return expense;
            });
        default:
            return state;
    }
};

const setTextFilter = (textValue = '') => ({
    type: 'SET_TEXT_FILTER',
    text: textValue
});
const setSortByAmount = () => ({
    type: 'SET_SORT_BY',
    sortBy: 'amount'
});
const setSortByDate = () => ({
    type: 'SET_SORT_BY',
    sortBy: 'date'
});
const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    startDate: date
});
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    endDate: date
});
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
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

store.dispatch(removeExpense({ id: expense1.expense.id }));
console.log(store.getState());
store.dispatch(editExpense(expense2.expense.id, { amount: 500 }));
console.log(store.getState());

store.dispatch(setTextFilter('rent'));
console.log(store.getState());
store.dispatch(setTextFilter());
console.log(store.getState());
store.dispatch(setSortByAmount());
console.log(store.getState());
store.dispatch(setSortByDate());
console.log(store.getState());

store.dispatch(setStartDate(125));
console.log(store.getState());
store.dispatch(setStartDate());
console.log(store.getState());
store.dispatch(setEndDate(130));
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

const user = {
    name: 'Jen',
    age: 24
}
console.log({
    ...user,
    location: "Madison",
    age: 27
});