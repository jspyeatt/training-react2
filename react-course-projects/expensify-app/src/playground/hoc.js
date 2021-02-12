import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// this is a regular function, not a component. But it takes the source
// component passed in and returns a new component which encompasses
// the original component.
// the property isAdmin will conditionally render the banner.
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Not authorized</p>}
        </div>
    );
};

// AdminInfo is a higher order version of Info
const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the detail"/>, document.getElementById("app"));