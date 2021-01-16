const appRoot = document.getElementById("app");
const textId = "textId";
let currentlyVisible = false;

const toggleText = () => {
    currentlyVisible = !currentlyVisible;
    console.log('currentlyVisible', currentlyVisible);
    renderApp();
};
const renderApp = () => {

    const template = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={toggleText}>{currentlyVisible ? 'Hide' : 'Show'}</button>
            {currentlyVisible && <div><p id={textId}>Showing text</p></div>}
        </div>
    );
    ReactDOM.render(template, appRoot);
};
renderApp();