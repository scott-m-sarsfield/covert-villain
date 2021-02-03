import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Joining Game' });

export const joiningGame = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: null,
    notification: false
  }} />
);
