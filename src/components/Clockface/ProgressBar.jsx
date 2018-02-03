import React from 'react';
import { Path } from 'react-konva';

const ProgressBar = ({ timePercent, currentColor, x, y }) =>
  <Path
    data={'m69.7,20.2c-33.7,1.1 -61.1,28.5 -62.2,62.2c-0.6,18.6 6.7,35.5 18.8,47.6l91,-91c-12.1,-12.1 -29,-19.4 -47.6,-18.8zm-44.4,108.8c12.1,12.1 29,19.4 47.6,18.8c33.7,-1.1 61.1,-28.5 62.2,-62.2c0.6,-18.6 -6.7,-35.5 -18.8,-47.6l-91,91zm33.3,-115.1c0,-1.5 0,-3 0.1,-4.5c0.1,-1.4 0.8,-3.1 0.3,-4.5c-0.8,-2.5 -4.3,-2.6 -5.5,-0.3c-1.8,4.5 -2.5,9.2 -2.4,14c-6.7,3.2 -17,2 -24,-0.2c5.1,4 11.2,6.7 18,7.5c-6.5,3 -12.5,7 -17.6,11.9c13.7,-9.2 32.4,-7.6 44.4,3.7c-1.3,-4.6 -3.5,-8.7 -6.4,-12.3c7.3,-5.2 16.3,-7.4 25.1,-6.3c-7,-2.1 -14.2,-3 -21.5,-2.8c3.2,-2.1 6,-4.7 8.3,-7.7c-6.3,3.5 -11.4,4.1 -18.5,4.4c-0.1,-0.6 -0.2,-2.2 -0.3,-2.9'}

    fillLinearGradientStartPoint={{
      x: 75,
      y: 0
    }}
    fillLinearGradientEndPoint={{
      x: 75,
      y: 150
    }}
    fillLinearGradientColorStops={[0, '#ffffff', timePercent, '#ffffff', timePercent, currentColor, 1, currentColor]}

    x={x}
    y={y}
    width={150}
    height={150}

    offset={{
      x: 75,
      y: 75
    }}
  />

export default ProgressBar;