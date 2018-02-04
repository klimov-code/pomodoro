import React, { Component } from 'react';

import './index.scss';

export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <h2 className='header header__title'>Pomodoro Timer</h2>
        <h3 className='header header__description'>The Pomodoro Technique is a time management method</h3>
      </header>
    );
  }
}