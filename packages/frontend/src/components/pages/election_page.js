import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import find from 'lodash/find';
import Option from '../shared/option';
import { vote } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';
import { getThemeText } from '../../theme';

const ElectionPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const theme = useTheme();

  const voted = get(game, ['votes', user.uuid, 'voted']);
  const { alive } = find(game.players, { uuid: user.uuid });

  const onSubmit = (approved) => () => {
    dispatch(vote(approved));
  };

  const canVote = alive & !voted;

  return (
    <Layout withSubmit={!voted}>
      <WrappedScoreHud/>
      <Prompt>
        {
          canVote ? (
            <>
              Vote!
              <br/>
            </>
          ) : null
        }
        {getThemeText(theme, 'president')} <PartyAwareName uuid={game.presidentNominee} />
        <br />
        {getThemeText(theme, 'chancellor')} <PartyAwareName uuid={game.chancellorNominee} />
      </Prompt>
      {
        canVote ? (
          <>
            <Option {...{
              label: 'Yes',
              value: true,
              onSelect: onSubmit(true)
            }} />
            <Option {...{
              label: 'No',
              value: false,
              onSelect: onSubmit(false)
            }} />
          </>
        ) : (
          <Message>Waiting for other votes...</Message>
        )
      }
    </Layout>
  );
};

export default ElectionPage;
