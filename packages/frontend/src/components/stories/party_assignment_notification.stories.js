import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/02 Party Assignment Notification' });

const PLAYERS_GET_PARTY_ASSIGMENT_NOTIFICATION = {
  phase: 'president_chooses_chancellor',
  players: [
    {
      uuid: '1',
      name: 'Alpha',
      role: 'fascist',
      party: 'fascist'
    },
    {
      uuid: '2',
      name: 'Bravo',
      role: 'liberal',
      party: 'liberal'
    },
    {
      uuid: '3',
      name: 'Charlie',
      role: 'liberal',
      party: 'liberal'
    },
    {
      uuid: '4',
      name: 'Delta',
      role: 'mussolini',
      party: 'fascist'
    },
    {
      uuid: '5',
      name: 'Echo',
      role: 'liberal',
      party: 'liberal'
    }
  ],
  notifications: [
    {
      type: 'party_assignment'
    }
  ]
};

export const fascist = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: PLAYERS_GET_PARTY_ASSIGMENT_NOTIFICATION,
    notification: true
  }} />
);

export const liberal = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: PLAYERS_GET_PARTY_ASSIGMENT_NOTIFICATION,
    notification: true
  }} />
);

export const mussolini = () => (
  <SimulatedGame {...{
    uuid: '4',
    gameState: PLAYERS_GET_PARTY_ASSIGMENT_NOTIFICATION,
    notification: true
  }} />
);
