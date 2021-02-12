import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
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
                  label: card < 11 ? getThemeText(theme, 'evilParty') : getThemeText(theme, 'goodParty'),
                  value: card,
                  selected: selected === card,
                  onSelect: setSelected,
                  variant: card < 11 ? 'evilParty' : 'goodParty'
                }}/>
              ))
            }
            {
              game.cards.evilParty.length >= 5 && (
                <Option {...{
                  label: 'Veto',
                  value: 911,
                  selected: selected === 911,
                  onSelect: setSelected
                }} />
              )
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
            {getThemeText(theme, 'chancellor')} <PartyAwareName uuid={game.chancellor} /> is choosing a policy.
          </Message>
        )
      }
    </Layout>
  );
};

export default ChancellorChoosesPolicyPage;
