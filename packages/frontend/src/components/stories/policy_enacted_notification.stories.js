import React from 'react';
import SimulatedGame, { buildGame } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Policy Enacted Notification' });

const fascistPolicyEnactedGame = buildGame({
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

const liberalPolicyEnactedGame = buildGame({
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

export const fascistPolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: fascistPolicyEnactedGame,
    notification: true
  }} />
);

export const liberalPolicyEnacted = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: liberalPolicyEnactedGame,
    notification: true
  }} />
);
