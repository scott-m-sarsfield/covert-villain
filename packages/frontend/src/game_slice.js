import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import Api from './api';

const gamesSlice = createSlice({
  name: 'game',
  initialState: {
    user: null,
    data: null,
    joining: false,
    notificationCursor: 0
  },
  reducers: {
    joinInitiated(state) {
      state.joining = true;
    },
    joinSuccessful(state, action) {
      const { user, game } = action.payload;
      state.joining = false;
      state.user = user;
      state.data = game;
      state.notificationCursor = game.notifications.length;
    },
    setGameData(state, action) {
      state.data = action.payload;
      if (action.payload.notifications.length < state.notificationCursor) {
        state.notificationCursor = 0;
      }
    },
    forgetGame(state) {
      state.user = null;
      state.data = null;
    },
    loadScenario(state, action) {
      forEach(action.payload, (value, key) => {
        state[key] = value;
      });
    },
    readNotification(state) {
      state.notificationCursor++;
    }
  }
});

const {
  joinInitiated,
  joinSuccessful,
  setGameData,
  forgetGame,
  loadScenario,
  readNotification
} = gamesSlice.actions;

const joinGame = ({ code, name } = {}) => async (dispatch) => {
  dispatch(joinInitiated());
  const { game, user } = await Api.joinGame(code, name);
  dispatch(joinSuccessful({ user, game }));
};

const refreshGame = (code) => async (dispatch) => {
  const game = await Api.getGame(code);
  dispatch(setGameData(game));
};

const resetGame = () => async (dispatch, getState) => {
  const state = getState();
  const code = get(state, 'game.user.roomCode');
  const game = await Api.resetGame(code);
  dispatch(setGameData(game));
};

const leaveGame = () => (dispatch, getState) => {
  const state = getState();
  const code = get(state, 'game.user.roomCode');
  Api.leaveGame(code);
  dispatch(forgetGame());
};

function callApiWithCode(api) {
  return (...args) => (dispatch, getState) => {
    const state = getState();
    const code = get(state, 'game.user.roomCode');
    api(code, ...args);
  };
}

const startGame = callApiWithCode((code) => Api.startGame(code));
const pressButton = callApiWithCode((code) => Api.pressButton(code));
const chooseChancellor = callApiWithCode((code, uuid) => Api.chooseChancellor(code, uuid));
const vote = callApiWithCode((code, approved) => Api.vote(code, approved));
const discardPolicy = callApiWithCode((code, card) => Api.discardPolicy(code, card));
const enactPolicy = callApiWithCode((code, card) => Api.enactPolicy(code, card));
const endPolicyPeek = callApiWithCode((code) => Api.endPolicyPeek(code));
const executePlayer = callApiWithCode((code, uuid) => Api.executePlayer(code, uuid));

export {
  joinGame,
  refreshGame,
  resetGame,
  loadScenario,
  leaveGame,
  startGame,
  pressButton,
  forgetGame,
  readNotification,
  chooseChancellor,
  vote,
  discardPolicy,
  enactPolicy,
  endPolicyPeek,
  executePlayer
};

export default gamesSlice.reducer;
