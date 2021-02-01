import React from 'react';
import SimulatedGame from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/12 Investigation Notification' });

const createInvestigationNotificationState = (investigatedPlayer = '4') => ({
  phase: 'president_chooses_chancellor',
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
      alive: true,
      investigatedBy: '2'
    },
    {
      uuid: '5',
      name: 'Echo',
      role: 'liberal',
      party: 'liberal',
      alive: true
    }
  ].map(
    (player) => ({
      ...player,
      investigatedBy: player.uuid === investigatedPlayer ? '2' : null
    })
  ),
  notifications: [
    {
      type: 'investigation',
      data: {
        president: '2',
        player: investigatedPlayer
      }
    }
  ]
});

export const liberalPresidentInvestigatesFascist = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: createInvestigationNotificationState(),
    notification: true
  }} />
);
export const liberalPresidentInvestigatesLiberal = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: createInvestigationNotificationState('5'),
    notification: true
  }} />
);

export const liberalBystander = () => (
  <SimulatedGame {...{
    uuid: '5',
    gameState: createInvestigationNotificationState(),
    notification: true
  }} />
);

export const fascistBystander = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: createInvestigationNotificationState(),
    notification: true
  }} />
);
