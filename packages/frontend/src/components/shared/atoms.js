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
    case 'evilParty':
      return {
        color: colors.evil
      };
    case 'goodParty':
      return {
        color: colors.good
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
  word-break: break-word;
  
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

const defaultRenderName = (name) => name;

export const PartyAwareName = ({ uuid, renderName = defaultRenderName }) => {
  const { name, party, alive } = useSelector((state) => find(
    get(state, 'game.data.players'),
    { uuid }
  ));
  return (
    <PartyName party={party} dead={!alive}>{renderName(name)}</PartyName>
  );
};

PartyAwareName.propTypes = {
  uuid: types.string.isRequired,
  renderName: types.func
};

export const Message = styled(Details)`
  margin-top: 60px;
`;

export const Prompt = styled(Instructions)`
  margin: 45px 0 30px;
`;
