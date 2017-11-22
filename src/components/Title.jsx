import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { oneOfType, string, func } = PropTypes;

// TODO: sync Timer and Title
export default class Title extends Component {
  static propTypes = {
    title: oneOfType([string, func]).isRequired
  }

  updateTitle(title) {
    return document.title = (typeof title === 'function') ? title(0) : title;
  }

  render() {
    const { title } = this.props;
    this.updateTitle(title);

    return null;
  }
}