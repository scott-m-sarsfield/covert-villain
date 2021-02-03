import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Chancellor Enacts Policy' });

const { players, povUuids } = buildPlayers();

const presidentChoosesPoliciesGame = buildGame({
  phase: 'chancellor_chooses_policy',
  players,
  chancellor: povUuids.fascist,
  cards: {
    hand: [15, 10]
  }
});

const vetoablePoliciesGame = {
  ...presidentChoosesPoliciesGame,
  cards: {
    hand: [4, 10],
    fascist: [0, 1, 2, 3, 5]
  }
};

export const chancellor = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: presidentChoosesPoliciesGame
  }} />
);

export const chancellorWithVeto = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: vetoablePoliciesGame
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
