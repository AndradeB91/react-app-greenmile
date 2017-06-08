import React, { Component } from 'react';
import connect from 'myflux/connect';

class Toolbar extends Component {
  render() {
    const { list } = this.props;

    const count = list.reduce((premiumCount, item) => {
      if (item.premium) {
        premiumCount++;
      }
      return premiumCount;
    }, 0);

    return (
      <div>
        Count: {count}
      </div>
    );
  }
}

export default connect(Toolbar);
