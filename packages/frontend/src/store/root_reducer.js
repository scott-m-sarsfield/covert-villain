import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from './game_slice';
import themeReducer from './theme_slice';

const rootReducer = combineReducers({
  game: gameReducer,
  theme: themeReducer
});

export default rootReducer;
