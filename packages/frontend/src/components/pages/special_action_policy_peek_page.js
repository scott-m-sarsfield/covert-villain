import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import noop from 'lodash/noop';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { endPolicyPeek } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import themes from '../../theme';

const SpecialActionPolicyPeekPage = () => {
  const dispatch = useDispatch();
  const { user, data: game } = useSelector((state) => state.game);
  const currentTheme = useSelector((state) => get(state.theme, 'current')) || 'elusiveEmperor';

  const cards = game.cards.peek;

  const isLeader = user.uuid === game.leader;

  const onSubmit = () => {
    dispatch(endPolicyPeek());
  };

  return (
    <Layout withSubmit={isLeader}>
      <WrappedScoreHud/>
      {
        isLeader && (
          <>
            <Prompt>
              Top 3 Policies
            </Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: themes[currentTheme][card < 11 ? 'redParty' : 'blueParty'],
                  value: card,
                  variant: card < 11 ? 'redParty' : 'blueParty',
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
        !isLeader && (
          <Message>
            {themes[currentTheme].leader} <PartyAwareName uuid={game.leader} /> is peeking at the top 3 policies in the deck.
          </Message>
        )
      }
    </Layout>
  );
};

export default SpecialActionPolicyPeekPage;
