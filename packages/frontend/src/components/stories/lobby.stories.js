import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/00 Lobby' });

const LOBBY = {
  phase: 'lobby',
  players: [
    {
      uuid: '1',
      name: 'Alpha'
    },
    {
      uuid: '2',
      name: 'Bravo'
    },
    {
      uuid: '3',
      name: 'Charlie'
    },
    {
      uuid: '4',
      name: 'Delta'
    },
    {
      uuid: '5',
      name: 'Echo'
    }
  ],
  notifications: [
    {
      type: 'party_assignment'
    }
  ]
};

export const lobby = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: LOBBY,
    notification: false
  }} />
);
