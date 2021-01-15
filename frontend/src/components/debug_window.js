import React  from 'react';
import styled from 'styled-components';
import { useDispatch} from 'react-redux';
import {exitGame, resetGame} from './game_slice';

const DebugPanelContainer = styled.div`
  background: #ccc;
  border: solid 1px black;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 200px;
`;

const DebugPanelHeading = styled.h5`
  text-align: center;
  margin: 15px;
`;

const DebugButton = styled.button`
  width: 100%;
  min-height: 30px;
`

const DebugWindow = () => {
  const dispatch = useDispatch();

  const onReset = async () => {
    dispatch(resetGame());
  }

  const onExit = async () => {
    dispatch(exitGame());
  }

  return (
    <DebugPanelContainer>
      <DebugPanelHeading>Debug Window</DebugPanelHeading>
      <DebugButton onClick={onReset}>Reset</DebugButton>
      <DebugButton onClick={onExit}>Exit</DebugButton>
    </DebugPanelContainer>
  );
}

export default DebugWindow;
