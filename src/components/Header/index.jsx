import React, { Component } from 'react';

import './index.scss';

export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <h1 className='header header__title'>The Pomodoro</h1>
        <h3 className='header header__description'>The Pomodoro Technique is a time management method</h3>
      </header>
    );
  }
}