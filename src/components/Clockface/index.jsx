import React, { Component } from 'react';
import { number, bool, oneOfType, string, func } from 'prop-types';
import { Stage, Layer, Group, Rect, Text } from 'react-konva';
import { Easings } from 'konva';

import './index.scss';

// codename "Stonehedge"
export default class Clockface extends Component {

  state = {
    dial: []
  }

  static propTypes = {
    timer: oneOfType([string, func]).isRequired,
    width: number.isRequired,
    height: number.isRequired,
    play: bool.isRequired
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

  componentDidMount() {
    this.setInitialState();
  }

  componentWillUpdate() {
    const DIAL = this.refs.dial.children;
    const firstDivision = DIAL[0];

    DIAL.map((division, index) => {
      if (index < 15 ) {
        const { degree, setX, setY } = this.getCoordinates(index + 1);

        division.to({
          opacity: 0.1 + 0.06 * (index + 1),
          x: setX,
          y: setY,
          rotation: 90 - degree * (index + 1),
          duration: 0.5,
          easing: Easings.EaseInOut
        });
      } else {
        division.to({
          opacity: firstDivision.opacity,
          x: firstDivision.x,
          y: firstDivision.y,
          rotation: firstDivision.rotation,
          duration: 0.5,
          easing: Easings.EaseInOut
        });
      }

      return this;
    });

    this.updateState(DIAL);
  }

  updateState(state) {
    this.setState({
      dial: state
    });
  }

  setInitialState() {
    const DIAL = [...Array(15)].map((_, index) => {
      const { degree, setX, setY } = this.getCoordinates(index);

      return {
        opacity: 0.1 + 0.06 * index,
        x: setX,
        y: setY,
        width: 20,
        height: index % 5 ? 60 : 80,
        rotation: 90 - degree * index,
      }
    });

    this.updateState(DIAL);
  }

  getCoordinates(index) {
    const { width, height } = this.props;
    let degree = 6;
    let setX = (width / 2) + (Math.cos(degree * index * (Math.PI / 180)) * height / 2);
    let setY = (height / 2) + (Math.sin(degree * index * (Math.PI / 180)) * height / 2) - 100;

    return { degree, setX, setY };
  }

  updateTimer(timer) {
    return (typeof timer === 'function') ? timer() : timer;
  }

  render() {
    const { timer, width, height } = this.props;
    const { dial } = this.state;

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
                y={division.x}
                width={division.width}
                height={division.height}

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