import { createStore } from 'redux';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import React from 'react';
import App from '../App';

const SimulatedGame = ({ uuid, gameState, notification }) => {
  const store = createStore((store) => store, {
    game: {
      user: {
        uuid: uuid
      },
      data: gameState,
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
