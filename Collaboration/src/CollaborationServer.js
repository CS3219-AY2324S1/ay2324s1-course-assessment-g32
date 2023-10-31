const http = require('http');
const socketIo = require('socket.io');
const env = require('./loadEnvironment');
const logger = require('./Log');
const { Event } = require('./constants');

logger.register({
  serviceName: 'Collaboration Service',
  logLevel: logger.LOG_LEVELS.all,
});

logger.log('Starting ...');

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
      const room = data.room;
      const user = data.user;

      socket.join(room);
      logger.log(`${user} joined room: ${room}`);

      const message = { text: `${user} joined room` };
      io.to(room).emit(Event.Communication.CHAT_RECEIVE, message);
    });

    // Handle room leaving
    socket.on(Event.LEAVE_ROOM, (data) => {
      const room = data.room;
      const user = data.user;

      socket.leave(room);
      socket.disconnect(true);
      logger.log(`${user} left room: ${room}`);

      const message = { text: `${user} left room` };
      io.to(room).emit(Event.Communication.CHAT_RECEIVE, message);
    });

    // Handle chat messages
    socket.on(Event.Communication.CHAT_SEND, (data) => {
      const room = data.room;
      const message = data.message;

      io.to(room).emit(Event.Communication.CHAT_RECEIVE, message);
    });

    // Handle code changes
    socket.on(Event.Collaboration.CODE_CHANGE, (data) => {
      const room = data.room;
      const code = data.updatedCode;

      io.to(room).emit(Event.Collaboration.CODE_UPDATE, code);
    });

    // Handle language changes
    socket.on(Event.Collaboration.LANGUAGE_CHANGE, (data) => {
      const room = data.room;
      const language = data.updatedLanguage;

      io.to(room).emit(Event.Collaboration.LANGUAGE_UPDATE, language);
    });

    // Handle question changes
    socket.on(Event.Question.QUESTION_CHANGE, (data) => {
      const room = data.room;
      const question = data.question;

      io.to(room).emit(Event.Question.QUESTION_UPDATE, question);
    });

    // Handle mouse position changes
    socket.on(Event.Collaboration.MOUSE_POSITION, (data) => {
      const room = data.room;
      const user = data.user;
      const jwt = data.jwt;
      const mousePosition = data.position;
      const message = {user: user, jwt: jwt, position: mousePosition};

      io.to(room).emit(Event.Collaboration.MOUSE_POSITION, message);
    });

    // Handle disconnects
    socket.on(Event.DISCONNECT, () => {
      logger.log('A user disconnected');
    });
  });

  httpServer.listen(env.COLLAB_PORT, () => {
    logger.log(`Running on port: ${env.COLLAB_PORT}`);
  });
} catch (err) {
  console.error(err);
}
