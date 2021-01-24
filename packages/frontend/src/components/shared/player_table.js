import styled, { css } from 'styled-components';
import React from 'react';
import map from 'lodash/map';
import types from 'prop-types';
import { colors } from '../pages/score_hud';
import { PartyAwareName } from './atoms';

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
  justify-content: space-between;
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
  flex: 0 0 60px;
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

const Left = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Right = styled.div`
  margin: 0 5px;
`;

const Vote = styled.div`
  align-self: flex-end;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 5px;
  width: 40px;
  text-align: center;
  
  ${(props) => props.approved && css`
  border-color: ${colors.black}
`}
  ${(props) => !props.approved && css`
  background: ${colors.black};
  color: ${colors.white};
`}
`;
export const Player = ({ uuid, index, role, vote }) => (
  <PlayerWrapper>
    <Left>
      <PlayerNumber>{numberLabels[index]}</PlayerNumber>
      <PlayerName><PartyAwareName uuid={uuid}/></PlayerName>
      {role && <PlayerRole>{`(${role})`}</PlayerRole>}
    </Left>
    <Right>
      {vote && <Vote approved={vote.approved}>{vote.approved ? 'Yes' : 'No'}</Vote>}
    </Right>
  </PlayerWrapper>
);

Player.propTypes = {
  uuid: types.string,
  index: types.number,
  role: types.string,
  vote: types.shape({
    approved: types.bool
  })
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

export const PlayerTable = ({ players }) => (
  <PlayerList>
    {
      map(players, ({ uuid, role, vote }, i) => {
        return (
          <Player key={i} {...{
            index: i,
            uuid,
            role,
            vote
          }}/>
        );
      })
    }
  </PlayerList>
);

PlayerTable.propTypes = {
  players: types.arrayOf(
    types.shape({
      name: types.string.isRequired
    }).isRequired
  )
};
