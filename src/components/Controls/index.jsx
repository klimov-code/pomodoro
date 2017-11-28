import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class Timer extends Component {

  static propTypes = {
    toggleTimer: PropTypes.func.isRequired,
    resetTimer: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <button type='button' onClick={this.props.toggleTimer}>start</button>
        <button type='button' onClick={this.props.resetTimer}>reset</button>
      </div>
    );
  }
}