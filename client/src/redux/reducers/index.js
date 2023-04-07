import { combineReducers } from 'redux';
import user from './users';
import admin from './admin';

export default combineReducers({
    user,
    admin,
});