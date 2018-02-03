import React from 'react';
import ReactDOM from 'react-dom';
import Pomodoro from './components';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

ReactDOM.render(<Pomodoro width={800} height={600} />, document.getElementById('root'));
registerServiceWorker();
