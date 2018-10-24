var  socket = io();

socket.on('connect',function () {
    console.log('Connected to the server');

   

});

socket.on('disconnect',function (){
    console.log('User Disconnected from the server');
});

//custom events

socket.on('newMessage', function(message){

    console.log('newMessage', message) // prints on console of browser

});