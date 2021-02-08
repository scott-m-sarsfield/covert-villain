import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Election' });

const { players, povUuids } = buildPlayers();

const electionGame = buildGame({
  phase: 'election',
  players,
  presidentNominee: povUuids.evil,
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

export const evilVoting = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: electionGame
  }} />
);

export const goodVoting = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: electionGame
  }} />
);

export const votedOrDead = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: addVote(electionGame, povUuids.good)
  }} />
);
