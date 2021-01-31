import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import SubmitButton from '../shared/submit_button';
import Option from '../shared/option';
import { approveVeto } from '../../game_slice';
import { Message, PartyAwareName, Prompt } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';

const PresidentApprovesVetoPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(null);

  const isPresident = user.uuid === game.president;

  const voted = get(game, ['votes', user.uuid, 'voted']);

  const onSubmit = () => {
    dispatch(approveVeto(approved));
  };

  return (
    <Layout withSubmit={!voted}>
      <WrappedScoreHud/>
      {
        isPresident ? (
          <React.Fragment>
            <Prompt>
              Approve Veto?
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
              Submit
            </SubmitButton>
          </React.Fragment>
        ) : (
          <Message>
            <PartyAwareName uuid={game.chancellor} />
            <span> wants </span>
            <PartyAwareName uuid={game.president} />
            <span> to veto the policies...</span>
          </Message>
        )
      }
    </Layout>
  );
};

export default PresidentApprovesVetoPage;
