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

export const successfulRed = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: successfulElection,
    notification: true
  }} />
);

export const successfulBlue = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: successfulElection,
    notification: true
  }} />
);

export const failedRed = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: failedElection,
    notification: true
  }} />
);

export const failedBlue = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: failedElection,
    notification: true
  }} />
);

export const chaosRed = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: chaosElection,
    notification: true
  }} />
);

export const chaosBlue = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: chaosElection,
    notification: true
  }} />
);
