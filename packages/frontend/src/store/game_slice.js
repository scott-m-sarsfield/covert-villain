import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import Api from '../api';
import Socket from '../components/socket';

const gamesSlice = createSlice({
  name: 'game',
  initialState: {
    user: null,
    data: null,
    joining: false,
    notificationCursor: 0,
    executingAction: false,
    overviewOpen: false,
    errorMessage: null
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
    joinFailed(state, action) {
      const { error } = action.payload;
      state.joining = false;
      state.errorMessage = error;
    },
    actionInitiated(state) {
      state.executingAction = true;
    },
    actionSuccessful(state) {
      state.executingAction = false;
    },
    actionFailed(state, action) {
      const { error } = action.payload;
      state.executingAction = false;
      state.errorMessage = error;
    },
    dismissError(state) {
      state.errorMessage = null;
    },
    setGameData(state, action) {
      state.data = action.payload;
      const player = find(action.payload.players, { uuid: state.user.uuid });
      if (get(player, 'lobby')) {
        state.notificationCursor = 0;
        state.overviewOpen = false;
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
  toggleOverview,
  dismissError
} = gamesSlice.actions;

const joinGame = ({ code, name } = {}) => async (dispatch) => {
  dispatch(joinInitiated());
  try {
    const { game, user } = await Api.joinGame(code, name);
    dispatch(joinSuccessful({ user, game }));
  } catch (err) {
    dispatch(joinFailed({ error: err.error }));
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

const leaveGame = () => async (dispatch, getState) => {
  const state = getState();
  const code = get(state, 'game.user.roomCode');
  const socket = Socket.getSocket();
  try {
    socket.emit('leave-game', code);
    await Api.leaveGame(code);
    dispatch(forgetGame());
  } catch (err) {
    socket.emit('join-game', code);
    dispatch(actionFailed(err.error));
  }
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
      dispatch(actionFailed({ error: err.error }));
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
const investigate = callApiWithCode((code, uuid) => Api.investigate(code, uuid));
const choosePresident = callApiWithCode((code, uuid) => Api.choosePresident(code, uuid));
const approveVeto = callApiWithCode((code, approved) => Api.approveVeto(code, approved));
const goToLobby = callApiWithCode((code) => Api.goToLobby(code));

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
  investigate,
  choosePresident,
  toggleOverview,
  approveVeto,
  dismissError,
  goToLobby
};

export default gamesSlice.reducer;
