import React from "react";
import { connect } from 'react-redux';
import { User } from './User';
import { Main } from './Main';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <Main changeUsername={(newName) => this.props.setName(newName)}/>
                <User username={this.props.user.name}/>
            </div>
        );
    }
}

// What parts of the global state are we mapping to the local props
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// What dispatch methods are we extracting to this component
const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch({
        type: "SET_NAME",
        payload: name
      });
    }, 
    setAge: (age) => {
      dispatch({
        type: "SET_AGE",
        payload: age
      })
    }
  };
};

// Connects react with redux
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;