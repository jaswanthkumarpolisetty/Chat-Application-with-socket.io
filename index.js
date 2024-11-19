const express =require('express')
const http = require('http');
const socketIO = require('socket.io');

const app =  express();
const server = http.createServer(app);
const io =socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const users = new Set();

io.on('connection' ,(socket) =>{
    console.log('A user connected');
    users.add(socket.id);
    io.emit('userCount',users.size);
    socket.on('chatMessage', (message)=>{
        console.log('From: ',socket.id, "Message: ",message);
        io.emit('chatMessage', message);
    })
    socket.on('disconnect',()=>{
        console.log('A user disconnected');
        users.delete(socket.id);
        io.emit('userCount',users.size)
    })
})

server.listen(PORT,()=>{
    console.log("Server running on port 3000")
})