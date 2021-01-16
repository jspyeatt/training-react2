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
    count++;
    console.log("addOne " + count);
    renderCounterApp() // Now rerendering
};
const minusOne = () => {
    count--;
    console.log("minusOne",count);
    renderCounterApp() // Now rerendering
};
const resetCounter = () => {
    count = 0;
    console.log("resetCounter");
    renderCounterApp() // Now rerendering
};

const appRoot = document.getElementById("app");

const renderCounterApp = () => {
    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne} id="add-button">+1</button>
            <button onClick={minusOne} id="sub-button">-1</button>
            <button onClick={resetCounter} id="reset-button">Reset</button>
        </div>
    );
    ReactDOM.render(templateTwo, appRoot);
};
renderCounterApp(); // this initializes the application.

