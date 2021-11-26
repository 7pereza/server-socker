// https://github.com/WebDevSimplified/Realtime-Simple-Chat-App/blob/master/script.js
const express = require("express");
const app = express();
const cors = require("cors")
app.use(
  cors({
    origin: "*"
  })
)

const port = process.env.PORT || 3030;
const server = app.listen(port)
app.use(express.static(__dirname + 'node_modules'))

console.log("server is running") //link to test http://localhost:3030/socket.io/socket.io.js

// const { createServer } = require("http");
// const { dirname } = require("path");
// const { Server } = require("socket.io");

const socket = require('socket.io')
//const httpServer = createServer(app);
const io = socket(server)



// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


///thing for the socker server 
const users = {}
io.on('connection', (socket) => {
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



//httpServer.listen(port);