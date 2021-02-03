import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import find from 'lodash/find';
import get from 'lodash/get';
import types from 'prop-types';
import React from 'react';
import { colors } from '../pages/score_hud';
import Instructions, { Details } from './instructions';

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

const PartyName = styled(PartyText)`
  ${(props) => props.dead && css`
    text-decoration: double line-through;
    opacity: 0.5;
  `}
`;

export const Name = ({ uuid }) => {
  const { name } = useSelector((state) => find(
    get(state, 'game.data.players'),
    { uuid }
  ));
  return (<span>{name}</span>);
};

Name.propTypes = {
  uuid: types.string.isRequired
};

export const PartyAwareName = ({ uuid }) => {
  const { name, party, alive } = useSelector((state) => find(
    get(state, 'game.data.players'),
    { uuid }
  ));
  return (
    <PartyName party={party} dead={!alive}>{name}</PartyName>
  );
};

PartyAwareName.propTypes = {
  uuid: types.string.isRequired
};

export const Message = styled(Details)`
  margin-top: 60px;
`;

export const Prompt = styled(Instructions)`
  margin: 45px 0 30px;
`;
