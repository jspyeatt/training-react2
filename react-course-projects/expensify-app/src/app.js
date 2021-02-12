import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore'
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configureStore();
store.dispatch(addExpense({description: 'Water bill', createdAt: 10, amount: 10000}));
store.dispatch(addExpense({description: 'Gas bill', createdAt: 9, amount: 7000}));
store.dispatch(addExpense({description: 'rent', createdAt: 18, amount: 2000}));
console.log(store.getState());
console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters));

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));