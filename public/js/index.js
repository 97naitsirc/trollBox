var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');



});

socket.on('disconnect', function () {
    console.log('User Disconnected from the server');
});

//custom events

socket.on('newMessage', function (message) {

    console.log('newMessage', message) // prints on console of browser

    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);

});

socket.emit('createMessage', {
    from: 'Pan',
    text: 'Hi!'
}, function (data) {
    console.log('Got it', data);
});


jQuery('#message-form').on('submit', function (e) {

    e.preventDefault(); //prevents default behavior of reloading page by submit

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val() //gets value of DOM object with property name as message
    }, function (data) {

    });

});
