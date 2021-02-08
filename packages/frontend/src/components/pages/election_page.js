import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import find from 'lodash/find';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { vote } from '../../store/game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import useTheme from '../shared/use_theme';

const ElectionPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [approved, setApproved] = useState(null);

  const voted = get(game, ['votes', user.uuid, 'voted']);
  const { alive } = find(game.players, { uuid: user.uuid });

  const onSubmit = () => {
    dispatch(vote(approved));
  };

  const canVote = alive & !voted;

  return (
    <Layout withSubmit={!voted}>
      <WrappedScoreHud/>
      <Prompt>
        {
          canVote ? (
            <React.Fragment>
              Vote!
              <br/>
            </React.Fragment>
          ) : null
        }
        {theme.president} <PartyAwareName uuid={game.presidentNominee} />
        <br />
        {theme.chancellor} <PartyAwareName uuid={game.chancellorNominee} />
      </Prompt>
      {
        canVote ? (
          <React.Fragment>
            <Option {...{
              label: 'Yes',
              value: true,
              selected: approved === true,
              onSelect: setApproved
            }} />
            <Option {...{
              label: 'No',
              value: false,
              selected: approved === false,
              onSelect: setApproved
            }} />
            <SubmitButton
              onClick={onSubmit}
              disabled={approved === null}
            >
              Vote
            </SubmitButton>
          </React.Fragment>
        ) : (
          <Message>
            Waiting for other votes...
          </Message>
        )
      }
    </Layout>
  );
};

export default ElectionPage;
