import { combineReducers } from 'redux';
import calcReducer from './calcReducer';
import userReducer from './userReducer';
import urlReducer from './urlReducer';

const rootReducer = combineReducers({
    calc: calcReducer,
    user: userReducer,
    url: urlReducer,
});

export default rootReducer;