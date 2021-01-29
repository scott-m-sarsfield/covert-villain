import { createStore } from 'redux';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import React from 'react';
import find from 'lodash/find';
import pick from 'lodash/pick';
import compact from 'lodash/compact';
import App from '../App';

function getGameState(fullGameState, uuid) {
  if (!fullGameState) {
    return fullGameState;
  }

  const player = find(fullGameState.players, { uuid });

  if (player.party === 'fascist') {
    return fullGameState;
  }

  return {
    ...fullGameState,
    players: fullGameState.players.map((player) => pick(player, compact([
      'uuid',
      'name',
      'alive',
      player.uuid === uuid && 'party',
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
