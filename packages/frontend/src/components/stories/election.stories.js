import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Election' });

const { players, povUuids } = buildPlayers();

const electionGame = buildGame({
  phase: 'election',
  players,
  presidentNominee: povUuids.red,
  chancellorNominee: povUuids.villain,
  votes: {}
});

function addVote(game, uuid) {
  return {
    ...game,
    votes: {
      ...game.votes,
      [uuid]: {
        voted: true,
        approved: true
      }
    }
  };
}

export const redVoting = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: electionGame
  }} />
);

export const blueVoting = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: electionGame
  }} />
);

export const voted = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: addVote(electionGame, povUuids.blue)
  }} />
);
