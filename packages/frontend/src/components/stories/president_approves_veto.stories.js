import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/President Approves Veto' });

const { players, povUuids } = buildPlayers();

const presidentChoosesPoliciesGame = buildGame({
  phase: 'president_approves_veto',
  players,
  president: povUuids.villain,
  chancellor: povUuids.blues[0],
  cards: {
    hand: [4, 15],
    redParty: [1, 2, 3, 5, 6]
  }
});

export const president = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const blueBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.blues[1],
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const redBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: presidentChoosesPoliciesGame
  }} />
);
