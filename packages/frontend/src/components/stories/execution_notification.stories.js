import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/10E Execution Notification' });

const POLICY_ENACTED_NOTIFICATION = {
  phase: 'president_chooses_chancellor',
  president: '4',
  players: [
    {
      uuid: '1',
      name: 'Alpha',
      role: 'fascist',
      party: 'fascist',
      alive: true
    },
    {
      uuid: '2',
      name: 'Bravo',
      role: 'liberal',
      party: 'liberal',
      alive: true
    },
    {
      uuid: '3',
      name: 'Charlie',
      role: 'liberal',
      party: 'liberal',
      alive: true
    },
    {
      uuid: '4',
      name: 'Delta',
      role: 'mussolini',
      party: 'fascist',
      alive: true
    },
    {
      uuid: '5',
      name: 'Echo',
      role: 'liberal',
      party: 'liberal',
      alive: true
    }
  ],
  notifications: [
    {
      type: 'execution',
      data: {
        uuid: '2'
      }
    }
  ]
};

export const fascistExecution = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: POLICY_ENACTED_NOTIFICATION,
    notification: true
  }} />
);

export const liberalExecution = () => (
  <SimulatedGame {...{
    uuid: '5',
    gameState: POLICY_ENACTED_NOTIFICATION,
    notification: true
  }} />
);
