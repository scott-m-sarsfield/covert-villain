import { useEffect } from 'react';
import io from 'socket.io-client';
import { API_BASE } from '../config';

const socket = io(API_BASE);

/* eslint-disable no-console */
socket.on('connect', () => {
  console.log('connected!');
});
socket.on('disconnect', () => {
  console.log('disconnected');
});
/* eslint-enable no-console */

export { socket };

export const useSocket = () => {
  return socket;
};

export const useSocketEvent = (event, onEvent) => {
  useEffect(() => {
    socket.on(event, onEvent);

    return () => {
      socket.off(event, onEvent);
    };
  }, [event, onEvent]);
};
