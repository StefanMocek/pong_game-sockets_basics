const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is listening on PORT: ${PORT}`);
});

let readyPlayerCount = 0;

io.on('connection', (socket) => {
  console.log('user connected', socket.id);

  socket.on('ready', () => {
    console.log('user with id is ready ', socket.id);

    readyPlayerCount++;

    if(readyPlayerCount === 2) {
      io.emit('startGame', socket.id)
    }
  });

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData)
  });

  socket.on('ballMove', (ballData) => {
    socket.broadcast.emit('ballMove', ballData)
  });
});