import React from 'react';

const Settings = ({ children }) =>
  <aside className='items__settings'>
    <h1 className='items__title'>Settings</h1>
    {children}
  </aside>;

export default Settings;
