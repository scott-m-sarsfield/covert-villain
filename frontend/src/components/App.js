import React  from 'react';
import {useSelector} from 'react-redux';
import JoinGameScreen from './join_game_screen';
import LobbyScreen from './lobby_screen';
import styled from 'styled-components';
import useGameSession from './use_game_session';
import useConsoleUtility from './debug_window';

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


function App() {
  useGameSession();
  useConsoleUtility();
  const {joining, data: game} = useSelector((state) => state.game);

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
