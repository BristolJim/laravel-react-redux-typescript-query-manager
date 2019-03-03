import * as React from 'react';
import {render} from 'react-dom';

import App from './components/App';

if (document.getElementById('app-content')) {
    render(
        <App />, document.getElementById('app-content')
    );
}