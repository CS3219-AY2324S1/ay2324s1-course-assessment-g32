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

  io.on(Event.Socket.CONNECT, (socket) => {
    // Handle room joining
    socket.on(Event.Socket.JOIN_ROOM, (data) => {
      const room = data.room;
      const user = data.user;

      socket.join(room);
      logger.log(`${user} joined room: ${room}`);

      const message = { text: `${user} joined room`, sender: 'server' };
      io.to(room).emit(Event.Communication.CHAT_RECEIVE, message);
    });

    // Handle room leaving
    socket.on(Event.Socket.LEAVE_ROOM, (data) => {
      const room = data.room;
      const user = data.user;

      socket.leave(room);
      socket.disconnect(true);
      logger.log(`${user} left room: ${room}`);

      const message = { text: `${user} left room`, sender: 'server' };
      io.to(room).emit(Event.Communication.CHAT_RECEIVE, message);
    });

    // Handle question changes
    socket.on(Event.Question.CHANGE, (data) => {
      const room = data.room;
      const question = data.question;

      io.to(room).emit(Event.Question.UPDATE, question);
    });

    // Handle code changes
    socket.on(Event.Code.CHANGE, (data) => {
      const room = data.room;
      const code = data.updatedCode;

      io.to(room).emit(Event.Code.UPDATE, code);
    });

    // Handle language changes
    socket.on(Event.Language.CHANGE, (data) => {
      const room = data.room;
      const language = data.updatedLanguage;

      io.to(room).emit(Event.Language.UPDATE, language);
    });

    // Handle code execution result changes
    socket.on(Event.Result.CHANGE, (data) => {
      const room = data.room;
      const result = data.updatedResult;

      io.to(room).emit(Event.Result.UPDATE, result);
    });

    // Handle execution button disabling when code is executing
    socket.on(Event.Button.DISABLE_EXEC, (data) => {
      const room = data.roomId;
      const btnState = data.isButtonDisabled;

      io.to(room).emit(Event.Button.UPDATE_EXEC, btnState);
    });

    // Handle mouse position changes
    socket.on(Event.Mouse.POSITION, (data) => {
      const room = data.room;
      const user = data.user;
      const jwt = data.jwt;
      const mousePosition = data.position;
      const message = { user: user, jwt: jwt, position: mousePosition };

      io.to(room).emit(Event.Mouse.POSITION, message);
    });

    // Handle mouse leave
    socket.on(Event.Mouse.LEAVE, (data) => {
      const room = data.room;
      const jwt = data.jwt;

      io.to(room).emit(Event.Mouse.LEAVE, jwt);
    });

    // Handle chat messages
    socket.on(Event.Communication.CHAT_SEND, (data) => {
      const room = data.room;
      const message = data.message;

      io.to(room).emit(Event.Communication.CHAT_RECEIVE, message);
    });
  });

  httpServer.listen(env.COLLAB_PORT, () => {
    logger.log(`Running on port: ${env.COLLAB_PORT}`);
  });
} catch (err) {
  console.error(err);
}
