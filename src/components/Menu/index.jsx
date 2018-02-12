import React, { Component } from 'react';
import { func, bool } from 'prop-types';

import Header from './Header';
import Howto from './Howto';
import Settings from './Settings';
import Slider from './Settings/Slider';
import Footer from './Footer';

import './index.scss';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.changeWorkTime = this.changeWorkTime.bind(this);
    this.changeRestTime = this.changeRestTime.bind(this);
  }
  state = {
    workTime: 25,
    restTime: 5
  }

  static propTypes = {
    handleWorkTime: func,
    handleRestTime: func,
    play: bool
  }

  changeWorkTime(time) {
    const { handleWorkTime } = this.props;

    this.setState({
      workTime: time
    });
    handleWorkTime(time);
  }

  changeRestTime(time) {
    const { handleRestTime } = this.props;

    this.setState({
      restTime: time
    });
    handleRestTime(time);
  }

  handleSettingsTab(e) {
    e.preventDefault();

    const overlay = document.querySelector('.menu__overlay');
    const button = document.querySelector('.menu__hamburger');
    const items = document.querySelector('.menu__items');
    const toggle = [ overlay, button, items ];

    toggle.forEach(v => v.classList.toggle('show'));

  }

  render() {
    const { workTime, restTime } = this.state;
    const { play } = this.props;

    return (
      <section className='menu'>
        <div className='menu__overlay show' />
        <button className='menu__hamburger' type='button' onClick={this.handleSettingsTab}>
          <div className='hamburger-box'>
            <div className='hamburger-inner'></div>
          </div>
        </button>
        <menu className='menu__items show'>
          <Header />
          <Howto />
          <Settings>
            <Slider
              id={'work'}
              label={'work time'}
              changeTime={this.changeWorkTime}
              time={workTime}
              play={play}
            />
            <Slider
              id={'rest'}
              label={'rest time'}
              changeTime={this.changeRestTime}
              time={restTime}
              play={play}
            />
          </Settings>
          <Footer />
        </menu>
      </section>
    );
  }
}