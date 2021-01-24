import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { readNotification } from '../../game_slice';
import Instructions from '../shared/instructions';
import PartyAssignmentNotificationContent from './party_assignment_notification_content';
import ElectionResultsNotificationContent from './election_results_notification_content';

const Wrapper = styled.div`
  padding: 0 30px 70px 30px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
`;

const NotificationPage = () => {
  const notification = useSelector((state) => state.game.data.notifications[state.game.notificationCursor]);
  const { type, data } = notification;
  const dispatch = useDispatch();

  const onAcknowledge = () => dispatch(readNotification());

  let content = (
    <Instructions>I am a random notification.</Instructions>
  );

  if (type === 'party_assignment') {
    content = <PartyAssignmentNotificationContent />;
  }

  if (type === 'election_results') {
    content = <ElectionResultsNotificationContent data={data}/>;
  }

  return (
    <Wrapper>
      {content}
      <SubmitButton onClick={onAcknowledge}>Ok</SubmitButton>
    </Wrapper>
  );
};

export default NotificationPage;
