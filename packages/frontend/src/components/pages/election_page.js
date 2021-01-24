import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { Layout, Message, PartyAwareName, Prompt, WrappedScoreHud } from './president_chooses_chancellor_page';
import { vote } from '../../game_slice';

const ElectionPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(null);

  const voted = get(game, ['votes', user.uuid, 'voted']);

  const onSubmit = () => {
    dispatch(vote(approved));
  };

  return (
    <Layout withSubmit={!voted}>
      <WrappedScoreHud/>
      {
        !voted && (
          <React.Fragment>
            <Prompt>
              Vote!
              <br />
              President <PartyAwareName uuid={game.president} />
              <br />
              Chancellor <PartyAwareName uuid={game.chancellor} />
            </Prompt>
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
        )
      }
      {
        voted && (
          <Message>
            Waiting for other votes...
          </Message>
        )
      }
    </Layout>
  );
};

export default ElectionPage;
