import { configureStore } from '@reduxjs/toolkit';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import React from 'react';
import find from 'lodash/find';
import pick from 'lodash/pick';
import compact from 'lodash/compact';
import filter from 'lodash/filter';
import map from 'lodash/map';
import App from '../App';

function buildPlayer(overwrites) {
  return {
    uuid: '1',
    name: 'Alpha',
    lobby: false,
    playing: true,
    left: false,
    party: 'blueParty',
    role: 'blueRole',
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
      party: 'redParty',
      role: 'redRole'
    }),
    buildPlayer({
      uuid: '2',
      name: 'Bravo',
      party: 'blueParty',
      role: 'blueRole',
      lobby
    }),
    buildPlayer({
      uuid: '3',
      name: 'Charlie',
      lobby,
      party: 'blueParty',
      role: 'blueRole'
    }),
    buildPlayer({
      uuid: '4',
      name: 'Delta',
      lobby,
      party: 'redParty',
      role: 'villain'
    }),
    buildPlayer({
      uuid: '5',
      name: 'Echo',
      lobby,
      party: 'blueParty',
      role: 'blueRole'
    }),
    buildPlayer({
      uuid: '6',
      name: 'Foxtrot',
      lobby,
      party: 'blueParty',
      role: 'blueRole'
    }),
    buildPlayer({
      uuid: '7',
      name: 'Golf',
      lobby,
      party: 'redParty',
      role: 'redRole'
    }),
    buildPlayer({
      uuid: '8',
      name: 'Hotel',
      lobby,
      party: 'blueParty',
      role: 'blueRole'
    }),
    buildPlayer({
      uuid: '9',
      name: 'India',
      lobby,
      party: 'redParty',
      role: 'redRole'
    }),
    buildPlayer({
      uuid: '10',
      name: 'Juliet',
      lobby,
      party: 'blueParty',
      role: 'blueRole'
    })
  ].slice(0, n);

  const blues = map(
    filter(players, (player) => player.role === 'blueRole'),
    'uuid'
  );

  return {
    players,
    povUuids: {
      host: '1',
      participant: '2',
      blues,
      blue: blues[0],
      red: find(players, (player) => player.role === 'redParty').uuid,
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
    redBoard: [
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
      redParty: [],
      blueParty: [],
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

function getGameState(fullGameState, uuid) {
  if (!fullGameState) {
    return fullGameState;
  }

  const currentPlayer = find(fullGameState.players, { uuid });

  if (currentPlayer.party === 'redParty') {
    return fullGameState;
  }

  return {
    ...fullGameState,
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

const SimulatedGame = ({ uuid, gameState, notification, overviewOpen }) => {
  const store = configureStore({
    reducer: (store) => store,
    preloadedState: {
      game: {
        user: {
          uuid: uuid,
          roomCode: get(gameState, 'code')
        },
        data: getGameState(gameState, uuid),
        notificationCursor: notification ? get(gameState, 'notifications.length') - 1 : get(gameState, 'notifications.length'),
        overviewOpen
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
