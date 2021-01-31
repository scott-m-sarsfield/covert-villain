import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import types from 'prop-types';
import JoinGamePage from './pages/join_game_page';
import LobbyPage from './pages/lobby_page';
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

const Body = styled.div`
  background: beige;
  min-height: 100vh;
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
      <LobbyPage />
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

  if (phase === 'game_over') {
    return (
      <GameOverPage />
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

function App() {
  useGameSession();
  useConsoleUtility();
  const {
    joining,
    data: game,
    notificationCursor
  } = useSelector((state) => state.game);

  return (
    <Body>
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
