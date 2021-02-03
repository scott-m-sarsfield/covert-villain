import { createStore } from 'redux';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import React from 'react';
import find from 'lodash/find';
import pick from 'lodash/pick';
import compact from 'lodash/compact';
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

export function buildGame(overwrites) {
  return {
    code: 'ABXGYP',
    phase: 'lobby',
    host: '1',
    presidentNominee: null,
    chancellorNominee: null,
    president: null,
    chancellor: null,
    cards: {
      deck: [],
      hand: [],
      peek: [],
      fascist: [],
      liberal: []
    },
    chaos: 0,
    players: [
      buildPlayer({
        uuid: '1',
        name: 'Alpha',
        lobby: true
      }),
      buildPlayer({
        uuid: '2',
        name: 'Bravo',
        lobby: true
      }),
      buildPlayer({
        uuid: '3',
        name: 'Charlie',
        lobby: true
      }),
      buildPlayer({
        uuid: '4',
        name: 'Delta',
        lobby: true
      }),
      buildPlayer({
        uuid: '5',
        name: 'Echo',
        lobby: true
      })
    ],
    notifications: [],
    ...overwrites
  };
}

function knowsParty(currentPlayer, player) {
  console.log(player); /* eslint-disable-line */
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

const SimulatedGame = ({ uuid, gameState, notification }) => {
  const store = createStore((store) => store, {
    game: {
      user: {
        uuid: uuid
      },
      data: getGameState(gameState, uuid),
      notificationCursor: notification ? get(gameState, 'notifications.length') - 1 : get(gameState, 'notifications.length')
    }
  });

  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
};

export default SimulatedGame;
