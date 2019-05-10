import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Login from './Login/Login';

import './App.css';

class App extends Component {
  render(){
    const { children, user } = this.props

    return (
      <div className="App">
        <NavBar />
        {(!!user && !!user.uid) 
            ? children 
            : user !== 'unknown' &&
            <div style={{textAlign: 'center'}}> 
                {/* <Message message="You need to login to start using an app" /> */}
                <Login {...this.props} />
             </div>
        }
      </div>
    )
  }
}

export default App;
