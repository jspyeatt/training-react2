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
            return state.filter((expense) => action.id !== expense.id);
        case 'EDIT_EXPENSE':
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

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate} = filters) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    });
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    // console.log('ALL', state.expenses);
    // console.log('SUBSCRIBE', visibleExpenses);
});

const expense1 = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 20 }));
const expense2 = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: 30 }));
store.dispatch(removeExpense({ id: expense1.expense.id }));
store.dispatch(editExpense(expense2.expense.id, { amount: 500 }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());
store.dispatch(setSortByAmount());
store.dispatch(setSortByDate());

store.dispatch(setStartDate());
store.dispatch(setStartDate(35));
store.dispatch(setEndDate(130));
store.dispatch(setTextFilter('rent'));
store.dispatch(addExpense({ description: 'gas', amount: 600, createdAt: 40 }));
store.dispatch(addExpense({ description: 'shoes', amount: 100, createdAt: 50 }));
store.dispatch(addExpense({ description: 'rent', amount: 10000, createdAt: 60 }));
store.dispatch(addExpense({ description: 'rent', amount: 11000, createdAt: 70 }));
store.dispatch(setSortByDate());
console.log('ALL EXPENSES', store.getState().expenses);
console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters));


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