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

import { createStore } from "redux";

// When creating the reducer, it should take two arguments: state and action
const reducer = (state, action) => {
    // Action is an object with a type
    // Determine what to do based on the type of action (why we're using a switch statement)
    switch (action.type) {
        case "ADD": 
            state = state + action.payload;
            break;
        case "SUBTRACT": 
            state = state - action.payload;
            break;
    }
    // Must return the new state that the application will use
    return state;
};

// A store initializes with two arguments: the reducer and the initial state
const store = createStore(reducer, 1);

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
})