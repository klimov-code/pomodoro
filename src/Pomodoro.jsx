import React, { Component } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Footer from './components/Footer';

export default class Pomodoro extends Component {
  state = {
    play: true,
    time: 0,
    break: 0,
    title: ''
  }
}