const http = require('http');
const socketIo = require('socket.io');
const env = require('./loadEnvironment');
const { Event, CollaborationEvent, CommunicationEvent } = require('./constants');

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

  io.on(Event.CONNECTION, (socket) => {
    // Handle room joining
    socket.on(Event.JOIN_ROOM, (data) => {
      socket.join(data.room);
      console.log(`${data.host} joined room: ${data.room}`);

      const message = { text: `${data.host} joined room` };
      io.to(data.room).emit(CommunicationEvent.CHAT_RECEIVE, message); // Broadcast a message to the room when someone joins
    });

    // Handle room leaving
    socket.on(Event.LEAVE_ROOM, (data) => {
      socket.leave(data.room);
      console.log(`${data.host} left room: ${data.room}`);

      const message = { text: `${data.host} left room` };
      io.to(data.room).emit(CommunicationEvent.CHAT_RECEIVE, message); // Broadcast a message to the room when someone leaves
    });

    // Handle chat messages
    socket.on(CommunicationEvent.CHAT_SEND, (data) => {
      io.to(data.room).emit(CommunicationEvent.CHAT_RECEIVE, data.message); // Broadcast message to everyone in the room
    });

    // Handle code changes
    socket.on(CollaborationEvent.CODE_CHANGE, (data) => {
      io.to(data.room).emit(CollaborationEvent.CODE_UPDATE, data.updatedCode); // Broadcast code to everyone in the room
    });

    // Handle language changes
    socket.on(CollaborationEvent.LANGUAGE_CHANGE, (data) => {
      io.to(data.room).emit(CollaborationEvent.LANGUAGE_UPDATE, data.updatedLanguage); // Broadcast language to everyone in the room
    });

    // Handle question changes
    socket.on(Event.QUESTION_CHANGE, (data) => {
      io.to(data.room).emit(Event.QUESTION_UPDATE, data.question); // Broadcast question to everyone in the room
    });

    // Handle disconnects
    socket.on(Event.DISCONNECT, () => {
      console.log('A user disconnected');
    });
  });

  httpServer.listen(env.COLLAB_PORT, () => {
    console.log(`Socket.IO server is running on port: ${env.COLLAB_PORT}`);
  });
} catch (err) {
  console.error(err);
}
