import {combineReducers} from 'redux';
import account from './accountReducer';
import map from './mapReducer';
import chat from './chatReducer';
import game from './gameReducer'

export default combineReducers({
  account,
  map,
  chat,
  game,
});