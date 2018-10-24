const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  //returns web socket server

app.use(express.static(publicPath)); //will pull the only html file inside public folder

io.on('connection',(socket)=>{
console.log('New User connected');

//sending data to client

socket.emit('newMessage', {
    from: 'pan@panda.com',
    text: 'Hello',
    createAt: 123
}); //emitting event to client

//receives data from client

socket.on('createMessage', (newEmail)=>{

    console.log('createMessage', newEmail);

});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
});

});



server.listen(port,()=>{

    console.log(`Listening on Port ${port}...`);
});

