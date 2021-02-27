import { configureStore } from '@reduxjs/toolkit';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import React, { useContext } from 'react';
import find from 'lodash/find';
import pick from 'lodash/pick';
import compact from 'lodash/compact';
import filter from 'lodash/filter';
import map from 'lodash/map';
import App from '../App';
import ThemeContext from '../../theme_context';

function buildPlayer(overwrites) {
  return {
    uuid: '1',
    name: 'Alpha',
    lobby: false,
    playing: true,
    left: false,
    party: 'goodParty',
    role: 'goodRole',
    alive: true,
    ...overwrites
  };
}

export function buildPlayers(n = 5, { lobby } = {}) {
  const players = [
    buildPlayer({
      uuid: '1',
      name: 'Alpha',
      lobby,
      party: 'evilParty',
      role: 'evilRole'
    }),
    buildPlayer({
      uuid: '2',
      name: 'BBBBBBBBBBBBBBBBBBBBBBravo',
      party: 'goodParty',
      role: 'goodRole',
      lobby
    }),
    buildPlayer({
      uuid: '3',
      name: 'Charlie charlie charlie',
      lobby,
      party: 'goodParty',
      role: 'goodRole'
    }),
    buildPlayer({
      uuid: '4',
      name: 'Delta',
      lobby,
      party: 'evilParty',
      role: 'villain'
    }),
    buildPlayer({
      uuid: '5',
      name: 'Echo',
      lobby,
      party: 'goodParty',
      role: 'goodRole'
    }),
    buildPlayer({
      uuid: '6',
      name: 'Foxtrot',
      lobby,
      party: 'goodParty',
      role: 'goodRole'
    }),
    buildPlayer({
      uuid: '7',
      name: 'Golf',
      lobby,
      party: 'evilParty',
      role: 'evilRole'
    }),
    buildPlayer({
      uuid: '8',
      name: 'Hotel',
      lobby,
      party: 'goodParty',
      role: 'goodRole'
    }),
    buildPlayer({
      uuid: '9',
      name: 'India',
      lobby,
      party: 'evilParty',
      role: 'evilRole'
    }),
    buildPlayer({
      uuid: '10',
      name: 'Juliet',
      lobby,
      party: 'goodParty',
      role: 'goodRole'
    })
  ].slice(0, n);

  const goods = map(
    filter(players, (player) => player.role === 'goodRole'),
    'uuid'
  );

  return {
    players,
    povUuids: {
      host: '1',
      participant: '2',
      goods,
      good: goods[0],
      evil: find(players, (player) => player.role === 'evilRole').uuid,
      villain: find(players, (player) => player.role === 'villain').uuid,
      not(uuid) {
        return map(
          filter(players, (player) => player.uuid !== uuid),
          'uuid'
        );
      }
    }
  };
}

export function buildGame(overwrites) {
  const { players } = buildPlayers();
  return {
    code: 'ABXGYP',
    phase: 'lobby',
    host: '1',
    presidentNominee: null,
    chancellorNominee: null,
    president: null,
    chancellor: null,
    chaos: 0,
    notifications: [],
    evilBoard: [
      null,
      null,
      'policy_peek',
      'execution',
      'execution',
      null
    ],
    players,
    ...overwrites,
    cards: {
      deck: [],
      hand: [],
      peek: [],
      evilParty: [],
      goodParty: [],
      ...get(overwrites, 'cards')
    }
  };
}

function knowsParty(currentPlayer, player) {
  if (player.uuid === currentPlayer.uuid) {
    return true;
  }
  if (player.investigatedBy === currentPlayer.uuid) {
    return true;
  }
  return false;
}

function getGameState(fullGameState, uuid, theme) {
  if (!fullGameState) {
    return fullGameState;
  }

  const currentPlayer = find(fullGameState.players, { uuid });

  if (currentPlayer.party === 'evilParty') {
    return {
      ...fullGameState,
      theme
    };
  }

  return {
    ...fullGameState,
    theme,
    players: fullGameState.players.map((player) => pick(player, compact([
      'uuid',
      'name',
      'alive',
      'lobby',
      knowsParty(currentPlayer, player) && 'party',
      player.uuid === uuid && 'role'
    ])))
  };
}

const SimulatedGame = ({ uuid, gameState, notification, overviewOpen, settingsOpen, errorMessage }) => {
  const theme = useContext(ThemeContext);
  const store = configureStore({
    reducer: (store) => store,
    preloadedState: {
      game: {
        user: {
          uuid: uuid,
          roomCode: get(gameState, 'code')
        },
        data: getGameState(gameState, uuid, theme),
        notificationCursor: notification ? get(gameState, 'notifications.length') - 1 : get(gameState, 'notifications.length'),
        overviewOpen,
        settingsOpen,
        errorMessage
      }
    }
  });

  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
};

export default SimulatedGame;
