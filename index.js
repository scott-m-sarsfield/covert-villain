const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3001;
const apiRouter = require('./api');

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*"
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join-game', (code) => {
    console.log('user is joining room', code);
    socket.join(code)
  });
});

app.use(express.static('frontend/public'));
app.use(cors({ origin: '*' }))

app.use('/api', apiRouter(io));


http.listen(port, () => console.log(`covert-mussolini app listening on port ${port}!`))
