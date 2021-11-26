

const port = process.env.PORT || 3030;
const io = require('socket.io')(port, {
    cors:{
        origin: ['http://localhost:3000', 'https://ezmessage.azurewebsites.net/', 'https://testingchatchat.azurewebsites.net/'],
    },
})
console.log("on port " + port)

io.on('connection', socket => {
    console.log(socket.id)
}) 


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