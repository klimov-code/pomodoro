import React, { Component } from 'react';
import { number, bool, oneOfType, string, func } from 'prop-types';
import { Stage, Layer, Group, Rect, Text } from 'react-konva';
import Konva from 'konva';

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
    const dial = this.refs.dial.children;
    dial.forEach(sec => {
      sec.to({
        x: 500,
        y: 500,
        duration: 0.5,
        easing: Konva.Easings.EaseInOut
      });
    });
  }

  setCoordinates(index) {
    let degree = 6;
    let setX = (this.props.width / 2) + (Math.cos(degree * index * (Math.PI / 180)) * this.props.height / 2);
    let setY = (this.props.height / 2) + (Math.sin(degree * index * (Math.PI / 180)) * this.props.height / 2) - 100;

    return { degree, setX, setY };
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer, width, height } = this.props;
    return (
      <Stage width={width} height={height}>
        <Layer>
          <Group ref={'dial'}>
            {[...Array(16).keys()].map((_, index) => {
              const { degree, setX, setY } = this.setCoordinates(index);

              return <Rect
                key={index}
                name={'' + index}

                cornerRadius={8}
                fill={'#f5f5f5'}
                opacity={0.06 * index + 0.1}

                x={setX}
                y={setY}
                width={20}
                height={index % 5 ? 60 : 80}
                rotation={(degree * index) - 90}
                offset={{
                  x: 10,
                  y: index % 5 ? 30 : 40
                }}
              />
            })}
          </Group>
        </Layer>
        <Layer>
          <Text
            fontFamily={'Roboto'}
            fontSize={120}
            fontStyle={'bold'}

            text={this.updateTimer(timer)}
            align={'center'}
            fill={'#f5f5f5'}

            x={width / 2 - 200}
            y={height / 2 - 60}
            width={400}
            height={120}
          />
        </Layer>
      </Stage>
    );
  }
}