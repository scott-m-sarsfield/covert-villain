import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import find from 'lodash/find';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { choosePresident } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';
import { getThemeText } from '../../theme';

const SpecialElectionPage = () => {
  const dispatch = useDispatch();
  const { user, data: game } = useSelector((state) => state.game);
  const theme = useTheme();
  const [nomineeUuid, setNomineeUuid] = useState(null);

  const isPresident = user.uuid === game.president;

  const presidentOptions = game.presidentOptions.map((uuid) => find(game.players, { uuid }));

  const onSubmit = () => {
    dispatch(choosePresident(nomineeUuid));
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
          <React.Fragment>
            <Prompt>
              Choose a {getThemeText(theme, 'presidentialCandidate')}:
            </Prompt>
            {
              presidentOptions.map(({ name, uuid, party }) => (
                <Option key={uuid} {...{
                  label: name,
                  value: uuid,
                  selected: nomineeUuid === uuid,
                  onSelect: setNomineeUuid,
                  variant: party
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={!nomineeUuid}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isPresident && (
          <Message>
            {getThemeText(theme, 'president')} <PartyAwareName uuid={game.president} /> is
            choosing a {getThemeText(theme, 'presidentialCandidate')} for the special election...
          </Message>
        )
      }
    </Layout>
  );
};

export default SpecialElectionPage;
