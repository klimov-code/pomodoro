import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Pomodoro from './Pomodoro';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
registerServiceWorker();
