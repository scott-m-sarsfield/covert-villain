import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useSocket, useSocketEvent} from './socket_listener';
import useLocalStorage from './use_local_storage';
import { joinGame, refreshGame} from './game_slice';

const useGameSession = () => {
  const [{name: localName, code: localCode}, setLocalNameAndCode] = useLocalStorage('name-and-room', {});

  const {name, code} = useSelector(state => state.game);
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if(localCode && localName){
      dispatch(
        joinGame({
          code: localCode,
          name: localName
        })
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
  })

  useEffect(() => {
    setLocalNameAndCode({
      name,
      code
    });
  }, [name, code]);
}

export default useGameSession;
