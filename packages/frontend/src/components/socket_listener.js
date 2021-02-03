import { useEffect } from 'react';
import Socket from './socket';

export const useSocket = () => {
  return Socket.getSocket();
};

export const useSocketEvent = (event, onEvent) => {
  useEffect(() => {
    const socket = Socket.getSocket();
    socket.on(event, onEvent);

    return () => {
      socket.off(event, onEvent);
    };
  }, [event, onEvent]);
};
