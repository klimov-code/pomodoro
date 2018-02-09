import React from 'react';
import { Group, Rect } from 'react-konva';

const Dial = ({ dial, currentColor }) =>
  <Group>
    {dial.map((division, index) =>
      <Rect
        key={index}

        cornerRadius={8}
        fill={currentColor}
        opacity={division.opacity}

        x={division.x}
        y={division.y - 50}
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

export default Dial;