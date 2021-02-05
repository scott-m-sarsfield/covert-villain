import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { leaveGame, startGame } from '../../store/game_slice';
import Button from '../shared/button';
import { PlayerRole, PlayerTable } from '../shared/player_table';
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
  const players = get(game, 'players', []).map((player) => ({
    ...player,
    host: player.uuid === game.host
  }));
  const isHost = user.uuid === game.host;

  const dispatch = useDispatch();

  const onLeave = () => dispatch(leaveGame());
  const onStart = () => dispatch(startGame());

  return (
    <Layout withSubmit={isHost}>
      <GameCode>{code}</GameCode>
      <PlayerTable players={players} ignoreStatus renderRightContent={({ uuid }) => (
        <PlayerRole>{uuid === game.host && 'Host'}</PlayerRole>
      )}/>
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
