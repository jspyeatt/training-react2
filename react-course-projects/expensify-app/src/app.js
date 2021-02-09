import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
    <div>this is the dashboard</div>
);
const AddExpensePage = () => (
    <div>do some adding</div>
);
const EditExpensePage = () => (
    <div>do some editing</div>
);
const HelpPage = () => (
    <div>help</div>
);
const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/> 
            <Route path="/create" component={AddExpensePage} exact={true}/>
            <Route path="/edit" component={EditExpensePage} exact={true}/>
            <Route path="/help" component={HelpPage} exact={true}/>
        </div>
    </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('app'));