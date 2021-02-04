import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Policy Peek' });

const { players, povUuids } = buildPlayers();

const presidentChoosesPoliciesGame = buildGame({
  phase: 'special_action_policy_peek',
  players,
  president: povUuids.evil,
  cards: {
    peek: [4, 15, 10]
  }
});

export const president = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const goodBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const evilBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: presidentChoosesPoliciesGame
  }} />
);
