import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { leaveGame, startGame } from '../../game_slice';
import Button from '../shared/button';
import { PlayerTable } from '../shared/player_table';
import { Layout } from '../shared/layout';

const GameCode = styled.h3`
  font-size: 21px;
  line-height: 40px;
  letter-spacing: 2px;
  margin: 0 0 15px 0;
  padding: 0;
  text-align: center;
`;

const LobbyPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const code = get(game, 'code', '');
  const players = get(game, 'players', []).map((player, i) => ({
    ...player,
    role: i === 0 ? 'host' : '',
    alive: true
  }));
  const isHost = user.uuid === get(game, 'players[0].uuid');

  const dispatch = useDispatch();

  const onLeave = () => dispatch(leaveGame());
  const onStart = () => dispatch(startGame());

  return (
    <Layout withSubmit={isHost}>
      <GameCode>{code}</GameCode>
      <PlayerTable players={players} />
      <Button onClick={onLeave}>Leave</Button>
      {
        isHost && (
          <SubmitButton onClick={onStart} disabled={players.length < 5}>Start</SubmitButton>
        )
      }
    </Layout>
  );
};

export default LobbyPage;
