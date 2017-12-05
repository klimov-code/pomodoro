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

  shouldComponentUpdate(nextProps) {
    const nextTimer = this.updateTimer(nextProps.timer),
          prevTimer = this.updateTimer(this.props.timer),
          nextPlay = nextProps.play,
          prevPlay = this.props.play;

    if (nextTimer <= prevTimer && nextPlay !== prevPlay) {
        return false;
    }
    return true;
  }

  componentDidUpdate() {
    const dial = this.refs.canvasDial10;
    dial.to({
      x: 500,
      y: 500,
      duration: 0.3
    });
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer, width, height } = this.props;
    return (
      <Stage width={width} height={height}>
        <Layer>
          <Group>
            {[...Array(16).keys()].map((r, i) => {
              let degree = 6;
              let setX = (width / 2) + (Math.cos(degree * i * (Math.PI / 180)) * height / 2);
              let setY = (height / 2) + (Math.sin(degree * i * (Math.PI / 180)) * height / 2) - 100;

              return <Rect
                ref={'canvasDial' + i}
                key={i}
                name={'' + i}
                cornerRadius={8}
                rotation={(degree * i) - 90}
                x={setX}
                y={setY}
                opacity={0.06 * i + 0.1}
                width={20}
                height={i % 5 ? 60 : 80}
                fill={'#f5f5f5'}
              />
            })}
          </Group>
        </Layer>
        <Layer>
          <Text
            ref={'canvasTimer'}
            text={this.updateTimer(timer)}
            x={width / 2 - 150}
            y={height / 2 - 50}
            fill={'#f5f5f5'}
            fontSize={120}
            fontStyle={'bold'}
            fontFamily={'Roboto'}
          />
        </Layer>
      </Stage>
    );
  }
}