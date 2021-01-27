import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/03 President Chooses Chancellor' });

const PLAYERS_CHOOSES_CHANCELLOR = {
  phase: 'president_chooses_chancellor',
  presidentNominee: '1',
  chancellorOptions: ['2', '3', '4', '5'],
  cards: {
    hand: [],
    fascist: [],
    liberal: []
  },
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
    gameState: PLAYERS_CHOOSES_CHANCELLOR,
    notification: false
  }} />
);

export const liberal = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: PLAYERS_CHOOSES_CHANCELLOR,
    notification: false
  }} />
);

export const mussolini = () => (
  <SimulatedGame {...{
    uuid: '4',
    gameState: PLAYERS_CHOOSES_CHANCELLOR,
    notification: false
  }} />
);
