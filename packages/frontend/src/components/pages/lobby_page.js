import React from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import types from 'prop-types';
import SubmitButton from '../shared/submit_button';
import { leaveGame, startGame } from '../../game_slice';
import Button from '../shared/button';

const GameCode = styled.h3`
  font-size: 21px;
  line-height: 40px;
  letter-spacing: 2px;
  margin: 0 0 15px 0;
  padding: 0;
  text-align: center;
`;

const PlayerList = styled.ul`
  text-indent: 0;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const PlayerWrapper = styled.li`
  display: flex;
  height: 40px;
  align-items: center;
  border-style: solid;
  border-color: #979797;
  border-width: 0 1px 1px 1px;
  background: #fff;
  
  &:first-child {
    border-top-width: 1px;
  }
`;

const PlayerNumber = styled.div`
  font-size: 12px;
  line-height: 17px;
  color: #979797;
  width: 60px;
  text-align: center;
`;

const PlayerName = styled.div`
  margin-left: 5px;
  font-size: 21px;
  line-height: 30px;
`;

const PlayerRole = styled.div`
  margin-left: 10px;
  font-size: 12px;
  line-height: 17px;
`;

const Player = ({ name, index, role }) => (
  <PlayerWrapper>
    <PlayerNumber>{numberLabels[index]}</PlayerNumber>
    <PlayerName>{name}</PlayerName>
    {role && <PlayerRole>{`(${role})`}</PlayerRole>}
  </PlayerWrapper>
);

Player.propTypes = {
  name: types.string,
  index: types.number,
  role: types.string
};

const numberLabels = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten'
];

const Layout = styled.div`
  min-height: calc(100vh - 50px);
  position: relative;
  padding: 30px 15px;
  box-sizing: border-box;
  
  ${Button} {
    margin-top: 30px;
  }
  
  ${({ withSubmit }) => withSubmit && `
    padding-bottom: 80px;
  `}
`;

const LobbyPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const code = get(game, 'code', '');
  const players = get(game, 'players', []);
  const isHost = user.uuid === get(game, 'players[0].uuid');

  const dispatch = useDispatch();

  const onLeave = () => dispatch(leaveGame());
  const onStart = () => dispatch(startGame());

  return (
    <Layout withSubmit={isHost}>
      <GameCode>{code}</GameCode>
      <PlayerList>
        {
          map(players, ({ name }, i) => {
            return (
              <Player key={i} index={i} name={name} role={i === 0 ? 'host' : ''}/>
            );
          })
        }
      </PlayerList>
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
