import {createSlice} from '@reduxjs/toolkit';
import Api from '../api';

const gamesSlice = createSlice({
  name: 'game',
  initialState: {
    name: null,
    code: null,
    data: null,
    joining: false
  },
  reducers: {
    joinInitiated(state, action){
      const {code, name} = action.payload;
      state.joining = true;
      state.name = name;
      state.code = code;
    },
    joinSuccessful(state, action){
      state.joining = false;
      state.data = action.payload;
    },
    setGameData(state, action){
      state.data = action.payload
    },
    exitGame(state){
      state.name = null;
      state.code = null;
      state.data = null;
    }
  }
})

const {
  joinInitiated,
  joinSuccessful,
  setGameData,
  exitGame
} = gamesSlice.actions;

const joinGame = ({code, name}) => async (dispatch) => {
  dispatch(joinInitiated({code, name}))
  const game = await Api.joinGame(code, name);
  dispatch(joinSuccessful(game))
}

const refreshGame = (code) => async (dispatch) => {
  const game = await Api.getGame(code);
  dispatch(setGameData(game));
};

const resetGame = () => async (dispatch, getState) => {
  const {code} = getState();
  const game = await Api.resetGame(code);
  dispatch(setGameData(game));
}

export {
  joinGame,
  refreshGame,
  resetGame,
  exitGame
}

export default gamesSlice.reducer
