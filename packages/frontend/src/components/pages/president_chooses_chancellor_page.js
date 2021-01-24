import React, { useState } from 'react';
import types from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import find from 'lodash/find';
import filter from 'lodash/filter';
import SubmitButton from '../shared/submit_button';
import Instructions, { Details } from '../shared/instructions';
import Option from '../shared/option';
import ScoreHud, { colors } from './score_hud';
import { chooseChancellor } from '../../game_slice';

const WrappedScoreHud = styled(ScoreHud)``;

const Layout = styled.div`
  min-height: calc(100vh - 50px);
  position: relative;
  padding: 30px 15px;
  box-sizing: border-box;
  
  ${({ withSubmit }) => withSubmit && css`
    padding-bottom: 80px;
  `}
  
  ${WrappedScoreHud} {
    margin: -20px -10px;
  }
`;

const Message = styled(Details)`
  margin-top: 60px;
`;

const Name = styled.span.attrs((props) => {
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

const PartyAwareName = ({ uuid }) => {
  const { name, party } = useSelector((state) => find(
    get(state, 'game.data.players'),
    { uuid }
  ));
  return (
    <Name party={party}>{name}</Name>
  );
};

PartyAwareName.propTypes = {
  uuid: types.string.isRequired
};

const Prompt = styled(Instructions)`
  margin: 45px 0 30px;
`;

const PresidentChoosesChancellorPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [chancellorUuid, setChancellorUuid] = useState(null);

  const isPresident = user.uuid === game.president;

  const chancellorOptions = filter(game.players, ({ uuid }) => uuid !== user.uuid);

  const onSubmit = () => {
    dispatch(chooseChancellor(chancellorUuid));
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
          <React.Fragment>
            <Prompt>
              Choose a Chancellor:
            </Prompt>
            {
              chancellorOptions.map(({ name, uuid, party }) => (
                <Option key={uuid} {...{
                  label: name,
                  value: uuid,
                  selected: chancellorUuid === uuid,
                  onSelect: setChancellorUuid,
                  variant: party
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={!chancellorUuid}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isPresident && (
          <Message>
            Presidential Candidate <PartyAwareName uuid={game.president} /> is choosing a Chancellor...
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesChancellorPage;
