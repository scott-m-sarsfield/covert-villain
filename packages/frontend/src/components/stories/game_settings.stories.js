import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Game Settings' });

const { players, povUuids } = buildPlayers(5, { lobby: true });

const game = buildGame({ phase: 'lobby', players });

export const host = () => (
  <SimulatedGame {...{
    uuid: povUuids.host,
    gameState: game,
    settingsOpen: true
  }} />
);
