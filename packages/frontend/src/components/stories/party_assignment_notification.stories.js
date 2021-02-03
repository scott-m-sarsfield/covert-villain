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

export const fascist = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: game,
    notification: true
  }} />
);

export const liberal = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: game,
    notification: true
  }} />
);

export const mussolini = () => (
  <SimulatedGame {...{
    uuid: povUuids.mussolini,
    gameState: game,
    notification: true
  }} />
);
