import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Candidate Nominates Chancellor' });

const { players, povUuids } = buildPlayers();

const fascistPresidentGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.fascist,
  chancellorOptions: povUuids.not(povUuids.fascist)
});

const liberalPresidentGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.liberal,
  chancellorOptions: povUuids.not(povUuids.liberal)
});

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

export const liberalNonPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: fascistPresidentGame,
    notification: false
  }} />
);

export const fascistNonPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.mussolini,
    gameState: fascistPresidentGame,
    notification: false
  }} />
);
