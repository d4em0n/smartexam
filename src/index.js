import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {persistor, store} from './stores/store.js';
import {PersistGate} from 'redux-persist/lib/integration/react';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
