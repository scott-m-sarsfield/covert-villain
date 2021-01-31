import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noop from 'lodash/noop';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { endPolicyPeek } from '../../game_slice';
import { Message, PartyAwareName, Prompt} from '../shared/atoms';
import {Layout, WrappedScoreHud} from '../shared/layout';

const SpecialActionPolicyPeekPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();

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
          <React.Fragment>
            <Prompt>
              Top 3 Policies
            </Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: card < 11 ? 'Fascist' : 'Liberal',
                  value: card,
                  variant: card < 11 ? 'fascist' : 'liberal',
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
          </React.Fragment>
        )
      }
      {
        !isPresident && (
          <Message>
            President <PartyAwareName uuid={game.president} /> is peeking at the top 3 policies in the deck.
          </Message>
        )
      }
    </Layout>
  );
};

export default SpecialActionPolicyPeekPage;
