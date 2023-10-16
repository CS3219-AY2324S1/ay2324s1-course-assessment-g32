const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const env = require('./loadEnvironment.js');

console.log('Starting CollaborationServer...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(env.COLLAB_PORT, () => {
  console.log(`CollaborationService is running on port: ${env.COLLAB_PORT}`);
});

try {
  const httpServer = http.createServer();
  const io = socketIo(httpServer, {
    cors: {
      origin: env.WEB_URL,
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

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
} catch (err) {
  console.error(err);
}
