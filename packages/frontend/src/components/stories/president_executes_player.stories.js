import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Execution/President Executes Player' });

const { players, povUuids } = buildPlayers();

const evilPresidentGame = buildGame({
  phase: 'special_action_execution',
  players,
  president: povUuids.evil
});

const goodPresidentGame = {
  ...evilPresidentGame,
  president: povUuids.good
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
