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
    notificationCursor: 0,
    executingAction: false,
    overviewOpen: false
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
    joinFailed(state) {
      state.joining = false;
    },
    actionInitiated(state) {
      state.executingAction = true;
    },
    actionSuccessful(state) {
      state.executingAction = false;
    },
    actionFailed(state) {
      state.executingAction = false;
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
    },
    toggleOverview(state) {
      state.overviewOpen = !state.overviewOpen;
    }
  }
});

const {
  joinInitiated,
  joinSuccessful,
  joinFailed,
  actionInitiated,
  actionSuccessful,
  actionFailed,
  setGameData,
  forgetGame,
  loadScenario,
  readNotification,
  toggleOverview
} = gamesSlice.actions;

const joinGame = ({ code, name } = {}) => async (dispatch) => {
  dispatch(joinInitiated());
  try {
    const { game, user } = await Api.joinGame(code, name);
    dispatch(joinSuccessful({ user, game }));
  } catch (err) {
    dispatch(joinFailed());
  }
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
  return (...args) => async (dispatch, getState) => {
    const state = getState();
    const code = get(state, 'game.user.roomCode');
    try {
      dispatch(actionInitiated());
      await api(code, ...args);
      dispatch(actionSuccessful());
    } catch (err) {
      dispatch(actionFailed());
    }
  };
}

const startGame = callApiWithCode((code) => Api.startGame(code));
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
  forgetGame,
  readNotification,
  chooseChancellor,
  vote,
  discardPolicy,
  enactPolicy,
  endPolicyPeek,
  executePlayer,
  toggleOverview
};

export default gamesSlice.reducer;
