import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const { oneOfType, string, func } = PropTypes;

// TODO: sync Timer and Title
export default class Timer extends Component {

  static propTypes = {
    timer: oneOfType([string, func]).isRequired,
    toggleTimer: PropTypes.func.isRequired,
    resetTimer: PropTypes.func.isRequired
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer } = this.props;
    return(
      <div>
        {this.updateTimer(timer)}
        <button type='button' onClick={this.props.toggleTimer}>start</button>
        <button type='button' onClick={this.props.resetTimer}>reset</button>
      </div>
    );
  }
}
