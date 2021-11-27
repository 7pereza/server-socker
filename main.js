
const app = require("express")()
const port = process.env.PORT || 3030;

const server = require("http").createServer(app)

const io = require("socket.io")(server, {
    cors:{
        origin: true,
    },
})


io.on("connection", (socket) =>{
    //console.log("what is socket: ", socket)
    console.log("socket is active to be connected")

    socket.on("chat-message", (payload) => {
        console.log("what is payload: ", payload)
        io.emit("chat-message", payload) // just sending back what has been sent
    })
})


server.listen(port, () =>{
    console.log(port)

})