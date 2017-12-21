import React, { Component } from 'react';
import { number, oneOfType, string, func, arrayOf, object } from 'prop-types';
import { Stage, Layer, Group, Rect, Text } from 'react-konva';
import { Easings } from 'konva';

import './index.scss';

// codename "Stonehedge"
export default class Clockface extends Component {

  static propTypes = {
    timer: oneOfType([string, func]).isRequired,
    width: number.isRequired,
    height: number.isRequired,
    dial: arrayOf(object).isRequired
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.play === this.props.play) {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps) {
    const animateDial = this.refs.dial.children;
    const { dial } = nextProps;

    animateDial.forEach((division, index) =>
      division.to({
        opacity: dial[index].opacity,
        x: dial[index].x,
        y: dial[index].y,
        rotation: dial[index].rotation,
        duration: 0.33,
        easing: Easings.EaseInOut
      })
    );
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer, width, height, dial } = this.props;

    return (
      <Stage width={width} height={height}>
        <Layer>
          <Group ref={'dial'}>
            {dial.map((division, index) =>
              <Rect
                key={index}

                cornerRadius={8}
                fill={'#f5f5f5'}
                opacity={division.opacity}

                x={division.x}
                y={division.y}
                width={20}
                height={index % 5 ? 60 : 80}

                rotation={division.rotation}
                offset={{
                  x: 10,
                  y: index % 5 ? 30 : 40
                }}
              />
            )}
          </Group>
        </Layer>
        <Layer>
          <Text
            fontFamily={'Roboto'}
            fontSize={128}
            fontStyle={'bold'}

            text={this.updateTimer(timer)}
            align={'center'}
            fill={'#f5f5f5'}

            x={width / 2 - 256}
            y={height / 2 - 64}
            width={512}
            height={128}
          />
        </Layer>
      </Stage>
    );
  }
}