import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import find from 'lodash/find';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { investigate } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';
import { getThemeText } from '../../theme';

const PresidentInvestigatesLoyaltyPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [investigateUuid, setInvestigateUuid] = useState(null);

  const isPresident = user.uuid === game.president;

  const investigateOptions = game.investigateOptions.map((uuid) => find(game.players, { uuid }));

  const onSubmit = () => {
    dispatch(investigate(investigateUuid));
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
          <React.Fragment>
            <Prompt>
              Choose a player to investigate:
            </Prompt>
            {
              investigateOptions.map(({ name, uuid, party }) => (
                <Option key={uuid} {...{
                  label: name,
                  value: uuid,
                  selected: investigateUuid === uuid,
                  onSelect: setInvestigateUuid,
                  variant: party
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={!investigateUuid}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isPresident && (
          <Message>
            {getThemeText(theme, 'president')} <PartyAwareName uuid={game.president} /> is choosing someone to investigate...
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentInvestigatesLoyaltyPage;
