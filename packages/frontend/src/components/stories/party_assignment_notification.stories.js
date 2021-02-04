import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Party Assignment Notification' });

const { players, povUuids } = buildPlayers();
const game = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  notifications: [
    {
      type: 'party_assignment'
    }
  ]
});

export const evil = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: game,
    notification: true
  }} />
);

export const good = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: game,
    notification: true
  }} />
);

export const villain = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: game,
    notification: true
  }} />
);
