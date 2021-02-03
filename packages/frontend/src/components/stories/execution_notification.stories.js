import React from 'react';
import SimulatedGame, { buildPlayers, buildGame } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Execution/Notification' });

const { players, povUuids } = buildPlayers();

const game = buildGame({
  phase: 'president_chooses_chancellor',
  players: players.map((player) => {
    if (player.uuid === povUuids.liberal) {
      return {
        ...player,
        alive: false
      };
    }
    return player;
  }),
  president: povUuids.mussolini,
  notifications: [
    {
      type: 'execution',
      data: {
        uuid: povUuids.liberal
      }
    }
  ]
});

export const fascistExecution = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: game,
    notification: true
  }} />
);

export const liberalExecution = () => (
  <SimulatedGame {...{
    uuid: '5',
    gameState: game,
    notification: true
  }} />
);
