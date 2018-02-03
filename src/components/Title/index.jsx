import { Component } from 'react';
import { number } from 'prop-types';

import { formatTime } from '../../utils/time';

export default class Title extends Component {
  static propTypes = {
    currentTime: number
  }

  render() {
    const { currentTime } = this.props;
    document.title = `(${formatTime(currentTime)}) Pomodoro Timer - time management method`

    return null;
  }
}