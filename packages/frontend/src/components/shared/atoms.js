import { useSelector } from 'react-redux';
import { css, cx } from '@emotion/css';
import find from 'lodash/find';
import get from 'lodash/get';
import types from 'prop-types';
import React from 'react';
import { colors } from '../pages/score_hud';
import Instructions, { Details } from './instructions';

function getPartyColor(party) {
  switch (party) {
    case 'evilParty':
      return colors.evil;
    case 'goodParty':
      return colors.good;
    default:
      return 'inherit';
  }
}

const styles = {
  partyText: ({ color }) => css`
    color: ${color};
  `,
  partyName: css`
    word-break: break-word;
  `,
  partyNameDead: css`
    text-decoration: double line-through;
    opacity: 0.5;
  `,
  message: css`
    margin-top: 60px;
  `,
  prompt: css`
    margin: 45px 0 30px;  
  `
};

export const PartyText = ({ className, party, children }) => {
  const color = getPartyColor(party);
  return (
    <span className={cx('cv-party-text', styles.partyText({ color }), className)}>
      {children}
    </span>
  );
};

PartyText.propTypes = {
  className: types.string,
  party: types.string,
  children: types.node
};

const PartyName = (props) => (
  <PartyText {...{
    ...props,
    className: cx(
      styles.partyName,
      {
        [styles.partyNameDead]: props.dead
      },
      props.className
    )
  }} />
);

PartyName.propTypes = {
  dead: types.bool,
  className: types.string
};

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

export const Message = (props) => (<Details {...{ ...props, className: cx(styles.message, props.className) }} />);

Message.propTypes = {
  className: types.string
};

export const Prompt = (props) => (<Instructions {...{ ...props, className: cx(styles.prompt, props.className) }} />);

Prompt.propTypes = {
  className: types.string
};
