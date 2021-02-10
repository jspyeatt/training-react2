import { createStore } from 'redux';

// call redux createStore, passing in a function which returns the default state for the app.
const store = createStore((state = { count: 0 }, action) => {
    console.log('running ' + state.count);
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return { count: state.count + incrementBy }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return { count: state.count - decrementBy }
        case 'SET':
            return { count: action.count }
        case 'RESET':
            return { count: 0 }
        default:
            return state;
    }
});
// called each time the store changes. It's called BEFORE the createStore is called.
const unsub = store.subscribe(() => {
    console.log('subscribe ', store.getState());
});

store.dispatch({
    type: 'INCREMENT'
});
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});

store.dispatch({
    type: 'RESET'
});
store.dispatch({
    type: 'DECREMENT',
    decrementBy: 4
});
store.dispatch({
    type: 'DECREMENT'
});

store.dispatch({
    type: 'SET',
    count: 7
});
// now access the state.
console.log(store.getState());