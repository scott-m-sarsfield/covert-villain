import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Candidate Nominates Chancellor' });

const { players, povUuids } = buildPlayers();

const evilPresidentGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.evil,
  chancellorOptions: povUuids.not(povUuids.evil)
});

const goodPresidentGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.good,
  chancellorOptions: povUuids.not(povUuids.good)
});

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

export const goodNonPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: evilPresidentGame,
    notification: false
  }} />
);

export const evilNonPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: evilPresidentGame,
    notification: false
  }} />
);
