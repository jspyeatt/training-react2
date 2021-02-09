import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
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

const NotFoundPage = () => (
    <div>
        <div>
            404 - not found
            <Link to="/">Lost? go here.</Link>
        </div>
    </div>
);

const Header = () => (
    <div>
    <h1>Expensify App</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink> |
    <NavLink to="/create" activeClassName="is-active">Create</NavLink> |
    <NavLink to="/edit" activeClassName="is-active">Edit</NavLink> |
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </div>
);
const routes = (
    <BrowserRouter>
    <div>
        <Header/>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} exact={true} />
            <Route path="/edit" component={EditExpensePage} exact={true} />
            <Route path="/help" component={HelpPage} exact={true} />
            <Route component={NotFoundPage} />
        </Switch>
        </div>
    </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('app'));