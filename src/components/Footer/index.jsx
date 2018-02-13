import React, { Component } from 'react';

import './index.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <ul className='footer__shortcuts'>
          <li>Press <code>Shift+R</code> to reset</li>
          <li>Press <code>Space</code> to start phase</li>
          <li>Press <code>Shift+S</code> to skip phase</li>
        </ul>
      </footer>
    );
  }
}