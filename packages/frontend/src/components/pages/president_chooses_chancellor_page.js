import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import find from 'lodash/find';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { chooseChancellor } from '../../game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';

const PresidentChoosesChancellorPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [chancellorUuid, setChancellorUuid] = useState(null);

  const isPresidentNominee = user.uuid === game.presidentNominee;

  const chancellorOptions = game.chancellorOptions.map((uuid) => find(game.players, { uuid }));

  const onSubmit = () => {
    dispatch(chooseChancellor(chancellorUuid));
  };

  return (
    <Layout withSubmit={isPresidentNominee}>
      <WrappedScoreHud/>
      {
        isPresidentNominee && (
          <React.Fragment>
            <Prompt>
              Choose a Chancellor:
            </Prompt>
            {
              chancellorOptions.map(({ name, uuid, party }) => (
                <Option key={uuid} {...{
                  label: name,
                  value: uuid,
                  selected: chancellorUuid === uuid,
                  onSelect: setChancellorUuid,
                  variant: party
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={!chancellorUuid}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isPresidentNominee && (
          <Message>
            Presidential Candidate <PartyAwareName uuid={game.presidentNominee} /> is choosing a Chancellor...
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesChancellorPage;
