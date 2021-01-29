import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/00 Lobby' });

const LOBBY = {
  phase: 'lobby',
  players: [
    {
      uuid: '1',
      name: 'Alpha',
      alive: true
    },
    {
      uuid: '2',
      name: 'Bravo',
      alive: true
    },
    {
      uuid: '3',
      name: 'Charlie',
      alive: true
    },
    {
      uuid: '4',
      name: 'Delta',
      alive: true
    },
    {
      uuid: '5',
      name: 'Echo',
      alive: true
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
