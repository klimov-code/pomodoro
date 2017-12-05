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
          {[...Array(15).keys()].map((r, i) => {
            let degree = 10;
            let setX = this.props.width / 2 + Math.cos(degree * i * 0.017453) * 500;
            let setY = this.props.height / 2 + Math.sin(degree * i * 0.0174533) * 280;

            return <Rect
              ref={'rect' + i}
              key={i}
              name={String(i)}
              cornerRadius={8}
              x={setX}
              y={setY}
              width={20}
              height={60}
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