import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'lodash/filter';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { discardPolicy } from '../../game_slice';
import { Message, PartyAwareName, Prompt} from '../shared/atoms';
import {Layout, WrappedScoreHud} from '../shared/layout';

const PresidentChoosesPoliciesPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});

  const cards = game.cards.hand || [];

  const isPresident = user.uuid === game.president;

  const cardsToDiscard = filter(cards, (card) => !selected[card]);

  const onSubmit = () => {
    dispatch(discardPolicy(cardsToDiscard[0]));
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
          <React.Fragment>
            <Prompt>
              Choose 2 Policies
            </Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: card < 11 ? 'Fascist' : 'Liberal',
                  value: card,
                  selected: selected[card],
                  onSelect: (card) => setSelected({ ...selected, [card]: !selected[card] }),
                  variant: card < 11 ? 'fascist' : 'liberal'
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={cardsToDiscard.length !== 1}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isPresident && (
          <Message>
            President <PartyAwareName uuid={game.president} /> is choosing two policies.
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesPoliciesPage;
