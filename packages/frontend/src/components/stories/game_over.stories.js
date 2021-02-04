import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Game Over' });

const { players, povUuids } = buildPlayers();

export const redPolicyWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        redParty: [1, 2, 3, 4, 5, 6]
      }
    })
  }} />
);

export const bluePolicyWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        blueParty: [12, 13, 14, 15, 16]
      }
    })
  }} />
);

export const villainElectedWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        redParty: [1, 2, 3]
      },
      chancellor: povUuids.villain
    })
  }} />
);

export const villainKilledWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: buildGame({
      phase: 'lobby',
      players: players.map((player) => {
        if (player.role === 'villain') {
          return {
            ...player,
            alive: false
          };
        }
        return player;
      }),
      cards: {
        redParty: [1, 2, 3, 4]
      }
    })
  }}/>
);
