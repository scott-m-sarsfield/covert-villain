import React from 'react';
import SimulatedGame, { buildPlayers, buildGame } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Investigation/Notification' });

const { players, povUuids } = buildPlayers();

const createInvestigationNotificationState = (investigatedPlayer) => buildGame({
  phase: 'president_chooses_chancellor',
  players: players.map(
    (player) => ({
      ...player,
      investigatedBy: player.uuid === investigatedPlayer ? povUuids.blues[0] : null
    })
  ),
  notifications: [
    {
      type: 'investigation',
      data: {
        president: povUuids.blues[0],
        player: investigatedPlayer
      }
    }
  ]
});

export const bluePresidentInvestigatesRed = () => (
  <SimulatedGame {...{
    uuid: povUuids.blues[0],
    gameState: createInvestigationNotificationState(povUuids.red),
    notification: true
  }} />
);
export const bluePresidentInvestigatesBlue = () => (
  <SimulatedGame {...{
    uuid: povUuids.blues[0],
    gameState: createInvestigationNotificationState(povUuids.blues[1]),
    notification: true
  }} />
);

export const blueBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.blues[1],
    gameState: createInvestigationNotificationState(povUuids.red),
    notification: true
  }} />
);

export const redBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: createInvestigationNotificationState(povUuids.red),
    notification: true
  }} />
);
