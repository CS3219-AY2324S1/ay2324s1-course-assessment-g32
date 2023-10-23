const http = require('http');
const socketIo = require('socket.io');
const env = require('./loadEnvironment.js');

console.log('Starting CollaborationServer...');

try {
  const httpServer = http.createServer();

  const allowedOrigins = [
    env.WEB_URL, // Run locally
    env.REACT_APP_HOST, // Run via Nginx
  ];

  const io = socketIo(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    // Handle room joining
    socket.on('joinRoom', (data) => {
      socket.join(data.room);
      console.log(`${data.host} joined room: ${data.room}`);

      const message = { text: `${data.host} joined room` };
      io.to(data.room).emit('message', message); // Broadcast a message to the room when someone joins
    });

    // Handle room leaving
    socket.on('leaveRoom', (data) => {
      socket.leave(data.room);
      console.log(`${data.host} left room: ${data.room}`);

      const message = { text: `${data.host} left room` };
      io.to(data.room).emit('message', message); // Broadcast a message to the room when someone leaves
    });

    // Handle chat messages
    socket.on('chatMessage', (data) => {
      io.to(data.room).emit('message', data.message); // Broadcast message to everyone in the room
    });

    // Handle code changes
    socket.on('codeChange', (data) => {
      io.to(data.room).emit('codeUpdate', data.updatedCode); // Broadcast code to everyone in the room
    });

    // Handle language changes
    socket.on('languageChange', (data) => {
      io.to(data.room).emit('languageUpdate', data.updatedLanguage); // Broadcast language to everyone in the room
    });

    // Handle question changes
    socket.on('questionChange', (data) => {
      io.to(data.room).emit('questionUpdate', data.question); // Broadcast question to everyone in the room
    });

    // Handle disconnects
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  httpServer.listen(env.COLLAB_PORT, () => {
    console.log(`Socket.IO server is running on port: ${env.COLLAB_PORT}`);
  });
} catch (err) {
  console.error(err);
}
