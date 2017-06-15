import React from "react";
import {render} from "react-dom";

// import { User } from './components/User';
// import { Main } from './components/Main';

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: "Max"
//         };
//     }

//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }

//     render() {
//         return (
//             <div className="container">
//                 <Main changeUsername={this.changeUsername.bind(this)}/>
//                 <User username={this.state.username}/>
//             </div>
//         );
//     }
// }

// render(<App />, window.document.getElementById('app'));

// Self-explanatory
import { createStore, combineReducers } from "redux";

// When creating the reducer, it should take two arguments: state and action
const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    // Action is an object with a type
    // Determine what to do based on the type of action (why we're using a switch statement)
    switch (action.type) {
        case "ADD": 
            // the below is bad because it is not changing in an immutable way! 
            // state.result += action.payload;

            // Create a new space in memory for the new state to preserve old states
            state = {
                ...state,
                result: state.result + action.payload,
                // this does not store the last results but rather stores the last payloads! 
                lastValues: [...state.lastValues, action.payload]
            }
            break;
        case "SUBTRACT": 
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            }
            break;
    }
    // Must return the new state that the application will use
    return state;
};

const userReducer = (state = {
    name: "Max",
    age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME": 
            state = {
                ...state,
                name: action.payload
            }
            break;
        case "SET_AGE": 
            state = {
                ...state,
                age: action.payload
            }
            break;
    }
    return state;
};

// A store initializes with two arguments: the reducer and the initial state
const store = createStore(combineReducers({mathReducer, userReducer}));

store.subscribe(() => {
    // getState is built in and gets the current state
    console.log("Store Updated", store.getState());
})

// Dispatch method expects a JS object
// Typically with a property type and payload (a lot pkgs use payload)
store.dispatch({
    type: "ADD",
    payload: 10
});

store.dispatch({
    type: "SUBTRACT",
    payload: 20
});

store.dispatch({
    type: "SET_AGE",
    payload: 30
})