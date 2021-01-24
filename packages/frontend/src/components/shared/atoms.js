import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import find from 'lodash/find';
import get from 'lodash/get';
import types from 'prop-types';
import React from 'react';
import ScoreHud, { colors } from '../pages/score_hud';
import Instructions, { Details } from './instructions';
import Button from './button';

export const PartyText = styled.span.attrs((props) => {
  switch (props.party) {
    case 'fascist':
      return {
        color: colors.fascist
      };
    case 'liberal':
      return {
        color: colors.liberal
      };
    default:
      return {
        color: 'inherit'
      };
  }
})`
  color: ${(props) => props.color};
`;

export const PartyAwareName = ({ uuid }) => {
  const { name, party } = useSelector((state) => find(
    get(state, 'game.data.players'),
    { uuid }
  ));
  return (
    <PartyText party={party}>{name}</PartyText>
  );
};

PartyAwareName.propTypes = {
  uuid: types.string.isRequired
};

export const WrappedScoreHud = styled(ScoreHud)``;

export const Layout = styled.div`
  min-height: calc(100vh - 50px);
  position: relative;
  padding: 30px 15px;
  box-sizing: border-box;
  
  ${({ withSubmit }) => withSubmit && css`
    padding-bottom: 80px;
  `}
  
  ${Button} {
    margin-top: 30px;
  }
  
  ${WrappedScoreHud} {
    margin: -20px -10px;
  }
`;

export const Message = styled(Details)`
  margin-top: 60px;
`;

export const Prompt = styled(Instructions)`
  margin: 45px 0 30px;
`;
