const express = require("express");
const app = express();

app.use(express.json())

app.use(express.static( __dirname+"./../rxjs-chat/dist/rxjs-chat/"))
console.log(__dirname)

const http = require('http');
const server = http.Server(app);

require("./config/mongoose");
require("./config/routes")(app);

const socketIO= require('socket.io');
const io = socketIO(server);

const port= process.env.port  || 8000;

io.on('connection', socket => {
    console.log("user connected");
    socket.on('logged-in', username => {
        console.log(`${username} is now connected.`);
        io.emit("new-user", username);
    })
    socket.on('new-message', message => {
        console.log(message);
        io.emit('new-message', message);
    })
    socket.on('start', img => {
        console.log("start-battle", img)
        io.emit('start-battle', img)
    })
    socket.on("my-pokemon", pokemon => {
        socket.broadcast.emit("foe-pokemon", pokemon);
    })
    socket.on("send-move", move => {
        console.log("move recieved")
        socket.broadcast.emit("foe-move", move);
    })
});


server.listen(port, () => {
    console.log(`started on port: ${port}`)
});