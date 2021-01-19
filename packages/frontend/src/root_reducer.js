import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from './game_slice';

const rootReducer = combineReducers({
  game: gameReducer
});

export default rootReducer;
