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
    const { toggleTimer, resetTimer, play } = this.props;

    return (
      <div>
        <button type='button' onClick={toggleTimer}>{play ? 'pause' : 'play'}</button>
        <button type='button' onClick={resetTimer}>reset</button>
      </div>
    );
  }
}