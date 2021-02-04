import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Overview' });

const { players, povUuids } = buildPlayers(5);

const fivePlayerGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.red,
  chancellorOptions: povUuids.not(povUuids.red),
  cards: {
    redParty: [1, 2, 3, 4],
    blueParty: [12, 13, 14]
  },
  chaos: 1
});

const sevenPlayerGame = {
  ...fivePlayerGame,
  players: buildPlayers(7).players,
  redBoard: [ null, 'investigate_loyalty', 'special_election', 'execution', 'execution', null]
};

const tenPlayerGame = {
  ...fivePlayerGame,
  players: buildPlayers(10).players,
  redBoard: [ 'investigate_loyalty', 'investigate_loyalty', 'special_election', 'execution', 'execution', null]
};

export const redFivePlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: fivePlayerGame,
    overviewOpen: true
  }} />
);

export const blueFivePlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: fivePlayerGame,
    overviewOpen: true
  }} />
);

export const blueSevenPlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: sevenPlayerGame,
    overviewOpen: true
  }} />
);

export const blueTenPlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: tenPlayerGame,
    overviewOpen: true
  }} />
);
