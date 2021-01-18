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
    joinInitiated(state){
      state.joining = true;
    },
    joinSuccessful(state, action){
      const {code, name, game} = action.payload;
      state.joining = false;
      state.code = code;
      state.name = name;
      state.data = game;
    },
    setGameData(state, action){
      state.data = action.payload
    },
    forgetGame(state){
      state.name = null;
      state.code = null;
      state.data = null;
    },
    loadScenario(state, action){
      const {name, code, data} = action.payload;
      state.name = name || state.name;
      state.code = code || state.code;
      state.data = data || state.data;
    }
  }
})

const {
  joinInitiated,
  joinSuccessful,
  setGameData,
  forgetGame,
  loadScenario
} = gamesSlice.actions;

const joinGame = ({code, name} = {}) => async (dispatch) => {
  dispatch(joinInitiated())
  const {game, user: {name: playerName, roomCode}} = await Api.joinGame(code, name);
  dispatch(joinSuccessful({name: playerName, code: roomCode, game}));
}

const refreshGame = (code) => async (dispatch) => {
  const game = await Api.getGame(code);
  dispatch(setGameData(game));
};

const resetGame = () => async (dispatch, getState) => {
  const {game:{code}} = getState();
  const game = await Api.resetGame(code);
  dispatch(setGameData(game));
}

const leaveGame = () => async(dispatch, getState) => {
  const {game: {code}} = getState();
  Api.leaveGame(code);
  dispatch(forgetGame());
}

export {
  joinGame,
  refreshGame,
  resetGame,
  loadScenario,
  leaveGame
}

export default gamesSlice.reducer
