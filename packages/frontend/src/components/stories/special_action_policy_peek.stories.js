import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Policy Peek' });

const { players, povUuids } = buildPlayers();

const presidentChoosesPoliciesGame = buildGame({
  phase: 'special_action_policy_peek',
  players,
  president: povUuids.fascist,
  cards: {
    peek: [4, 15, 10]
  }
});

export const president = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const liberalBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const fascistBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.mussolini,
    gameState: presidentChoosesPoliciesGame
  }} />
);
