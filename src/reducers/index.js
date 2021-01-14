import { combineReducers } from 'redux';
import UserReducer from './userReducer';

const mainReducer = combineReducers({
  user: UserReducer,
});

export default mainReducer;
