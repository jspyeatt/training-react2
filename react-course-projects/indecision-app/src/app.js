console.log('App.js is running');

// JSX - Javascript XML

var template = (
    <div>
    <h1>Indecision App</h1>
    <p>This is some info</p>
    </div>);

var template2 = (
    <div>
    <h1>John Pyeatt</h1>
    <p>Age: 57</p>
    <p>Verona, WI</p>
    </div>
);
var appRoot = document.getElementById("app");
// ReactDOM.render(template, appRoot);
ReactDOM.render(template2, appRoot);