import React from 'react';

const Slider = ({
  id,
  label,
  changeTime,
  time,
  play
}) =>
  <div className='item'>
    <input
      className={`item__range item__range--${id}`}
      type='range'
      id={id}
      min={id === 'work' ? 25 : 5}
      max={id === 'work' ? 75 : 15}
      value={time}
      onBlur={(e) => changeTime(e.target.value)}
      onFocus={(e) => changeTime(e.target.value)}
      onChange={(e) => changeTime(e.target.value)}
      disabled={play}
    />
    <span className={`item__value item__value--${id}`}>{time}</span>
    <label className='item__label' htmlFor={id}>{label}</label>
  </div>;

export default Slider;