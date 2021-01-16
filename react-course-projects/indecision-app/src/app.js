console.log('App.js is running');

// JSX - Javascript XML

const app = {
    title: "Indecision App",
    subtitle: 'My first object.',
    options: []
}
const appRoot = document.getElementById("app");
const onFormSubmit = (e) => {
    e.preventDefault(); // Stops the full page refresh and the submission to a server.
    const option = e.target.elements.optionButton.value;
    console.log('submitted:', option);

    // if a value was entered
    if (option) {
        app.options.push(option);   // add to options array.
        e.target.elements.optionButton.value = '';   // clear the form
        renderApp();
    }
};

const removeAllOptions = () => {
    app.options = [];
    renderApp();
};

const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{(app.options && app.options.length > 0) ? 'Here are your options' : 'No options'}</p>
            <p>Number of options: {app.options.length}</p>
            <form onSubmit={onFormSubmit}>
            <input type="text" name="optionButton"/>
            <button>Add Option</button>
            <button onClick={removeAllOptions}>Remove All</button>
            </form>
        </div>);
        ReactDOM.render(template, appRoot);
};

renderApp();