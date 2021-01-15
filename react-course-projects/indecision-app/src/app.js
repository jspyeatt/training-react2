console.log('App.js is running');

// JSX - Javascript XML

var app = {
    title: "Indecision App",
    subtitle: 'My first object.',
    options: ['One', 'Two']
}
var template = (
    <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{(app.options && app.options.length > 0) ? 'Here are your options' : 'No options'}</p>
    </div>);

var user = {
    name: 'Fred',
    age: 23,
    userLocation: 'Madison'
}
var userName = 'John Pyeatt';
var age = 58;
var userLocation = 'Verona';

function getLocation(loc) {
    if (loc) {
        return <p>Location: {loc}</p>;
    }
}
var template2 = (
    <div>
    <h1>{user.name}</h1>
    <p>Age: {user.age}</p>
    {getLocation(user.userLocation)}
    <p>Other Name:{user.name}</p>
    </div>
);

// the ternary operator example
var template3 = (
    <div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    {user.age >= 18 && <p>Age: {user.age}</p>}
    {getLocation(user.userLocation)}
    <p>Other Name:{user.name}</p>
    </div>
);
var appRoot = document.getElementById("app");
ReactDOM.render(template, appRoot);
// ReactDOM.render(template2, appRoot);
//ReactDOM.render(template3, appRoot);