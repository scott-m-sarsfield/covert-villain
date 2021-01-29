import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/05 Election Results Notification' });

const SUCCESSFUL_ELECTION_RESULTS_NOTIFICATION = {
  phase: 'president_chooses_policies',
  players: [
    {
      uuid: '1',
      name: 'Alpha',
      role: 'fascist',
      party: 'fascist',
      alive: true
    },
    {
      uuid: '2',
      name: 'Bravo',
      role: 'liberal',
      party: 'liberal',
      alive: true
    },
    {
      uuid: '3',
      name: 'Charlie',
      role: 'liberal',
      party: 'liberal',
      alive: true
    },
    {
      uuid: '4',
      name: 'Delta',
      role: 'mussolini',
      party: 'fascist',
      alive: true
    },
    {
      uuid: '5',
      name: 'Echo',
      role: 'liberal',
      party: 'liberal',
      alive: true
    }
  ],
  notifications: [
    {
      type: 'party_assignment'
    },
    {
      type: 'election_results',
      data: {
        success: true,
        votes: {
          1: {
            voted: true,
            approved: true
          },
          2: {
            voted: true,
            approved: false
          },
          3: {
            voted: true,
            approved: false
          },
          4: {
            voted: true,
            approved: true
          },
          5: {
            voted: true,
            approved: true
          }
        }
      }
    }
  ]
};
const FAILED_ELECTION_RESULTS_NOTIFICATION = {
  ...SUCCESSFUL_ELECTION_RESULTS_NOTIFICATION,
  notifications: [
    {
      type: 'party_assignment'
    },
    {
      type: 'election_results',
      data: {
        failed: true,
        votes: {
          1: {
            voted: true,
            approved: true
          },
          2: {
            voted: true,
            approved: false
          },
          3: {
            voted: true,
            approved: false
          },
          4: {
            voted: true,
            approved: false
          },
          5: {
            voted: true,
            approved: true
          }
        }
      }
    }
  ]
};
const CHAOS_ELECTION_RESULTS_NOTIFICATION = {
  ...SUCCESSFUL_ELECTION_RESULTS_NOTIFICATION,
  notifications: [
    {
      type: 'party_assignment'
    },
    {
      type: 'election_results',
      data: {
        failed: true,
        chaos: true,
        votes: {
          1: {
            voted: true,
            approved: true
          },
          2: {
            voted: true,
            approved: false
          },
          3: {
            voted: true,
            approved: false
          },
          4: {
            voted: true,
            approved: false
          },
          5: {
            voted: true,
            approved: true
          }
        }
      }
    }
  ]
};

export const successfulFascist = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: SUCCESSFUL_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const successfulLiberal = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: SUCCESSFUL_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const successfulMussolini = () => (
  <SimulatedGame {...{
    uuid: '4',
    gameState: SUCCESSFUL_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const failedFascist = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: FAILED_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const failedLiberal = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: FAILED_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const failedMussolini = () => (
  <SimulatedGame {...{
    uuid: '4',
    gameState: FAILED_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const chaosFascist = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: CHAOS_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const chaosLiberal = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: CHAOS_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);

export const chaosMussolini = () => (
  <SimulatedGame {...{
    uuid: '4',
    gameState: CHAOS_ELECTION_RESULTS_NOTIFICATION,
    notification: true
  }} />
);
