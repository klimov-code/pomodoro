import React from 'react';
import { Text } from 'react-konva';

const Timer = ({ time, currentColor, x, y }) =>
  <Text
    fontFamily={'Roboto'}
    fontSize={128}
    fontStyle={'bold'}

    text={time}
    align={'center'}
    fill={currentColor}

    x={x}
    y={y}
    width={512}
    height={128}

    offset={{
      x: 256,
      y: 64
    }}
  />

export default Timer;