import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'lodash/filter';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { chooseChancellor } from '../../game_slice';
import { Layout, Message, PartyAwareName, Prompt, WrappedScoreHud } from '../shared/atoms';

const PresidentChoosesChancellorPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [chancellorUuid, setChancellorUuid] = useState(null);

  const isPresident = user.uuid === game.president;

  const chancellorOptions = filter(game.players, ({ uuid }) => uuid !== user.uuid);

  const onSubmit = () => {
    dispatch(chooseChancellor(chancellorUuid));
  };

  return (
    <Layout withSubmit={isPresident}>
      <WrappedScoreHud/>
      {
        isPresident && (
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
        !isPresident && (
          <Message>
            Presidential Candidate <PartyAwareName uuid={game.president} /> is choosing a Chancellor...
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesChancellorPage;
