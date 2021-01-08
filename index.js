const express = require('express');
const app = express()
const port = process.env.PORT || 3001;

app.use(express.static('frontend/public'));

app.get('/api', (req, res) => res.send('(something else)'))

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*"
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('button press', (msg) => {
    console.log('button pressed! ' + msg);
  });
});


http.listen(port, () => console.log(`covert-mussolini app listening on port ${port}!`))
