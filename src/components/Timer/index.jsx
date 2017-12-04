import React, { Component } from 'react';
import { oneOfType, string, func } from 'prop-types';
import './index.scss';

// TODO: sync Timer and Title
export default class Timer extends Component {

  static propTypes = {
    timer: oneOfType([string, func]).isRequired
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer } = this.props;
    return(
      <div>
        {this.updateTimer(timer)}
      </div>
    );
  }
}