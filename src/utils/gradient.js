const hexToRgb = (color) => {
  const hexColor = color.replace('#', '');
  const rgbColor = parseInt(hexColor, 16);

  return {
    r: (rgbColor >> 16) & 255,
    g: (rgbColor >> 8) & 255,
    b: rgbColor & 255
  };
}

const rgbToHex = (color) => '#' + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);

const setRgbIncrement = (firstRgbColor, lastRgbColor, steps) => {
  return {
    r: (lastRgbColor.r - firstRgbColor.r) / steps,
    g: (lastRgbColor.g - firstRgbColor.g) / steps,
    b: (lastRgbColor.b - firstRgbColor.b) / steps
  };
}

/**
 * (creates array of color steps)
 * 
 * @param {string} firstColor
 * @param {string} lastColor
 * @param {number} steps
 * @param {boolean} [reverse=false]
 * @returns {arrayOf(string)}
 **/
export const createGradientSteps = (firstColor, lastColor, steps, reverse = false) => {
  const firstRgbColor = hexToRgb(firstColor),
        lastRgbColor = hexToRgb(lastColor);
  // get increment steps for r, g, b
  const increment = setRgbIncrement(firstRgbColor, lastRgbColor, steps);

  // get result array of colors
  let result = [...Array(steps)].map((_, index) => {
    const r = firstRgbColor.r + Math.round(index * increment.r);
    const g = firstRgbColor.g + Math.round(index * increment.g);
    const b = firstRgbColor.b + Math.round(index * increment.b);

    return rgbToHex({r, g, b});
  });
  result.push(rgbToHex(lastRgbColor));

  if (reverse) {
    result.reverse();
  }

  return result;
}
