
import { combineReducers } from 'redux';
import calcReducer from './calcReducer';

const rootReducer = combineReducers({
    calc: calcReducer,
});

export default rootReducer;