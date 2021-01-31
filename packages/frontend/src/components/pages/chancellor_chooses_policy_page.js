import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { enactPolicy } from '../../game_slice';
import { Message, PartyAwareName, Prompt} from '../shared/atoms';
import {Layout, WrappedScoreHud} from '../shared/layout';

const ChancellorChoosesPolicyPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  const cards = game.cards.hand || [];

  const isChancellor = user.uuid === game.chancellor;

  const onSubmit = () => {
    dispatch(enactPolicy(selected));
  };

  return (
    <Layout withSubmit={isChancellor}>
      <WrappedScoreHud/>
      {
        isChancellor && (
          <React.Fragment>
            <Prompt>
              Choose Policy
            </Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: card < 11 ? 'Fascist' : 'Liberal',
                  value: card,
                  selected: selected === card,
                  onSelect: setSelected,
                  variant: card < 11 ? 'fascist' : 'liberal'
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={!selected}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isChancellor && (
          <Message>
            Chancellor <PartyAwareName uuid={game.chancellor} /> is choosing a policy.
          </Message>
        )
      }
    </Layout>
  );
};

export default ChancellorChoosesPolicyPage;
