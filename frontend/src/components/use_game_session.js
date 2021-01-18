import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import get from 'lodash/get';
import {useSocket, useSocketEvent} from './socket_listener';
import {forgetGame, joinGame, refreshGame} from '../game_slice';
import Auth from '../auth';

const useGameSession = () => {
  const code = useSelector(state => get(state, 'game.user.roomCode'));
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
      console.log('joining game', code);
      socket.emit('join-game', code);
    }
  }, [code])

  useSocketEvent('connect', () => {
    if(code){
      console.log('joining game', code);
      socket.emit('join-game', code);
    }
  })

  useSocketEvent('refresh', () => {
    if(code){
      dispatch(refreshGame(code));
    }
  });

  useSocketEvent('room-reset', () => {
    Auth.clear();
    dispatch(forgetGame());
  })
}

export default useGameSession;
