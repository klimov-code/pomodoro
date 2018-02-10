import React from 'react';

const Settings = ({ children }) =>
  <aside className='items'>
    <h1 className='items__title'>Settings</h1>
    {children}
  </aside>;

export default Settings;
