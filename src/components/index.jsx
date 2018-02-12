import React, { Component } from 'react';

import Title from './Title';
import Header from './Header';
import Controls from './Controls';
import Menu from './Menu';
import Clockface from './Clockface';
import Footer from './Footer';

import notification from '../audio/notification.ogg';

import './index.scss';

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.audioNotification = new Audio(notification);
    this.tick = this.tick.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.skipTimer = this.skipTimer.bind(this);
    this.handleWorkTime = this.handleWorkTime.bind(this);
    this.handleRestTime = this.handleRestTime.bind(this);
  }

  state = {
    play: false,
    workTime: 1500,
    restTime: 300,
    currentTime: 1500,
    dial: [],
    mode: 'work',
    workCount: 0,
    restCount: 0,
    fill: 0
  }

  componentWillMount() {
    const restoreState = window.localStorage.getItem('pomodoroState') || undefined;
    this.setInitialState(restoreState);
  }

  componentDidUpdate() {
    this.setLocalStorage();
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  setInitialState(initialState) {
    if (initialState) {
      const state = JSON.parse(initialState);

      this.setState({
        ...state,
        play: false
      });
    } else {
      this.setState({
        play: false,
        workTime: 1500,
        restTime: 300,
        currentTime: 1500,
        dial: [...Array(15)].map((_, index) => {
          const { degree, setX, setY } = this.getCoordinates(index);

          return {
            opacity: 0.0667 * index,
            x: setX,
            y: setY,
            rotation: degree * index - 90
          }
        }),
        mode: 'work',
        workCount: 0,
        restCount: 0,
        fill: 0
      });
    }
  }

  tick() {
    const { currentTime } = this.state;

    if (currentTime > 0) {
      this.setState(prevState => ({
        currentTime: prevState.currentTime - 1,
        dial: this.moveDial(prevState.dial),
        fill: prevState.fill + 1
      }));
    } else {
      this.audioNotify();
      this.switchMode();
    }
  }

  moveDial(dial) {
    const firstElement = dial.shift();

    return dial.slice(firstElement.length - dial.length).concat(firstElement);
  }
  
  switchMode() {
    this.pauseTimer();

    const {
      workTime,
      restTime,
      mode,
      workCount,
      restCount
    } = this.state;

    const nextWorkCount = workCount + 1,
      nextRestCount = restCount + 1;

    const nextMode = (mode === 'rest') ? 'work' : 'rest';
    const nextCurrentTime = (nextMode === 'rest' && nextWorkCount % 4)
      ? restTime
      : (nextMode === 'rest' && (nextWorkCount % 4 === 0))
        ? restTime * 3
        : workTime;

    if (nextMode === 'rest') {
      this.setState(prevState => ({
        workCount: prevState.workCount + 1
      }));
      console.info('%cPomodoro Count: ' + nextWorkCount, 'color: tomato');
    } else {
      this.setState(prevState => ({
        restCount: prevState.restCount + 1
      }));
      console.info('%cRest Count: ' + nextRestCount, 'color: green');
    }

    this.setState({
      currentTime: nextCurrentTime,
      mode: nextMode,
      fill: 0
    });
  }

  getCoordinates(index) {
    const { width, height } = this.props;
    const degree = 6;
    const setX = (width / 2) + Math.cos(degree * index * (Math.PI / 180)) * height / 2;
    const setY = (height / 2) + Math.sin(degree * index * (Math.PI / 180)) * height / 2;

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

  skipTimer() {
    this.switchMode();
  }

  handleWorkTime(time) {
    const { mode } = this.state;

    if (mode === 'work') {
      this.setState({
        currentTime: time * 60
      });
    }
    this.setState({
      workTime: time * 60,
      fill: 0
    });
  }

  handleRestTime(time) {
    const { mode } = this.state;

    if (mode === 'rest') {
      this.setState({
        currentTime: time * 60
      });
    }
    this.setState({
      restTime: time * 60,
      fill: 0
    });
  }

  setLocalStorage() {
    window.localStorage.setItem('pomodoroState', JSON.stringify(this.state));
  }

  resetLocalStorage() {
    window.localStorage.removeItem('pomodoroState');
  }

  audioNotify() {
    this.audioNotification.play();
  }

  render() {
    const {
      play,
      workTime,
      restTime,
      currentTime,
      dial,
      mode,
      workCount,
      fill
    } = this.state;

    const { width, height } = this.props;

    return (
      <main className='wrapper'>
        <Title
          currentTime={currentTime}
        />
        <Header />
        <Controls
          toggleTimer={this.toggleTimer}
          resetTimer={this.resetTimer}
          skipTimer={this.skipTimer}
          play={play}
          mode={mode}
        />
        <Menu
          handleWorkTime={this.handleWorkTime}
          handleRestTime={this.handleRestTime}
          play={play}
        />
        <Clockface
          width={width}
          height={height}
          play={play}
          workTime={workTime}
          restTime={restTime}
          currentTime={currentTime}
          dial={dial}
          mode={mode}
          workCount={workCount}
          fill={fill}
        />
        <Footer />
      </main>
    );
  }
}