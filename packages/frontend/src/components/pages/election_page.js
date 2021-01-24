import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { Layout, Message, PartyAwareName, Prompt, WrappedScoreHud } from './president_chooses_chancellor_page';

const ElectionPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  // const dispatch = useDispatch();
  const [vote, setVote] = useState(null);

  const voted = get(game, ['votes', user.uuid, 'voted']);

  const onSubmit = () => {
    // dispatch(chooseChancellor(chancellorUuid));
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
              selected: vote === true,
              onSelect: setVote
            }} />
            <Option {...{
              label: 'No',
              value: false,
              selected: vote === false,
              onSelect: setVote
            }} />
            <SubmitButton
              onClick={onSubmit}
              disabled={vote === null}
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
