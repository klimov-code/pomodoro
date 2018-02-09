import React from 'react';

const Checkbox = ({ id, text }) =>
  <div className='item'>
    <input className='item__checkbox' type='checkbox' id={id} />
    <label className='item__label' htmlFor={id}>{text}</label>
  </div>;

export default Checkbox;