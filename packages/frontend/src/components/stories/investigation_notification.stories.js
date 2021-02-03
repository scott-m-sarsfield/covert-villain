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
      investigatedBy: player.uuid === investigatedPlayer ? povUuids.liberals[0] : null
    })
  ),
  notifications: [
    {
      type: 'investigation',
      data: {
        president: povUuids.liberals[0],
        player: investigatedPlayer
      }
    }
  ]
});

export const liberalPresidentInvestigatesFascist = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberals[0],
    gameState: createInvestigationNotificationState(povUuids.fascist),
    notification: true
  }} />
);
export const liberalPresidentInvestigatesLiberal = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberals[0],
    gameState: createInvestigationNotificationState(povUuids.liberals[1]),
    notification: true
  }} />
);

export const liberalBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.liberals[1],
    gameState: createInvestigationNotificationState(povUuids.fascist),
    notification: true
  }} />
);

export const fascistBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.fascist,
    gameState: createInvestigationNotificationState(povUuids.fascist),
    notification: true
  }} />
);
