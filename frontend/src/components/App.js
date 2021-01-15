import React  from 'react';
import {useSelector} from 'react-redux';
import JoinGameScreen from './join_game_screen';
import DebugWindow from './debug_window';
import LobbyScreen from './lobby_screen';
import styled from 'styled-components';
import useGameSession from './use_game_session';

const Body = styled.div`
  background: beige;
  min-height: 100vh;
  font-family: 'Potta One', sans-serif;
  letter-spacing: 2px;
  
  button {
    font-family: 'Potta One', sans-serif;
    letter-spacing: 2px;
  }
`;


function App() {
  useGameSession();
  const {joining, data: game} = useSelector((state) => state.game);

  return (
    <Body>
      <DebugWindow />
      {
        joining && 'Loading...'
      }
      {
        !game && !joining && (
          <JoinGameScreen />
        )
      }
      {
        game && !joining && (
          <LobbyScreen game={game} />
        )
      }
    </Body>
  );
}

export default App;
