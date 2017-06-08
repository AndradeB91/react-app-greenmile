import React, { Component } from 'react';
import connect from 'myflux/connect';

class Beer extends Component {
  edit = event => {
    this.props.dispatch({
      type: 'edit',
      payload: event,
    });
  };

  remove = () => {
    const { uuid, dispatch } = this.props;
    dispatch({
      type: 'remove',
      payload: uuid,
    });
  };

  render() {
    const { uuid, name, brewery } = this.props;

    return (
      <div className="beer">

        <div>
          <label htmlFor={`name-${uuid}`}>Beer</label>
          <input
            id={`name-${uuid}`}
            name={uuid}
            data-type="name"
            value={name}
            onChange={this.edit}
          />
        </div>

        <div>
          <label htmlFor={`brewery-${uuid}`}>Brewery</label>
          <input
            id={`brewery-${uuid}`}
            name={uuid}
            data-type="brewery"
            value={brewery}
            onChange={this.edit}
          />
        </div>

        <div>
          <button onClick={this.remove}>Remove</button>
        </div>

      </div>
    );
  }
}

export default connect(Beer);
