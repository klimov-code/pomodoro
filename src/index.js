import React from 'react';
import ReactDOM from 'react-dom';
import Pomodoro from './components/Pomodoro';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pomodoro width={1000} height={700}/>, document.getElementById('root'));
registerServiceWorker();
