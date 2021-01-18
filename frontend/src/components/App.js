import React  from 'react';
import {useSelector} from 'react-redux';
import JoinGamePage from './pages/join_game_page';
import LobbyPage from './pages/lobby_page';
import styled from 'styled-components';
import useGameSession from './use_game_session';
import useConsoleUtility from './debug_window';
import PressTheButtonPage from './pages/press_the_button_page';
import NotificationPage from './pages/notification_page';

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

const Heading = ({hasSettings}) => (
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

function GameScreens({game, notificationCursor}){
  const {phase: {name}, notifications} = game;

  if(notificationCursor < notifications.length){
    return (
      <NotificationPage />
    )
  }

  if(name === 'lobby'){
    return (
      <LobbyPage />
    )
  }

  if(name === 'press_the_button'){
    return (
      <PressTheButtonPage />
    )
  }

  return (
    <div>404 - Unknown Phase</div>
  )
}


function App() {
  useGameSession();
  useConsoleUtility();
  const {joining, data: game, notificationCursor} = useSelector((state) => state.game);

  const state = useSelector(state => state);
  console.log(state);

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