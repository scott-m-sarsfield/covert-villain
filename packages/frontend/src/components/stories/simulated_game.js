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
    party: 'liberal',
    role: 'liberal',
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
      party: 'fascist',
      role: 'fascist'
    }),
    buildPlayer({
      uuid: '2',
      name: 'Bravo',
      party: 'liberal',
      role: 'liberal',
      lobby
    }),
    buildPlayer({
      uuid: '3',
      name: 'Charlie',
      lobby,
      party: 'liberal',
      role: 'liberal'
    }),
    buildPlayer({
      uuid: '4',
      name: 'Delta',
      lobby,
      party: 'fascist',
      role: 'mussolini'
    }),
    buildPlayer({
      uuid: '5',
      name: 'Echo',
      lobby,
      party: 'liberal',
      role: 'liberal'
    }),
    buildPlayer({
      uuid: '6',
      name: 'Foxtrot',
      lobby,
      party: 'liberal',
      role: 'liberal'
    }),
    buildPlayer({
      uuid: '7',
      name: 'Golf',
      lobby,
      party: 'fascist',
      role: 'fascist'
    }),
    buildPlayer({
      uuid: '8',
      name: 'Hotel',
      lobby,
      party: 'liberal',
      role: 'liberal'
    }),
    buildPlayer({
      uuid: '9',
      name: 'India',
      lobby,
      party: 'fascist',
      role: 'fascist'
    }),
    buildPlayer({
      uuid: '10',
      name: 'Juliet',
      lobby,
      party: 'liberal',
      role: 'liberal'
    })
  ].slice(0, n);

  const liberals = map(
    filter(players, (player) => player.role === 'liberal'),
    'uuid'
  );

  return {
    players,
    povUuids: {
      host: '1',
      participant: '2',
      liberals,
      liberal: liberals[0],
      fascist: find(players, (player) => player.role === 'fascist').uuid,
      mussolini: find(players, (player) => player.role === 'mussolini').uuid,
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
    fascistBoard: [
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
      fascist: [],
      liberal: [],
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

  if (currentPlayer.party === 'fascist') {
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
