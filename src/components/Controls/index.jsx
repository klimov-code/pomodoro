import React, { Component } from 'react';
import { func, bool } from 'prop-types';

import './index.scss';

export default class Controls extends Component {
  static propTypes = {
    toggleTimer: func,
    resetTimer: func,
    skipTimer: func,
    play: bool
  }

  handleClick() {
    const settings = document.querySelector('.settings');

    settings.classList.toggle('hide');
  }

  render() {
    const {
      toggleTimer,
      resetTimer,
      skipTimer,
      play
    } = this.props;

    return (
      <section className='controls'>
        <button className='controls__button fi fi-stop' type='button' onClick={resetTimer} />
        <button className='controls__button' type='button' onClick={toggleTimer}>
          <i className={'play' + (play ? '' : ' pause') }>
            <div className="left"></div>
            <div className="right"></div>
            <div className="triangle-1"></div>
            <div className="triangle-2"></div>
          </i>
        </button>
        <button className='controls__button fi fi-skip' type='button' onClick={skipTimer} />
        <button className='controls__button fi fi-settings' type='button' onClick={this.handleClick}  disabled={play} />
      </section>
    );
  }
}