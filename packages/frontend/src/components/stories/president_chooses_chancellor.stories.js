import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Candidate Nominates Chancellor' });

const { players, povUuids } = buildPlayers();

const redPresidentGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.red,
  chancellorOptions: povUuids.not(povUuids.red)
});

const bluePresidentGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.blue,
  chancellorOptions: povUuids.not(povUuids.blue)
});

export const redPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: redPresidentGame
  }} />
);

export const bluePresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: bluePresidentGame
  }} />
);

export const blueNonPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: redPresidentGame,
    notification: false
  }} />
);

export const redNonPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: redPresidentGame,
    notification: false
  }} />
);
