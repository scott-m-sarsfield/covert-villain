import React from 'react';
import SimulatedGame, { buildGame, buildPlayers } from './simulated_game';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title: 'Pages/Presidential Powers/Special Election/President Chooses Presidential Candidate' });

const { players, povUuids } = buildPlayers();

const redPresidentGame = buildGame({
  phase: 'special_action_election',
  players,
  president: povUuids.red,
  presidentOptions: povUuids.not(povUuids.red)
});

const bluePresidentGame = {
  ...redPresidentGame,
  president: povUuids.blue,
  presidentOptions: povUuids.not(povUuids.blue)
};

export const redPresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.red,
    gameState: redPresidentGame
  }} />
);

export const bluePresident = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: bluePresidentGame
  }} />
);

export const blueBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.blue,
    gameState: redPresidentGame
  }} />
);

export const redBystander = () => (
  <SimulatedGame {...{
    uuid: povUuids.villain,
    gameState: redPresidentGame
  }} />
);
