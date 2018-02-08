import React from 'react';
import ReactDOM from 'react-dom';
import Pomodoro from './components';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

ReactDOM.render(<Pomodoro width={640} height={480} />, document.getElementById('root'));
registerServiceWorker();
