import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Option from '../shared/option';
import { enactPolicy } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';
import { getThemeText } from '../../theme';

const ChancellorChoosesPolicyPage = () => {
  const dispatch = useDispatch();
  const { user, data: game } = useSelector((state) => state.game);
  const theme = useTheme();

  const cards = game.cards.hand || [];

  const isChancellor = user.uuid === game.chancellor;

  const handleSubmit = (selected) => () => {
    dispatch(enactPolicy(selected));
  };

  return (
    <Layout withSubmit={isChancellor}>
      <WrappedScoreHud/>
      {
        isChancellor && (
          <>
            <Prompt>Choose Policy</Prompt>
            {
              cards.map((card) => (
                <Option key={card} {...{
                  label: card < 11 ? getThemeText(theme, 'evilParty') : getThemeText(theme, 'goodParty'),
                  value: card,
                  onSelect: handleSubmit(card),
                  variant: card < 11 ? 'evilParty' : 'goodParty'
                }}/>
              ))
            }
            {
              game.cards.evilParty.length >= 5 && (
                <Option {...{
                  label: 'Veto',
                  value: 911,
                  onSelect: handleSubmit(911)
                }} />
              )
            }
          </>
        )
      }
      {
        !isChancellor && (
          <Message>
            {getThemeText(theme, 'chancellor')} <PartyAwareName uuid={game.chancellor} /> is choosing a policy.
          </Message>
        )
      }
    </Layout>
  );
};

export default ChancellorChoosesPolicyPage;
