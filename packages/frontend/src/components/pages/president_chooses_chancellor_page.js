import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import find from 'lodash/find';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { chooseChancellor } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';

const PresidentChoosesChancellorPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [chancellorUuid, setChancellorUuid] = useState(null);

  const isPresidentNominee = user.uuid === game.presidentNominee;

  const chancellorOptions = game.chancellorOptions.map((uuid) => find(game.players, { uuid }));

  const onSubmit = () => {
    dispatch(chooseChancellor(chancellorUuid));
  };

  return (
    <Layout withSubmit={isPresidentNominee}>
      <WrappedScoreHud/>
      {
        isPresidentNominee && (
          <React.Fragment>
            <Prompt>
              Choose a {theme.chancellor}:
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
        !isPresidentNominee && (
          <Message>
            {theme.presidentialCandidate} <PartyAwareName uuid={game.presidentNominee} /> is choosing a {theme.chancellor}...
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesChancellorPage;
