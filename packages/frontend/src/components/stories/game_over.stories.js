import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Game Over' });

const { players, povUuids } = buildPlayers();

export const evilPolicyWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        evilParty: [1, 2, 3, 4, 5, 6]
      }
    })
  }} />
);

export const goodPolicyWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        goodParty: [12, 13, 14, 15, 16]
      }
    })
  }} />
);

export const villainElectedWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: buildGame({
      phase: 'lobby',
      players,
      cards: {
        evilParty: [1, 2, 3]
      },
      chancellor: povUuids.villain
    })
  }} />
);

export const villainKilledWin = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
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
        evilParty: [1, 2, 3, 4]
      }
    })
  }}/>
);
