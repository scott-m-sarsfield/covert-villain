import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'lodash/filter';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { discardPolicy } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';
import { getThemeText } from '../../theme';

const PresidentChoosesPoliciesPage = () => {
  const dispatch = useDispatch();
  const { user, data: game } = useSelector((state) => state.game);
  const theme = useTheme();
  const [selected, setSelected] = useState({});

  const cards = game.cards.hand || [];

  const isPresident = user.uuid === game.president;

  const cardsToDiscard = filter(cards, (card) => !selected[card]);

  const handleSelect = (card) => {
    if (cardsToDiscard.length > 1 || selected[card]) {
      setSelected({ ...selected, [card]: !selected[card] });
    }
  };

  const handleSubmit = () => {
    dispatch(discardPolicy(cardsToDiscard[0]));
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
          <>
            <Prompt>Choose 2 Policies</Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: getThemeText(theme, card < 11 ? 'evilParty' : 'goodParty'),
                  value: card,
                  selected: selected[card],
                  onSelect: handleSelect,
                  variant: card < 11 ? 'evilParty' : 'goodParty'
                }}/>
              ))
            }
            <SubmitButton
              onClick={handleSubmit}
              disabled={cardsToDiscard.length !== 1}
            >
              Submit
            </SubmitButton>
          </>
        )
      }
      {
        !isPresident && (
          <Message>
            {getThemeText(theme, 'president')} <PartyAwareName uuid={game.president} /> is choosing two policies.
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesPoliciesPage;
