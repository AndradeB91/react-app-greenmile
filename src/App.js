import React, { Component } from 'react';
import Store from 'myflux/store'
import Home from 'components/home'

import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Store>
          <Home />
        </Store>
      </div>
    );

  }
}

export default App;
