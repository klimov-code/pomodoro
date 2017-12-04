import React, { Component } from 'react';
import Title from './components/Title';
import Header from './components/Header';
import Timer from './components/Timer';
import Clockface from './components/Clockface'
import Controls from './components/Controls'
import Footer from './components/Footer';

export default class Pomodoro extends Component {
  
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  state = {
    play: false,
    time: 0,
    mode: '',
    pomodoroCount: 0,
    breakCount: 0
  }

  setInitialState() {
    this.setState({
      play: false,
      time: 15,
      mode: 'work',
      pomodoroCount: 0,
      breakCount: 0
    });
  }

  componentDidMount() {
    this.setInitialState();
    this.getLocalStorage();
  }

  componentWillUnmount() {
    this.setLocalStorage();
  }

  
  tick() {
    let mode = this.state.mode,
        time = this.state.time,
        pomodoroCount = this.state.pomodoroCount;
    
    if (time > 0) {
      this.setState(prevState => ({
        time: prevState.time - 1
      }));
    } else if (mode === 'work' && (pomodoroCount%3 !== 0 || pomodoroCount === 0)) {
      this.changeModeState(3, 'break');
    } else if (mode === 'work' && pomodoroCount%3 === 0) {
      this.changeModeState(9, 'break');
      console.info('%cYou worked hard, go get some rest and have a cup of coffee', 'color: blue');
    } else {
      this.changeModeState(15, 'work');
    }
  }
  
  changeModeState(time, mode) {
    this.pauseTimer();
    this.setState(prevState => ({
      time: time,
      mode: mode,
    }));
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
  
  startTimer() {
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

  resetTimer() {
    this.pauseTimer();
    this.setInitialState();
    this.resetLocalStorage();
  }
  
  formatTime(seconds) {
    const format = (number) => (number > 9) ? number : '0' + number;
    
    return `${format(Math.floor(seconds / 60 % 60))}:${format(Math.floor(seconds % 60))}`;
  }
  
  getTitle() {
    return `(${this.formatTime(this.state.time)}) Pomodoro Timer - time management method`;
  }
  
  getTime() {
    return this.formatTime(this.state.time);
  }

  setLocalStorage() {
    window.localStorage.setItem('pomodoroState', JSON.stringify(this.state));
  }

  getLocalStorage() {
    const restoreStateString = window.localStorage.getItem('pomodoroState');
    if (restoreStateString) {
      const restoreState = JSON.parse(restoreStateString);
      this.setState(restoreState);
    }
  }

  resetLocalStorage() {
    window.localStorage.removeItem('pomodoroState');
  }

  render() {
    return(
      <div>
        <Title title={this.getTitle} />
        <Header />
        <Timer timer={this.getTime}/>
        <Clockface width={1100} height={700} color={'#ff6347'} animationSpeed={100} play={this.state.play} />
        <Controls toggleTimer={this.toggleTimer} resetTimer={this.resetTimer} play={this.state.play} />
        <Footer />
      </div>
    );
  }
}