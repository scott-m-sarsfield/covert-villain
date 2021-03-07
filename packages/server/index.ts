import express, { Response } from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';
import apiRouter from './api';

const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);
// @ts-ignore
const io = socketIO(server, {
  cors: {
    origin: process.env.NODE_ENV === 'development' ? '*' : true
  }
});

io.on('connection', (socket: any) => {
  console.log('a user connected'); /* eslint-disable-line no-console */
  socket.on('join-game', (code: string) => {
    console.log('user is joining room', code); /* eslint-disable-line no-console */
    socket.join(code);
  });
  socket.on('leave-game', (code: string) => {
    console.log('user is leaving room', code); /* eslint-disable-line no-console */
    socket.leave(code);
  });
});

const setCustomCacheControl = (res: Response) => {
  res.setHeader('Cache-Control', 'no-cache');
};

app.use(
  express.static(
    path.join(__dirname, '../frontend/build'),
    {
      lastModified: false,
      setHeaders: setCustomCacheControl
    }
  )
);
app.use(cors({ origin: process.env.NODE_ENV === 'development' ? '*' : true }));

app.use('/api',
  (req, res, next) => {
    // @ts-ignore
    res.sendRoomEvent = (code, event) => {
      io.to(code).emit(event);
    };
    next();
  },
  apiRouter
);

/* eslint-disable-next-line no-console */
server.listen(port, () => console.log(`covert-villain app listening on port ${port}!`));
