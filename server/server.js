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


socket.on('createMessage', (newMessage)=>{

    console.log('createMessage', newMessage);

    //emits new message on client when a new message is created 

    io.emit('newMessage',{
        from: newMessage.from,
        text: newMessage.text,
        createAt: new Date().getTime()
    });

});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
});

});



server.listen(port,()=>{

    console.log(`Listening on Port ${port}...`);
});

