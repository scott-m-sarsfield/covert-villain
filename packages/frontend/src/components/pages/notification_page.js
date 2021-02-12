import React from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { readNotification } from '../../store/game_slice';
import Instructions from '../shared/instructions';
import PartyAssignmentNotificationContent from './party_assignment_notification_content';
import ElectionResultsNotificationContent from './election_results_notification_content';
import PolicyEnactedNotificationContent from './policy_enacted_notification_content';
import ExecutionNotificationContent from './execution_notification_content';
import Heading from '../heading';
import VetoNotificationContent from './veto_notification_content';
import InvestigationNotificationContent from './investigation_notification_content';

const styles = {
  content: css`
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
`,
  heading: css`
    flex: 0 0 auto;
`,
  wrapper: css`
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    min-height: fill-available;
    overflow: auto;
`,
  submitButton: css`
    position: relative;
    flex: 0 0 auto;
`
};

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

  if (type === 'policy_enacted') {
    content = <PolicyEnactedNotificationContent data={data} />;
  }

  if (type === 'execution') {
    content = <ExecutionNotificationContent data={data} />;
  }

  if (type === 'veto') {
    content = <VetoNotificationContent />;
  }

  if (type === 'investigation') {
    content = <InvestigationNotificationContent data={data} />;
  }

  return (
    <div className={styles.wrapper}>
      <Heading className={styles.heading} />
      <div className={styles.content}>
        {content}
      </div>
      <SubmitButton onClick={onAcknowledge} className={styles.submitButton}>
        Ok
      </SubmitButton>
    </div>

  );
};

export default NotificationPage;
