import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const { oneOfType, string, func } = PropTypes;

// TODO: sync Timer and Title
export default class Timer extends Component {

  static propTypes = {
    timer: oneOfType([string, func]).isRequired,
    play: PropTypes.bool.isRequired
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer} = this.props;
    return(
      <div>
        {this.updateTimer(timer)}
      </div>
    );
  }
}
