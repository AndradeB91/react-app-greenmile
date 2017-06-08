import { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import * as firebase from 'firebase';

export default class Store extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBp4WfcFIutxqzrGbCxcro9YxRUhHgoWe4',
      authDomain: 'feedback-4a295.firebaseapp.com',
      databaseURL: 'https://feedback-4a295.firebaseio.com',
      projectId: 'feedback-4a295',
      storageBucket: 'feedback-4a295.appspot.com',
      messagingSenderId: '952975869388',
    };
    firebase.initializeApp(config);
  }

  state = {
    list: [],
    login: {
      email: '',
      password: '',
    },
  };

  static childContextTypes = {
    list: PropTypes.array,
    login: PropTypes.object,
    dispatch: PropTypes.func,
  };

  getChildContext() {
    return {
      list: this.state.list,
      login: this.state.login,
      dispatch: this.dispatch,
    };
  }

  dispatch = action => {
    if (action.type === 'edit') {
      this.edit(action.payload);
    }
    if (action.type === 'add') {
      this.add();
    }
    if (action.type === 'remove') {
      this.remove(action.payload);
    }

    //login related
    if (action.type === 'clearList') {
      this.clear();
    }
    if (action.type === 'setList') {
      this.setList(action.payload);
    }
    if (action.type === 'setEmail') {
      this.setEmail(action.payload);
    }
    if (action.type === 'setPassword') {
      this.setPassword(action.payload);
    }
    if (action.type === 'authenticate') {
      this.authenticate(action.payload);
    }
    if (action.type === 'signUp') {
      this.signUp(action.payload);
    }
    if (action.type === 'signOut') {
      this.signOut(action.payload);
    }
  };

  edit = ({ target: { dataset, name, value } }) => {
    const list = this.state.list;

    this.setState({
      ...this.state,
      list: list.map(item => {
        if (item.uuid === name) {
          item.premium = value === 'Baden';
          if (dataset['type'] === 'brewery') {
            item.brewery = value;
          } else if (dataset['type'] === 'name') {
            item.name = value;
          }
        }
        return item;
      }),
    });
  };

  add = () => {
    const newList = this.state.list;

    newList.push({
      uuid: uuid(),
      name: '',
      brewery: '',
      premium: false,
    });

    this.setState({
      ...this.state,
      list: newList,
    });

    const user = firebase.auth().currentUser;
    if (user) this.updateFirebaseUser(user);
  };

  //TODO: list is not updating itself properly to newList
  remove = uuid => {
    const newList = this.state.list.reduce((list, item) => {
      if (item.uuid !== uuid) {
        list.push(item);
      }
      return list;
    }, []);

    console.log(this.state.list);
    this.setState({
      ...this.state,
      list: newList,
    });
    console.log(this.state.list);

    const user = firebase.auth().currentUser;
    if (user) this.updateFirebaseUser(user);
  };

  clear = () => {
    this.setState({
      ...this.state,
      list: [],
    });
  };

  setList = newList => {
    this.setState({
      ...this.state,
      list: newList,
    });
  };

  setEmail = event => {
    const { login } = this.state;
    login.email = event.target.value;

    this.setState({
      ...this.state,
      login: login,
    });
  };

  setPassword = event => {
    const { login } = this.state;
    login.password = event.target.value;

    this.setState({
      ...this.state,
      login: login,
    });
  };

  authenticate = () => {
    const { login } = this.state;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(
      login.email,
      login.password,
    );
    promise.catch(e => console.log(e.message));
  };

  signUp = () => {
    const { login } = this.state;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
      login.email,
      login.password,
    );

    promise
      .then(user => {
        this.addFirebaseUser(user);
      })
      .catch(e => console.log(e.message));
  };

  signOut = () => {
    firebase.auth().signOut();
    this.clear();
  };

  addFirebaseUser = user => {
    const ref = firebase.database().ref('users/' + user.uid);
    ref.set({
      email: user.email,
      list: this.state.list,
    });
  };

  updateFirebaseUser = user => {
    const ref = firebase.database().ref('users/' + user.uid);
    ref.update({
      email: user.email,
      list: this.state.list,
    });
  };

  render() {
    return this.props.children;
  }
}
