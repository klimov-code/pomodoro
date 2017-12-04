import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import './index.scss';

export default class Timer extends Component {

  static propTypes = {
    toggleTimer: func.isRequired,
    resetTimer: func.isRequired,
    play: bool.isRequired
  }

  render() {
    return (
      <div>
        <button type='button' onClick={this.props.toggleTimer}>{this.props.play ? 'pause' : 'play'}</button>
        <button type='button' onClick={this.props.resetTimer}>reset</button>
      </div>
    );
  }
}