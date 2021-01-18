import React from 'react';
import styled from 'styled-components';
import SubmitButton from '../shared/submit_button';
import {useDispatch, useSelector} from 'react-redux';
import {readNotification} from '../../game_slice';
import Instructions from '../shared/instructions';

const Wrapper = styled.div`
  padding: 0 30px;
`

const NotificationPage = () => {
  const notification = useSelector(state => state.game.data.notifications[state.game.notificationCursor]);
  const dispatch = useDispatch();

  const onAcknowledge = () => dispatch(readNotification());

  return (
    <Wrapper>
      <Instructions>{notification}</Instructions>
      <SubmitButton onClick={onAcknowledge}>Ok</SubmitButton>
    </Wrapper>
  );
}

export default NotificationPage;
