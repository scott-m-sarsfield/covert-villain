import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Chancellor Enacts Policy' });

const { players, povUuids } = buildPlayers();

const leaderChoosesPoliciesGame = buildGame({
  phase: 'chancellor_chooses_policy',
  players,
  chancellor: povUuids.evil,
  cards: {
    hand: [15, 10]
  }
});

const vetoablePoliciesGame = {
  ...leaderChoosesPoliciesGame,
  cards: {
    hand: [4, 10],
    evilParty: [0, 1, 2, 3, 5]
  }
};

export const chancellor = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: leaderChoosesPoliciesGame
  }} />
);

export const chancellorWithVeto = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: vetoablePoliciesGame
  }} />
);

export const goodBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: leaderChoosesPoliciesGame
  }} />
);

export const evilBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: leaderChoosesPoliciesGame
  }} />
);
