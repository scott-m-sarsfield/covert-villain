import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Game Over' });

const { players, povUuids } = buildPlayers();

export const fascistPolicyWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        fascist: [1, 2, 3, 4, 5, 6]
      }
    })
  }} />
);

export const liberalPolicyWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        liberal: [12, 13, 14, 15, 16]
      }
    })
  }} />
);

export const mussoliniElectedWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        fascist: [1, 2, 3]
      },
      chancellor: povUuids.mussolini
    })
  }} />
);

export const mussoliniKilledWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: buildGame({
      phase: 'lobby',
      players: players.map((player) => {
        if (player.role === 'mussolini') {
          return {
            ...player,
            alive: false
          };
        }
        return player;
      }),
      cards: {
        fascist: [1, 2, 3, 4]
      }
    })
  }}/>
);
