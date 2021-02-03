import React from 'react';
import SimulatedGame, { buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Election Results Notification' });

const { players, povUuids } = buildPlayers();

function buildVotes(players, votes) {
  const data = {};

  players.forEach((player, i) => {
    data[player.uuid] = {
      voted: true,
      approved: votes[i]
    };
  });

  return data;
}

const successfulElection = {
  phase: 'president_chooses_policies',
  players,
  notifications: [
    {
      type: 'party_assignment'
    },
    {
      type: 'election_results',
      data: {
        success: true,
        votes: buildVotes(players, [true, false, true, true, false])
      }
    }
  ]
};
const failedElection = {
  ...successfulElection,
  notifications: [
    {
      type: 'party_assignment'
    },
    {
      type: 'election_results',
      data: {
        failed: true,
        votes: buildVotes(players, [true, false, false, true, false])
      }
    }
  ]
};
const chaosElection = {
  ...successfulElection,
  notifications: [
    {
      type: 'election_results',
      data: {
        failed: true,
        chaos: true,
        votes: buildVotes(players, [true, false, false, true, false])
      }
    }
  ]
};

export const successfulFascist = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: successfulElection,
    notification: true
  }} />
);

export const successfulLiberal = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: successfulElection,
    notification: true
  }} />
);

export const failedFascist = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: failedElection,
    notification: true
  }} />
);

export const failedLiberal = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: failedElection,
    notification: true
  }} />
);

export const chaosFascist = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: chaosElection,
    notification: true
  }} />
);

export const chaosLiberal = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberal,
    gameState: chaosElection,
    notification: true
  }} />
);
