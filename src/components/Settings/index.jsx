import React, { Component } from 'react';
import { func, bool } from 'prop-types';

import './index.scss';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: 25,
      restTime: 5
    }
    this.changeWorkTime = this.changeWorkTime.bind(this);
    this.changeRestTime = this.changeRestTime.bind(this);
    this.handleSettingsTab = this.handleSettingsTab.bind(this);
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

    const settings = document.querySelector('.settings');

    settings.classList.toggle('hide');
  }

  render() {
    const { workTime, restTime } = this.state;
    const { play } = this.props;

    return (
      <section className='settings hide'>
        <form className='settings__form'>
          <div className='settings__header'>
            <button className='settings__button--close' onClick={this.handleSettingsTab}>close</button>
            <h3 className='settings__title'>settings</h3>
          </div>
          <div className='settings__options'>
            <div className='option'>
              <input
                className='option__range option__range--work'
                type='range'
                id='work'
                min={25}
                max={75}
                value={workTime}
                onBlur={(e) => this.changeWorkTime(e.target.value)}
                onFocus={(e) => this.changeWorkTime(e.target.value)}
                onChange={(e) => this.changeWorkTime(e.target.value)}
                disabled={play}
              />
              <span className='option__value option__value--work'>{workTime}</span>
              <label className='option__label' htmlFor='work'>work time</label>
            </div>
            <div className='option'>
              <input
                className='option__range option__range--rest'
                type='range'
                id='rest'
                min={5}
                max={15}
                value={restTime}
                onBlur={(e) => this.changeRestTime(e.target.value)}
                onFocus={(e) => this.changeRestTime(e.target.value)}
                onChange={(e) => this.changeRestTime(e.target.value)}
                disabled={play}
              />
              <span className='option__value option__value--rest'>{restTime}</span>
              <label className='option__label' htmlFor='rest'>rest time</label>
            </div>
            <div className='option'>
              <input className='option__checkbox' type='checkbox' id='save' />
              <label className='option__label' htmlFor='save'>save results</label>
            </div>
          </div>
        </form>
      </section>
    );
  }
}