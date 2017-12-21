import React, { Component } from 'react';
import Title from './Title';
import Header from './Header';
import Clockface from './Clockface'
import Controls from './Controls'
import Footer from './Footer';

import './index.scss';

export default class Pomodoro extends Component {
  
  constructor() {
    super();
    this.tick = this.tick.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  state = {
    play: false,
    time: 0,
    dial: [],
    mode: '',
    pomodoroCount: 0,
    breakCount: 0
  }

  componentWillMount() {
    this.setInitialState();
    this.getLocalStorage();
  }

  componentWillUnmount() {
    this.pauseTimer()
    this.setLocalStorage();
  }

  setInitialState() {
    this.setState({
      play: false,
      time: 1500,
      dial: [...Array(15)].map((_, index) => {
        const { degree, setX, setY } = this.getCoordinates(index);

        return {
          opacity: 0.06 * index + 0.1,
          x: setX,
          y: setY,
          rotation: degree * index - 90
        }
      }),
      mode: 'work',
      pomodoroCount: 0,
      breakCount: 0
    });
  }

  tick() {
    let { time, mode, pomodoroCount } = this.state;

    if (time > 0) {
      this.setState(prevState => ({
        time: prevState.time - 1,
        dial: this.moveDial(prevState.dial)
      }));
    } else if (mode === 'work' && (pomodoroCount % 3 !== 0 || pomodoroCount === 0)) {
      this.toggleMode(300, 'break');
    } else if (mode === 'work' && pomodoroCount % 3 === 0) {
      this.toggleMode(900, 'break');
      console.info('%cYou worked hard, go get some rest and have a cup of coffee', 'color: blue');
    } else {
      this.toggleMode(1500, 'work');
    }
  }

  moveDial(dial) {
    const firstElement = dial.shift();

    return dial.slice(firstElement.length - dial.length).concat(firstElement);
  }
  
  toggleMode(time, mode) {
    this.pauseTimer();

    this.setState({
      time: time,
      mode: mode
    });

    if (mode === 'break') {
      this.setState(prevState => ({
        pomodoroCount: prevState.pomodoroCount + 1
      }));
      console.info('%cPomodoro Count: ' + this.state.pomodoroCount, 'color: tomato');
    } else {
      this.setState(prevState => ({
        breakCount: prevState.breakCount + 1
      }));
      console.info('%cBreak Count: ' + this.state.breakCount, 'color: green');
    }
  }

  getCoordinates(index) {
    const { width, height } = this.props;
    let degree = 6;
    let setX = (width / 2) + (Math.cos(degree * index * (Math.PI / 180)) * height / 2);
    let setY = (height / 2) + (Math.sin(degree * index * (Math.PI / 180)) * height / 2) - 100;

    return { degree, setX, setY };
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
    const { play } = this.state;

    if (play) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.resetLocalStorage();
    this.setInitialState();
  }

  formatTime(seconds) {
    const format = (number) => (number > 9) ? number : '0' + number;
    
    return `${format(Math.floor(seconds / 60 % 60))}:${format(Math.floor(seconds % 60))}`;
  }

  getTitle() {
    const { time } = this.state;

    return `(${this.formatTime(time)}) Pomodoro Timer - time management method`;
  }

  getTime() {
    const { time } = this.state;

    return this.formatTime(time);
  }

  setLocalStorage() {
    localStorage.setItem('pomodoroState', JSON.stringify(this.state));
  }

  getLocalStorage() {
    const restoreStateString = localStorage.getItem('pomodoroState');
    if (restoreStateString) {
      const restoreState = JSON.parse(restoreStateString);
      this.setState(restoreState);
    }
  }

  resetLocalStorage() {
    localStorage.removeItem('pomodoroState');
  }

  render() {
    const { width, height } = this.props;
    const { play, dial } = this.state;

    return(
      <div>
        <Title title={this.getTitle} />
        <Header />
        <Clockface timer={this.getTime} width={width} height={height} dial={dial} play={play} />
        <Controls toggleTimer={this.toggleTimer} resetTimer={this.resetTimer} play={play} />
        <Footer />
      </div>
    );
  }
}