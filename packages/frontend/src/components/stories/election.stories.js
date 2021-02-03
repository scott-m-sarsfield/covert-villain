import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Election' });

const { players, povUuids } = buildPlayers();

const electionGame = buildGame({
  phase: 'election',
  players,
  presidentNominee: povUuids.fascist,
  chancellorNominee: povUuids.mussolini,
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

export const fascistVoting = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: electionGame
  }} />
);

export const liberalVoting = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: electionGame
  }} />
);

export const voted = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: addVote(electionGame, povUuids.liberal)
  }} />
);
