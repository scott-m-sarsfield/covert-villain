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

const tenPlayerFailedElection = {
  ...successfulElection,
  players: buildPlayers(10).players,
  notifications: [
    {
      type: 'party_assignment'
    },
    {
      type: 'election_results',
      data: {
        failed: true,
        votes: buildVotes(players, [true, false, false, true, false, true, false, true, false, false])
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

export const successfulEvil = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: successfulElection,
    notification: true
  }} />
);

export const successfulGood = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: successfulElection,
    notification: true
  }} />
);

export const failedEvil = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: failedElection,
    notification: true
  }} />
);

export const failedGood = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: failedElection,
    notification: true
  }} />
);

export const failedTenPlayerGood = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: tenPlayerFailedElection,
    notification: true
  }} />
);

export const chaosEvil = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: chaosElection,
    notification: true
  }} />
);

export const chaosGood = () => (
  <SimulatedGame {...{
    uuid: povUuids.good,
    gameState: chaosElection,
    notification: true
  }} />
);
