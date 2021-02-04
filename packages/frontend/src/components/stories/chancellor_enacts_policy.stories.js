import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Chancellor Enacts Policy' });

const { players, povUuids } = buildPlayers();

const leaderChoosesPoliciesGame = buildGame({
  phase: 'chancellor_chooses_policy',
  players,
  chancellor: povUuids.red,
  cards: {
    hand: [15, 10]
  }
});

const vetoablePoliciesGame = {
  ...leaderChoosesPoliciesGame,
  cards: {
    hand: [4, 10],
    redParty: [0, 1, 2, 3, 5]
  }
};

export const chancellor = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: leaderChoosesPoliciesGame
  }} />
);

export const chancellorWithVeto = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: vetoablePoliciesGame
  }} />
);

export const blueBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: leaderChoosesPoliciesGame
  }} />
);

export const redBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: leaderChoosesPoliciesGame
  }} />
);
