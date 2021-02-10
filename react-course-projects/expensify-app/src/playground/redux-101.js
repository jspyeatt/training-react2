import { createStore } from 'redux';

// Action generator
// note in this first line we have destructured a class and set the default value to 1
// for incrementBy, AND we've set the default payload to "{}'.

const incrementCount = ({incrementBy = 1} = {}) => ({
        type: 'INCREMENT',
        incrementBy: incrementBy
});
const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});
const setCount = ({count} = {}) => ({
    type: 'SET',
    count: count
});
const resetCount = () => ({
    type: 'RESET'
})

// call redux createStore, passing in a function which returns the default state for the app.
const store = createStore((state = { count: 0 }, action) => {
    console.log('running ' + state.count);
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + action.incrementBy }
        case 'DECREMENT':
            return { count: state.count - action.decrementBy }
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

store.dispatch(incrementCount());
store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(resetCount());

store.dispatch(decrementCount({decrementBy: 3}));
store.dispatch(decrementCount());

store.dispatch(setCount({count: 9}));
// now access the state.
console.log(store.getState());