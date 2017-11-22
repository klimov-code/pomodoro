import React, { Component } from 'react';
import Title from './components/Title';
import Header from './components/Header';
import Timer from './components/Timer';
import Footer from './components/Footer';

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);
    // this.togglePlay = ::this.togglePlay // ES7 format
    this.tick = this.tick.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  state = {
    play: false,
    time: 0,
    break: 0,
    title: '',
    pomodoroCount: 0,
    breakCount: 0
  }

  componentDidMount() {
    this.setState(this.setInitialState());
    const restoreStateString = window.localStorage.getItem('pomodoroState');
    if (restoreStateString) {
      const restoreState = JSON.parse(restoreStateString);
      this.setState(restoreState);
    }
  }

  componentDidUpdate() {
    localStorage.setItem('pomodoroState', JSON.stringify(this.state));
  }

  resetState() {
    this.setState(this.setInitialState());
    localStorage.setItem('pomodoroState', '');
  }

  setInitialState() {
    let initialTime = 1500;

    return {
      play: false,
      time: initialTime,
      break: 300,
      title: initialTime,
      pomodoroCount: 0,
      breakCount: 0
    };
  }

  tick() {
    this.setState(prevState => ({
      time: prevState.time - 1,
      title: prevState.title - 1
    }));
  }

  startTimer() {
    clearInterval(this.countdown);
    this.countdown = setInterval(this.tick, 1000);

    this.setState({
      play: true
    });
  }

  pauseTimer() {
    clearInterval(this.countdown);

    this.setState({
      play: false
    });
  }

  toggleTimer() {
    if (this.state.play) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  formatTime(time) {
    const format = (number) => (number > 9) ? number : '0' + number;

    return `${format(Math.floor(time / 60 % 60))}:${format(Math.floor(time % 60))}`;
  }

  getTitle() {
    return `${this.formatTime(this.state.title)} | Pomodoro Timer`;
  }

  getTime() {
    return this.formatTime(this.state.time);
  }

  render() {
    return(
      <div>
        <Title title={this.getTitle} />
        <Timer timer={this.getTime} />
        <button type='button' onClick={this.toggleTimer}>start</button>
        <button type='button' onClick={this.resetState}>reset</button>
      </div>
    );
  }
}