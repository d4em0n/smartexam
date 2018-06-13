import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import appReducer from '../reducers/reducer';

const config = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['auth', 'profile'],
}

const pReducer = persistReducer(config, appReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store)
