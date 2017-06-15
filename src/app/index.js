import React from "react";
import {render} from "react-dom";
import App from './components/App';


// Self-explanatory
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

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

// Creating a middleware
const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action:", action);
    next(action);
}

// A store initializes with one required argument: the reducer
// Everything that follows is optional
const store = createStore(
    // Reducers
    combineReducers({mathReducer, userReducer}),
    // Initial State (will be overwritten by the reducers)
    {}, 
    // middleware can be chained as arguments
    applyMiddleware(logger)
    );

// store.subscribe(() => {
//     // getState is built in and gets the current state
//     console.log("Store Updated", store.getState());
// })

render(<App />, window.document.getElementById('app'));