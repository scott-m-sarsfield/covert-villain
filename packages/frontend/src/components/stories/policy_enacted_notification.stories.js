import React from 'react';
import SimulatedGame, { buildGame } from './simulated_game';

export default ({ title: 'Pages/Policy Enacted Notification' });

const evilPolicyEnactedGame = buildGame({
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

const goodPolicyEnactedGame = buildGame({
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

export const evilPolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: evilPolicyEnactedGame,
    notification: true
  }} />
);

export const goodPolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: goodPolicyEnactedGame,
    notification: true
  }} />
);
