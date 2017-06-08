import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Wrapper extends Component {
  static contextTypes = {
    list: PropTypes.array,
    login: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const { list, login, dispatch } = this.context;
    const { component, defaultProps } = this.props;
    const props = {
      list,
      login,
      dispatch,
      ...defaultProps,
    };
    return React.createElement(component, props);
  }
}

const connect = component => {
  return props => <Wrapper defaultProps={props} component={component} />;
};

export default connect;
