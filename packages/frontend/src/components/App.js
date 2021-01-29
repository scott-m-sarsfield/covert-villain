import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import types from 'prop-types';
import JoinGamePage from './pages/join_game_page';
import LobbyPage from './pages/lobby_page';
import useGameSession from './use_game_session';
import useConsoleUtility from './debug_window';
import PressTheButtonPage from './pages/press_the_button_page';
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

const Wrapper = styled.div`
  background: #ecc16b;
  box-shadow: rgba(0,0,0,0.5) 0 2px 4px;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h2`
  font-size: 21px;
  line-height: 30px;
  color: #392F1F;
  text-transform: uppercase;
  margin: 0 0 0 15px;
  max-width: 1080px;
  padding: 10px 0;
`;

const SettingsButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: 0.2s;
  
  &:hover {
    background: rgba(0,0,0, 0.2);
  }
`;

const Heading = ({ hasSettings }) => (
  <Wrapper>
    <Header>Covert Mussolini</Header>
    {
      hasSettings ? (
        <SettingsButton onClick={() => {}}>
          X
        </SettingsButton>
      ) : null
    }
  </Wrapper>
);

Heading.propTypes = {
  hasSettings: types.bool
};

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

  if (phase === 'press_the_button') {
    return (
      <PressTheButtonPage />
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
  const { joining, data: game, notificationCursor } = useSelector((state) => state.game);

  return (
    <Body>
      <Heading />
      {
        joining && 'Loading...'
      }
      {
        !game && !joining && (
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
