import React, { Component } from 'react';
import { number, bool, oneOfType, string, func } from 'prop-types';
import { Stage, Layer, Group, Rect, Text } from 'react-konva';

import './index.scss';

// codename "Stonehedge"
export default class Clockface extends Component {

  static propTypes = {
    timer: oneOfType([string, func]).isRequired,
    width: number.isRequired,
    height: number.isRequired,
    play: bool
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer } = this.props;
    return (
      <Stage width={this.props.width} height={this.props.height}>
        <Layer>
          {[...Array(16).keys()].map((r, i) => {
            let degree = 6;
            let setX = this.props.width / 2 + Math.cos(degree * i * (Math.PI / 180)) * this.props.height / 2;
            let setY = this.props.height / 2 - 100 + Math.sin(degree * i * (Math.PI / 180)) * this.props.height / 2;

            return <Rect
              ref={'rect' + i}
              key={i}
              name={String(i)}
              cornerRadius={8}
              rotation={(degree * i) - 90}
              x={setX}
              y={setY}
              width={20}
              height={i % 5 === 0 ? 80 : 60}
              fill={'whitesmoke'}
            />
          })}
        </Layer>
        <Layer>
          <Group>
            <Text
              text={this.updateTimer(timer)}
              x={this.props.width / 2 - 150}
              y={this.props.height / 2 - 50}
              fill={'whitesmoke'}
              fontSize={120}
              fontStyle={'bold'}
              fontFamily={'Roboto'}
            />
          </Group>
        </Layer>
      </Stage>
    );
  }
}