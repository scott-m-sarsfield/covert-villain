import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Special Election/President Chooses Presidential Candidate' });

const { players, povUuids } = buildPlayers();

const evilPresidentGame = buildGame({
  phase: 'special_action_election',
  players,
  president: povUuids.evil,
  presidentOptions: povUuids.not(povUuids.evil)
});

const goodPresidentGame = {
  ...evilPresidentGame,
  president: povUuids.good,
  presidentOptions: povUuids.not(povUuids.good)
};

export const evilPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: evilPresidentGame
  }} />
);

export const goodPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: goodPresidentGame
  }} />
);

export const goodBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: evilPresidentGame
  }} />
);

export const evilBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: evilPresidentGame
  }} />
);
