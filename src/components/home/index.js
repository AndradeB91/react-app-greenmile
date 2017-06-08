import React, { Component } from 'react';
import Toolbar from './toolbar';
import Login from './login';
import Brewery from 'components/brewery/list';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Login />
        <Toolbar />
        <Brewery />
      </div>
    );
  }
}
