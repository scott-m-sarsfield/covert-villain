import React from 'react';
import SimulatedGame, { buildGame } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Lobby' });

export const host = () => (
  <SimulatedGame {...{
    uuid: '1',
    gameState: buildGame({ phase: 'lobby', host: '1' })
  }} />
);

export const participant = () => (
  <SimulatedGame {...{
    uuid: '2',
    gameState: buildGame({ phase: 'lobby', host: '1' })
  }} />
);
