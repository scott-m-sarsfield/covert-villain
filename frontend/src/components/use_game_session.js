import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useSocket, useSocketEvent} from './socket_listener';
import { joinGame, refreshGame} from './game_slice';
import Auth from '../auth';

const useGameSession = () => {
  const {code} = useSelector(state => state.game);
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if(Auth.get()){
      dispatch(
        joinGame()
      );
    }
  }, [])

  useEffect(() => {
    if(code){
      socket.emit('join-game', code);
    }
  }, [code])

  useSocketEvent('refresh', () => {
    if(code){
      dispatch(refreshGame(code));
    }
  });
}

export default useGameSession;
