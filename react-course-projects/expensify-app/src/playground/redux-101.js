import {createStore} from 'redux';

// call redux createStore, passing in a function which returns the default state for the app.
const store = createStore((state = {count: 0}) => {
    return state; // returning the default state.
});

console.log(store.getState());