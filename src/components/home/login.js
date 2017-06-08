import React, { Component } from 'react';
import connect from 'myflux/connect';
import * as firebase from 'firebase';

class Login extends Component {
  clearList = () => {
    this.props.dispatch({ type: 'clearList' });
  };

  setList = newList => {
    this.props.dispatch({ type: 'setList', payload: newList });
  };

  setEmail = event => {
    this.props.dispatch({ type: 'setEmail', payload: event });
  };

  setPassword = event => {
    this.props.dispatch({ type: 'setPassword', payload: event });
  };

  authenticate = () => {
    this.props.dispatch({ type: 'authenticate' });
  };

  signUp = () => {
    this.props.dispatch({ type: 'signUp' });
  };

  signOut = () => {
    this.props.dispatch({ type: 'signOut' });
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      //The user is logged in
      if (firebaseUser) {
        const ref = firebase.database().ref(`users/${firebaseUser.uid}`);
        console.log(firebaseUser.email + ' is logged in.');

        //Whenever a user logs in we get the firebase informations
        ref.once('value', snapshot => {
          this.setList(snapshot.val().list);
        });

        //There is no user logged in
      } else {
        console.log('not logged in');
      }
    });
  }

  render() {
    const { login } = this.props;

    return (
      <div className="container">
        <div>
          <input
            id="txtEmail"
            type="email"
            name="email"
            placeholder="Email"
            value={login.email}
            onChange={this.setEmail}
          />
        </div>
        <div>
          <input
            id="txtPassword"
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={this.setPassword}
          />
        </div>
        <div>
          <button
            id="btnLogin"
            className="btn btn-action"
            onClick={this.authenticate}
          >
            Log in
          </button>
        </div>
        <div>
          <button
            id="btnSignup"
            className="btn btn-action"
            onClick={this.signUp}
          >
            Sign up
          </button>
        </div>
        <div>
          <button
            id="btnSignout"
            className="btn btn-action"
            onClick={this.signOut}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }
}

export default connect(Login);
