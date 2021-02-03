import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Execution/President Executes Player' });

const { players, povUuids } = buildPlayers();

const fascistPresidentGame = buildGame({
  phase: 'special_action_execution',
  players,
  president: povUuids.fascist
});

const liberalPresidentGame = {
  ...fascistPresidentGame,
  president: povUuids.liberal
};

export const fascistPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: fascistPresidentGame
  }} />
);

export const liberalPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: liberalPresidentGame
  }} />
);

export const liberalBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: fascistPresidentGame
  }} />
);

export const fascistBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.mussolini,
    gameState: fascistPresidentGame
  }} />
);