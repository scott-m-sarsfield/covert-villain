import io from 'socket.io-client';
import { API_BASE } from '../config';

const Socket = {
  socket: null,

  getSocket() {
    this.socket = this.socket || this.createSocket();
    return this.socket;
  },

  createSocket() {
    const socket = io(API_BASE);
    /* eslint-disable no-console */
    socket.on('connect', () => {
      console.log('connected!');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    /* eslint-enable no-console */
    return socket;
  }
};

export default Socket;
