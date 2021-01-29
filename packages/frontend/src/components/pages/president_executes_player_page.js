import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'lodash/filter';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { executePlayer } from '../../game_slice';
import { Layout, Message, PartyAwareName, Prompt, WrappedScoreHud } from '../shared/atoms';

const PresidentExecutesPlayerPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [executeeUuid, setExecuteeUuid] = useState(null);

  const isPresidentNominee = user.uuid === game.president;

  const executionOptions = filter(game.players, (player) => player.uuid !== user.uuid && player.alive);

  const onSubmit = () => {
    dispatch(executePlayer(executeeUuid));
  };

  return (
    <Layout withSubmit={isPresidentNominee}>
      <WrappedScoreHud/>
      {
        isPresidentNominee && (
          <React.Fragment>
            <Prompt>
              Choose a Player to Execute:
            </Prompt>
            {
              executionOptions.map(({ name, uuid, party }) => (
                <Option key={uuid} {...{
                  label: name,
                  value: uuid,
                  selected: executeeUuid === uuid,
                  onSelect: setExecuteeUuid,
                  variant: party
                }}/>
              ))
            }
            <SubmitButton
              onClick={onSubmit}
              disabled={!executeeUuid}
            >
              Submit
            </SubmitButton>
          </React.Fragment>
        )
      }
      {
        !isPresidentNominee && (
          <Message>
            President <PartyAwareName uuid={game.president} /> is executing a player...
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentExecutesPlayerPage;
