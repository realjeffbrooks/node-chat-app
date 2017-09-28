const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected on',socket.handshake.headers['user-agent']);

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined the chat'));
  
  socket.on('createMessage', (message, callback) => {
    console.log('create message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    if (callback) callback('message for callback');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from',socket.handshake.headers['user-agent']);
  });
});

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});



