import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noop from 'lodash/noop';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { endPolicyPeek } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';

const SpecialActionPolicyPeekPage = () => {
  const dispatch = useDispatch();
  const { user, data: game } = useSelector((state) => state.game);
  const theme = useTheme();

  const cards = game.cards.peek;

  const isPresident = user.uuid === game.president;

  const onSubmit = () => {
    dispatch(endPolicyPeek());
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
          <>
            <Prompt>
              Top 3 Policies
            </Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: theme[card < 11 ? 'evilParty' : 'goodParty'],
                  value: card,
                  variant: card < 11 ? 'evilParty' : 'goodParty',
                  disabled: true,
                  onSelect: noop
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
            >
              OK
            </SubmitButton>
          </>
        )
      }
      {
        !isPresident && (
          <Message>
            {theme.president} <PartyAwareName uuid={game.president} /> is peeking at the top 3 policies in the deck.
          </Message>
        )
      }
    </Layout>
  );
};

export default SpecialActionPolicyPeekPage;
