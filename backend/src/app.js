const express = require('express');
const cors = require('cors');
const router = require('./routes');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // seu frontend
    methods: ["GET", "POST"]
  }
});


app.use(express.json());
app.use(cors());
app.use(router);

// Setup socket events
const { setupSocketEvents } = require('./socket/events');
setupSocketEvents(io);

module.exports = { app, server, io };