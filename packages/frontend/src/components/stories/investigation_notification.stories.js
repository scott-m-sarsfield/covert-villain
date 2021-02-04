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
      investigatedBy: player.uuid === investigatedPlayer ? povUuids.goods[0] : null
    })
  ),
  notifications: [
    {
      type: 'investigation',
      data: {
        president: povUuids.goods[0],
        player: investigatedPlayer
      }
    }
  ]
});

export const goodPresidentInvestigatesEvil = () => (
  <SimulatedGame {...{
    uuid: povUuids.goods[0],
    gameState: createInvestigationNotificationState(povUuids.evil),
    notification: true
  }} />
);
export const goodPresidentInvestigatesGood = () => (
  <SimulatedGame {...{
    uuid: povUuids.goods[0],
    gameState: createInvestigationNotificationState(povUuids.goods[1]),
    notification: true
  }} />
);

export const goodBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.goods[1],
    gameState: createInvestigationNotificationState(povUuids.evil),
    notification: true
  }} />
);

export const evilBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.evil,
    gameState: createInvestigationNotificationState(povUuids.evil),
    notification: true
  }} />
);
