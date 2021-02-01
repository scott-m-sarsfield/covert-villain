const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3001;
const apiRouter = require('./api');

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.NODE_ENV === 'development' ? '*' : true
  }
});

io.on('connection', (socket) => {
  console.log('a user connected'); /* eslint-disable-line no-console */
  socket.on('join-game', (code) => {
    console.log('user is joining room', code); /* eslint-disable-line no-console */
    socket.join(code);
  });
  socket.on('leave-game', (code) => {
    console.log('user is leaving room', code); /* eslint-disable-line no-console */
    socket.leave(code);
  });
});

const setCustomCacheControl = (res) => {
  res.setHeader('Cache-Control', 'no-cache');
};

app.use(
  express.static(
    path.join(__dirname, '../frontend/build'),
    {
      setHeaders: setCustomCacheControl
    }
  )
);
app.use(cors({ origin: process.env.NODE_ENV === 'development' ? '*' : true }));

app.use('/api',
  (req, res, next) => {
    res.sendRoomEvent = (code, event) => {
      io.to(code).emit(event);
    };
    next();
  },
  apiRouter
);

/* eslint-disable-next-line no-console */
server.listen(port, () => console.log(`covert-mussolini app listening on port ${port}!`));
