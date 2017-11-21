import React, { Component } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Footer from './components/Footer';

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      time: 1500,
      break: 300,
      title: '',
      pomodoroCount: 0,
      breakCount: 0
    }
    this.toggle = this.toggle.bind(this);
  }

  tick() {
    this.setState(prevState => ({
      time: prevState.time - 1
    }))
  }

  start() {
    clearInterval(this.countdown);
    this.countdown = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({
      play: true
    });
  }

  pause() {
    clearInterval(this.countdown);
    this.setState({
      play: false
    });
  }

  toggle() {
    if (this.state.play) {
      this.pause();
    } else {
      this.start();
    }
  }

  formatTime(time) {
    const format = (number) => (number > 9) ? number : '0' + number;

    return `${format(Math.floor(time / 60 % 60))}:${format(Math.floor(time % 60))}`;
  }

  render() {
    return(
      <div>
        <div>{this.formatTime(this.state.time)}</div>
        <button type='button' onClick={this.toggle}>start</button>
      </div>
    );
  }
}