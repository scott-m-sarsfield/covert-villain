import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import types from 'prop-types';
import JoinGamePage from './pages/join_game_page';
import useGameSession from './use_game_session';
import useConsoleUtility from './debug_window';
import NotificationPage from './pages/notification_page';
import PresidentChoosesChancellorPage from './pages/president_chooses_chancellor_page';
import ElectionPage from './pages/election_page';
import PresidentChoosesPoliciesPage from './pages/president_chooses_policies_page';
import ChancellorChoosesPolicyPage from './pages/chancellor_chooses_policy_page';
import GameOverPage from './pages/game_over_page';
import SpecialActionPolicyPeekPage from './pages/special_action_policy_peek_page';
import PresidentExecutesPlayerPage from './pages/president_executes_player_page';
import PresidentApprovesVetoPage from './pages/president_approves_veto_page';
import { dismissError } from '../store/game_slice';
import PresidentInvestigatesLoyaltyPage from './pages/president_investigates_loyalty_page';
import SpecialElectionPage from './pages/special_election_page';

const Body = styled.div`
  background: beige;
  height: 100%;
  min-height: 100vh;
  min-height: fill-available;
  font-family: 'Potta One', sans-serif;
  letter-spacing: 2px;
  
  * {
    font-family: 'Potta One', sans-serif;
    letter-spacing: 2px;
  }
`;

function GameScreens({ game, notificationCursor }) {
  const { phase, notifications } = game;

  if (notificationCursor < notifications.length) {
    return (
      <NotificationPage />
    );
  }

  if (phase === 'lobby') {
    return (
      <GameOverPage />
    );
  }

  if (phase === 'president_chooses_chancellor') {
    return (
      <PresidentChoosesChancellorPage />
    );
  }

  if (phase === 'election') {
    return (
      <ElectionPage />
    );
  }

  if (phase === 'president_chooses_policies') {
    return (
      <PresidentChoosesPoliciesPage />
    );
  }

  if (phase === 'chancellor_chooses_policy') {
    return (
      <ChancellorChoosesPolicyPage />
    );
  }

  if (phase === 'special_action_policy_peek') {
    return (
      <SpecialActionPolicyPeekPage />
    );
  }

  if (phase === 'special_action_execution') {
    return (
      <PresidentExecutesPlayerPage />
    );
  }

  if (phase === 'president_approves_veto') {
    return (
      <PresidentApprovesVetoPage />
    );
  }

  if (phase === 'special_action_investigate_loyalty') {
    return (
      <PresidentInvestigatesLoyaltyPage />
    );
  }

  if (phase === 'special_action_election') {
    return (
      <SpecialElectionPage />
    );
  }

  return (
    <div>404 - Unknown Phase</div>
  );
}

GameScreens.propTypes = {
  game: types.shape({
    phase: types.string.isRequired,
    notifications: types.array.isRequired
  }).isRequired,
  notificationCursor: types.number
};

const ErrorPopup = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  bottom: 15px;
  right: 15px;
  z-index: 2;
  background: white;
  border: solid 2px black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ErrorHeading = styled.h3`
  text-align: center;
`;
const ErrorMessage = styled.div`
  padding: 0 30px;
  
  p {
    margin-top: 60px;
  }
`;

const DismissErrorButton = styled.button`
  appearance: none;
  border: none;
  text-transform: uppercase;
  background: none;
  font-size: 30px;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
`;

function App() {
  useGameSession();
  useConsoleUtility();
  const dispatch = useDispatch();
  const {
    joining,
    data: game,
    notificationCursor,
    errorMessage
  } = useSelector((state) => state.game);

  return (
    <Body>
      {errorMessage && (
        <ErrorPopup>
          <ErrorMessage>
            <ErrorHeading>Error</ErrorHeading>
            <p>{errorMessage}</p>
          </ErrorMessage>
          <DismissErrorButton onClick={() => dispatch(dismissError())}>Ok</DismissErrorButton>
        </ErrorPopup>
      )}
      {
        !game && (
          <JoinGamePage />
        )
      }
      {
        game && !joining && (
          <GameScreens game={game} notificationCursor={notificationCursor}/>
        )
      }
    </Body>
  );
}

export default App;
