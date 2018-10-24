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

 //emit from Admin to welcome new user

 socket.emit('newMessage',{
    from: 'Admin',
    text: 'Welcome to Chat App',
    createAt: new Date().getTime()
});

//broadcast emit from Admin to text new user joined

socket.broadcast.emit('newMessage',{
    from: 'Admin' ,
        text: 'New User Joined!',
        createAt: new Date().getTime()

});

socket.on('createMessage', (newMessage)=>{

    console.log('createMessage', newMessage);

       //emits/ calls  new message on client when a new message is created 

    io.emit('newMessage',{
        from: newMessage.from,
        text: newMessage.text,
        createAt: new Date().getTime()
    });

    //message will be viewed by everyone but the sender

    // socket.broadcast.emit('newMessage',{
    //     from: newMessage.from,
    //         text: newMessage.text,
    //         createAt: new Date().getTime()

    // });

});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server');
});

});



server.listen(port,()=>{

    console.log(`Listening on Port ${port}...`);
});

