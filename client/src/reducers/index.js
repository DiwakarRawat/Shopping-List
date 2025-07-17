import { combineReducers } from 'redux';
import itemReducer from './itemReducer'; // or whatever your reducer file is
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  item: itemReducer, // key name should match your state access pattern
  error: errorReducer,
  auth: authReducer
});

export default rootReducer;
