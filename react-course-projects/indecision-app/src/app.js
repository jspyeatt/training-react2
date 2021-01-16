console.log('App.js is running');

// JSX - Javascript XML

const app = {
    title: "Indecision App",
    subtitle: 'My first object.',
    options: ['One', 'Two']
}
const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{(app.options && app.options.length > 0) ? 'Here are your options' : 'No options'}</p>
    </div>);

let count = 0;
const addOne = () => {
    console.log("addOne");
};
const minusOne = () => {
    console.log("minusOne");
};
const resetCounter = () => {
    console.log("resetCounter");
};
const templateTwo = (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={addOne} id="add-button">+1</button> 
        <button onClick={minusOne} id="sub-button">-1</button> 
        <button onClick={resetCounter} id="reset-button">Reset</button> 
    </div>
);

const appRoot = document.getElementById("app");
ReactDOM.render(templateTwo, appRoot);
