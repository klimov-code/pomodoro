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

  render() {
    const { play } = this.props;
    const { workTime, restTime } = this.state;

    return (
      <section className='settings'>
        <form className='settings__form'>
          <div className='settings__header'>
            <button className='settings__button--close'>Close</button>
            <h3 className='settings__title'>Settings</h3>
          </div>
          <div className='settings__options'>
            <div className='options'>
              <label className='options__label' htmlFor='work'>Work time: {workTime} minutes</label>
              <input
                className='options__range'
                type='range'
                id='work'
                min={25}
                max={75}
                value={workTime}
                onBlur={(e) => this.changeWorkTime(e.target.value)}
                onChange={(e) => this.changeWorkTime(e.target.value)}
                disabled={play}
              />
            </div>
            <div className='options'>
              <label className='options__label' htmlFor='rest'>Rest time: {restTime} minutes</label>
              <input
                className='options__range'
                type='range'
                id='rest'
                min={5}
                max={15}
                value={restTime}
                onBlur={(e) => this.changeRestTime(e.target.value)}
                onChange={(e) => this.changeRestTime(e.target.value)}
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