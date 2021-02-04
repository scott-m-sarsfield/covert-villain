import React from 'react';
import SimulatedGame, { buildGame } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Policy Enacted Notification' });

const redPolicyEnactedGame = buildGame({
  phase: 'president_chooses_policies',
  notifications: [
    {
      type: 'policy_enacted',
      data: {
        card: 5
      }
    }
  ]
});

const bluePolicyEnactedGame = buildGame({
  phase: 'president_chooses_policies',
  notifications: [
    {
      type: 'policy_enacted',
      data: {
        card: 15
      }
    }
  ]
});

export const redPolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: redPolicyEnactedGame,
    notification: true
  }} />
);

export const bluePolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: bluePolicyEnactedGame,
    notification: true
  }} />
);
