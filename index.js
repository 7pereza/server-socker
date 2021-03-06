//working so far on 11/27/2021

const express = require('express');
const socket = require('socket.io')
//const cors = require('cors')

const port = process.env.PORT || 3030;
const INDEX = '/index.html';

const server = express().use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(port, () => console.log(`Listening on ${port}`));


const io = socket(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
  }
})


//io.use(express.static(__dirname + 'node_modules')) // this was cause some issue

console.log("server is running") //link to test http://localhost:3030/socket.io/socket.io.js


///thing for the socker server 
const users = {}
io.on('connection', (socket) => {
  //console.log(socket.user);

  socket.on('new-user', username => {
    users[socket.id] = username
    socket.broadcast.emit('user-connected', username)
  })

  console.log('a user connected');
  //socket.emit('chat-message', 'hello word')//sending test to users

  socket.on('send-chat-message', message => {
    //console.log(message)
    socket.broadcast.emit('chat-message', { message: message, username: users[socket.id] })
  })

  socket.on('disconnect', () => {
    //console.log('user disconnected');
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]

  });
})
// this is the end of io.on

