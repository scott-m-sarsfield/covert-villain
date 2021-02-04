import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import filter from 'lodash/filter';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { discardPolicy } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import themes from '../../theme';

const PresidentChoosesPoliciesPage = () => {
  const dispatch = useDispatch();
  const { user, data: game } = useSelector((state) => state.game);
  const currentTheme = useSelector((state) => get(state.theme, 'current')) || 'elusiveEmperor';
  const [selected, setSelected] = useState({});

  const cards = game.cards.hand || [];

  const isLeader = user.uuid === game.leader;

  const cardsToDiscard = filter(cards, (card) => !selected[card]);

  const onSubmit = () => {
    dispatch(discardPolicy(cardsToDiscard[0]));
  };

  return (
    <Layout withSubmit={isLeader}>
      <WrappedScoreHud/>
      {
        isLeader && (
          <>
            <Prompt>
              Choose 2 Policies
            </Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: themes[currentTheme][card < 11 ? 'redParty' : 'blueParty'],
                  value: card,
                  selected: selected[card],
                  onSelect: (card) => setSelected({ ...selected, [card]: !selected[card] }),
                  variant: card < 11 ? 'redParty' : 'blueParty'
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={cardsToDiscard.length !== 1}
            >
              Submit
            </SubmitButton>
          </>
        )
      }
      {
        !isLeader && (
          <Message>
            {themes[currentTheme].leader} <PartyAwareName uuid={game.leader} /> is choosing two policies.
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesPoliciesPage;
