import { combineReducers } from 'redux';
import calcReducer from './calcReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    calc: calcReducer,
    user: userReducer,
});

export default rootReducer;