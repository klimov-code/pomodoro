import React, { Component } from 'react';
import { func, bool, number } from 'prop-types';

import './index.scss';

export default class Settings extends Component {
  static propTypes = {
    handleWorkTime: func,
    handleRestTime: func,
    play: bool,
    workTime: number,
    restTime: number
  }

  render() {
    const {
      handleWorkTime,
      handleRestTime,
      play,
      workTime,
      restTime
    } = this.props;
    const workMins = workTime / 60,
      restMins = restTime / 60;

    return (
      <section className='settings'>
        <form className='settings__form'>
          <div className='settings__header'>
            <button className='settings__button--close'>Close</button>
            <h3 className='settings__title'>Settings</h3>
          </div>
          <div className='settings__options'>
            <div className='options'>
              <label className='options__label' htmlFor='work'>Work time: {workMins} minutes</label>
              <input
                className='options__range'
                type='range'
                id='work'
                min={25}
                max={75}
                value={workMins}
                onBlur={(e) => handleWorkTime(e.target.value)}
                onChange={(e) => handleWorkTime(e.target.value)}
                disabled={play}
              />
            </div>
            <div className='options'>
              <label className='options__label' htmlFor='rest'>Rest time: {restMins} minutes</label>
              <input
                className='options__range'
                type='range'
                id='rest'
                min={5}
                max={15}
                value={restMins}
                onBlur={(e) => handleRestTime(e.target.value)}
                onChange={(e) => handleRestTime(e.target.value)}
                disabled={play}
              />
            </div>
            <div className='options'>
              <label className='options__label' htmlFor='save'>Save results</label>
              <input className='options__checkbox' type='checkbox' id='save' />
            </div>
          </div>
        </form>
      </section>
    );
  }
}