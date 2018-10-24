var  socket = io();

socket.on('connect',function () {
    console.log('Connected to the server');

    //emit event only when created

    socket.emit('createMessage', {
        from: 'tian@panda.com',
        text: 'Hi Father!'
    });

});

socket.on('disconnect',function (){
    console.log('User Disconnected from the server');
});

//custom events

socket.on('newMessage', function(email){

    console.log('newMessage', email) // prints on console of browser

});