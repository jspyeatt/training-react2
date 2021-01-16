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

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    console.log('Random',randomNum);
    const selectedOption = app.options[randomNum];
    alert(selectedOption);
};
const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{(app.options && app.options.length > 0) ? 'Here are your options' : 'No options'}</p>
            <ol>
            {
                app.options.map((v) => {return <li key={v}>{v}</li>;})
            }
            </ol>
            <form onSubmit={onFormSubmit}>
            <input type="text" name="optionButton"/>
            <button>Add Option</button>
            <button disabled={app.options.length == 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={removeAllOptions}>Remove All</button>
            </form>
        </div>);
        ReactDOM.render(template, appRoot);
};

renderApp();