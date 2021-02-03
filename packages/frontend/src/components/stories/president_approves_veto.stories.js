import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/President Approves Veto' });

const { players, povUuids } = buildPlayers();

const presidentChoosesPoliciesGame = buildGame({
  phase: 'president_approves_veto',
  players,
  president: povUuids.mussolini,
  chancellor: povUuids.liberals[0],
  cards: {
    hand: [4, 15],
    fascist: [1, 2, 3, 5, 6]
  }
});

export const president = () => (
  <SimulatedGame {...{
    uuid: povUuids.mussolini,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const liberalBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberals[1],
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const fascistBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: presidentChoosesPoliciesGame
  }} />
);
