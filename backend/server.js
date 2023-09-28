const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const http = require("http"); // for collaboration
const socketIo = require('socket.io'); // for collaboration
const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');
const questionRoutes = require('./server/routes/question');
const queueRoutes = require('./server/routes/queue');
const env = require('./loadEnvironment');

console.log('Starting server ...');

// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/queue', queueRoutes);
app.listen(env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${env.SERVER_PORT}`);
});

try {
  // MongoDB
  mongoose.connect(env.MONGO_CLIENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mongoDb = mongoose.connection;
  mongoDb.once('open', () => {
    console.log('SUCCESS: Connected to the MongoDB database');
  });
  mongoDb.on('error', (error) => {
    console.error('MongoDB database connection error:', error);
  });


  // MySQL
  const mysqlDb = mysql.createConnection({
    ...env.mysqlCreds,
    ...{ database: env.mysqlDbName }
  });

  mysqlDb.connect((error) => {
    if (error)
      throw new Error('MySQL database connection error:' + error.message);
    console.log('SUCCESS: Connected to the MySQL database');
  });


  // Collaboration
  const httpServer = http.createServer();
  const io = socketIo(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => {
      socket.join(data.room);
      console.log(`${data.host} joined room: ${data.room}`);

      // Broadcast a message to the room when someone joins
      io.to(data.room).emit('message', `${data.host} joined room: ${data.room}`);
    });

    socket.on('leaveRoom', (data) => {
      socket.leave(data.room); // Leave the specified room
      console.log(`${data.host} left room: ${data.room}`);

      // Broadcast a message to the room when someone leaves
      io.to(data.room).emit('message', `${data.host} left room: ${data.room}`);
    });

    // Handle chat messages
    socket.on('chatMessage', (data) => {
      io.to(data.room).emit('message', data.message); // Broadcast message to everyone in the room
    });

    // Handle code changes
    socket.on('codeChange', (data) => {
      io.to(data.room).emit('codeUpdate', data.updatedCode); // Broadcast code to everyone in the room
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  httpServer.listen(3002, () => {
    console.log('Socket.io server is running on http://localhost:3002');
  });
}
catch (err) {
  console.error(err);
}
