console.log('App.js is running');

// JSX - Javascript XML

var app = {
    title: "Indecision App",
    subtitle: 'My first object.'
}
var template = (
    <div>
    <h1>{app.title}</h1>
    <p>{app.subtitle}</p>
    </div>);

var user = {
    name: 'Fred',
    age: 24,
    userLocation: 'Madison'
}
var userName = 'John Pyeatt';
var age = 58;
var userLocation = 'Verona';
var template2 = (
    <div>
    <h1>{userName}</h1>
    <p>Age: {age}</p>
    <p>Location: {userLocation.toUpperCase()}</p>
    <p>Other Name:{user.name}</p>
    </div>
);
var appRoot = document.getElementById("app");
ReactDOM.render(template, appRoot);
// ReactDOM.render(template2, appRoot);