import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { oneOfType, string, func } = PropTypes;

// TODO: sync Timer and Title
export default class Timer extends Component {
  static propTypes = {
    timer: oneOfType([string, func]).isRequired
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer(0) : timer;
  }

  render() {
    const { timer } = this.props;

    return(
      <div>{this.updateTimer(timer)}</div>
    );
  }
}

class Controls extends Component {

}