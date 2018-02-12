import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';

import './index.scss';

export default class Controls extends Component {
  static propTypes = {
    toggleTimer: func,
    resetTimer: func,
    skipTimer: func,
    play: bool,
    mode: string
  }

  render() {
    const {
      toggleTimer,
      resetTimer,
      skipTimer,
      play,
      mode
    } = this.props;

    return (
      <nav className='controls'>
        <button className='controls__button fi fi-stop' type='button' onClick={resetTimer} />
        <button className={'controls__button' + (mode === 'work' ? '' : '--rest')} type='button' onClick={toggleTimer}>
          <i className={'play' + (play ? '' : ' pause')}>
            <div className='left'></div>
            <div className='right'></div>
            <div className='triangle-1'></div>
            <div className='triangle-2'></div>
          </i>
        </button>
        <button className='controls__button fi fi-skip' type='button' onClick={skipTimer} />
      </nav>
    );
  }
}