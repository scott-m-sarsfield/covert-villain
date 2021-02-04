import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/President Chooses Policies' });

const { players, povUuids } = buildPlayers();

const presidentChoosesPoliciesGame = buildGame({
  phase: 'president_chooses_policies',
  players,
  president: povUuids.red,
  cards: {
    hand: [4, 15, 10]
  }
});

export const president = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const blueBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const redBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: presidentChoosesPoliciesGame
  }} />
);
