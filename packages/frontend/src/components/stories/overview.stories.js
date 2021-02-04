import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Overview' });

const { players, povUuids } = buildPlayers(5);

const fivePlayerGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.evil,
  chancellorOptions: povUuids.not(povUuids.evil),
  cards: {
    evilParty: [1, 2, 3, 4],
    goodParty: [12, 13, 14]
  },
  chaos: 1
});

const sevenPlayerGame = {
  ...fivePlayerGame,
  players: buildPlayers(7).players,
  evilBoard: [ null, 'investigate_loyalty', 'special_election', 'execution', 'execution', null]
};

const tenPlayerGame = {
  ...fivePlayerGame,
  players: buildPlayers(10).players,
  evilBoard: [ 'investigate_loyalty', 'investigate_loyalty', 'special_election', 'execution', 'execution', null]
};

export const evilFivePlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: fivePlayerGame,
    overviewOpen: true
  }} />
);

export const goodFivePlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: fivePlayerGame,
    overviewOpen: true
  }} />
);

export const goodSevenPlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: sevenPlayerGame,
    overviewOpen: true
  }} />
);

export const goodTenPlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: tenPlayerGame,
    overviewOpen: true
  }} />
);
