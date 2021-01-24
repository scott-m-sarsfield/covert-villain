import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/08 Policy Enacted Notification' });

const FASCIST_POLICY_ENACTED_NOTIFICATION = {
  phase: 'president_chooses_policies',
  players: [
    {
      uuid: '1',
      name: 'Alpha',
      role: 'fascist',
      party: 'fascist'
    },
    {
      uuid: '2',
      name: 'Bravo',
      role: 'liberal',
      party: 'liberal'
    },
    {
      uuid: '3',
      name: 'Charlie',
      role: 'liberal',
      party: 'liberal'
    },
    {
      uuid: '4',
      name: 'Delta',
      role: 'mussolini',
      party: 'fascist'
    },
    {
      uuid: '5',
      name: 'Echo',
      role: 'liberal',
      party: 'liberal'
    }
  ],
  notifications: [
    {
      type: 'policy_enacted',
      data: {
        card: 5
      }
    }
  ]
};
const LIBERAL_POLICY_ENACTED_NOTIFICATION = {
  ...FASCIST_POLICY_ENACTED_NOTIFICATION,
  notifications: [
    {
      type: 'policy_enacted',
      data: {
        card: 15
      }
    }
  ]
};

export const fascistPolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: FASCIST_POLICY_ENACTED_NOTIFICATION,
    notification: true
  }} />
);

export const liberalPolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: LIBERAL_POLICY_ENACTED_NOTIFICATION,
    notification: true
  }} />
);
