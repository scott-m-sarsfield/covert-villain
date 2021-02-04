import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/President Approves Veto' });

const { players, povUuids } = buildPlayers();

const presidentChoosesPoliciesGame = buildGame({
  phase: 'president_approves_veto',
  players,
  president: povUuids.villain,
  chancellor: povUuids.goods[0],
  cards: {
    hand: [4, 15],
    evilParty: [1, 2, 3, 5, 6]
  }
});

export const president = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const goodBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.goods[1],
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const evilBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: presidentChoosesPoliciesGame
  }} />
);
