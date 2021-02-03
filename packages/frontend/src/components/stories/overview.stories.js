import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Overview' });

const { players, povUuids } = buildPlayers(5);

const fivePlayerGame = buildGame({
  phase: 'president_chooses_chancellor',
  players,
  presidentNominee: povUuids.fascist,
  chancellorOptions: povUuids.not(povUuids.fascist),
  cards: {
    fascist: [1, 2, 3, 4],
    liberal: [12, 13, 14]
  },
  chaos: 1
});

const sevenPlayerGame = {
  ...fivePlayerGame,
  players: buildPlayers(7).players,
  fascistBoard: [ null, 'investigate_loyalty', 'special_election', 'execution', 'execution', null]
};

const tenPlayerGame = {
  ...fivePlayerGame,
  players: buildPlayers(10).players,
  fascistBoard: [ 'investigate_loyalty', 'investigate_loyalty', 'special_election', 'execution', 'execution', null]
};

export const fascistFivePlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: fivePlayerGame,
    overviewOpen: true
  }} />
);

export const liberalFivePlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: fivePlayerGame,
    overviewOpen: true
  }} />
);

export const liberalSevenPlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: sevenPlayerGame,
    overviewOpen: true
  }} />
);

export const liberalTenPlayerGame = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: tenPlayerGame,
    overviewOpen: true
  }} />
);
