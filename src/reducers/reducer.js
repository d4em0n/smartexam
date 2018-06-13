import profile from './profileReducer';
import auth from './authReducer';
import {combineReducers} from 'redux';

const appReducer = combineReducers({
    profile,
    auth
});

export default appReducer;
