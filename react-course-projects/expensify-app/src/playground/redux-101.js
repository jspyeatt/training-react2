import { createStore } from 'redux';

// call redux createStore, passing in a function which returns the default state for the app.
const store = createStore((state = { count: 0 }, action) => {
    console.log('running ' + state.count);
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 }
        case 'DECREMENT':
            return { count: state.count - 1 }
        case 'RESET':
            return { count: 0 }
        default:
            return state;
    }
});

store.dispatch({
    type: 'INCREMENT'
});
store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'RESET'
});
store.dispatch({
    type: 'DECREMENT'
});

// now access the state.
console.log(store.getState());