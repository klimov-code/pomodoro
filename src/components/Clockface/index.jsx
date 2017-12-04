import React, { Component } from 'react';
import { string, number, bool } from 'prop-types';
import { Stage, Layer, Rect } from 'react-konva';
import { Util } from 'konva'

// codename "Stonehedge"
export default class Clockface extends Component {

  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    color: string,
    animationSpeed: number,
    play: bool
  }

  render() {
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
              fill={'tomato'}
            />
          })}
        </Layer>
      </Stage>
    );
  }
}