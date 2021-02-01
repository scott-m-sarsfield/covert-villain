import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import find from 'lodash/find';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { choosePresident } from '../../game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';

const SpecialElectionPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [nomineeUuid, setNomineeUuid] = useState(null);

  const isPresident = user.uuid === game.presidentNominee;

  const presidentOptions = game.presidentOptions.map((uuid) => find(game.players, { uuid }));

  const onSubmit = () => {
    dispatch(choosePresident(nomineeUuid));
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
          <React.Fragment>
            <Prompt>
              Choose a Presidential Candidate:
            </Prompt>
            {
              presidentOptions.map(({ name, uuid, party }) => (
                <Option key={uuid} {...{
                  label: name,
                  value: uuid,
                  selected: nomineeUuid === uuid,
                  onSelect: setNomineeUuid,
                  variant: party
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={!nomineeUuid}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isPresident && (
          <Message>
            President <PartyAwareName uuid={game.president} /> is choosing a Presidential Candidate
            for the special election...
          </Message>
        )
      }
    </Layout>
  );
};

export default SpecialElectionPage;
