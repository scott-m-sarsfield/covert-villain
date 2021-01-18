import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('connected!');
});
socket.on('disconnect', () => {
  console.log('disconnected');
})

export const useSocket = () => {
  return socket;
}

export const useSocketEvent = (event, onEvent) => {
  useEffect(() => {
    socket.on(event, onEvent);

    return () => {
      socket.off(event, onEvent);
    };
  }, [event, onEvent]);
}
