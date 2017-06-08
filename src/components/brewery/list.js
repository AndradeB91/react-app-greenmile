import React, { Component } from 'react';
import connect from 'myflux/connect';
import Beer from './beer';

class List extends Component {
  add = () => {
    this.props.dispatch({
      type: 'add',
    });
  };

  render() {
    const { list } = this.props;
    const beers = list.map(beer =>
      <Beer
        key={beer.uuid}
        {...beer} 
      />);

    return (
      <div>
        <div className="list">{beers}</div>
        <button onClick={this.add}>Add</button>
      </div>
    );
  }
}

export default connect(List);
