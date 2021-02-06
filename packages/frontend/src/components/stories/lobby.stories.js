import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Lobby' });

const { players, povUuids } = buildPlayers(5, { lobby: true });

const game = buildGame({ phase: 'lobby', players });

export const host = () => (
  <SimulatedGame {...{
    uuid: povUuids.host,
    gameState: game
  }} />
);

export const participant = () => (
  <SimulatedGame {...{
    uuid: povUuids.participant,
    gameState: game
  }} />
);

export const withError = () => (
  <SimulatedGame {...{
    uuid: povUuids.host,
    gameState: game,
    errorMessage: 'Sucks to suck.'
  }} />
);
