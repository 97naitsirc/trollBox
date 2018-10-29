var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');



});

socket.on('disconnect', function () {
    console.log('User Disconnected from the server');
});

//custom events

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    

    // //appends messages on browser

    // var li = jQuery('<li></li>')
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);

});

//Geolocation URL on browser

socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();

    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);


    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target = "_blank" >My Current Location</a>');

    // li.text(`${message.from}  ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);

    // jQuery('#messages').append(li);
});

//gets the message from browser form and sends it to server when submitted

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault(); //prevents default behavior of reloading page by submit

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val() //gets value of DOM object with property name as message
    }, function () {

        messageTextBox.val(''); //empty the field after sending to server

    });

});

//gets user's location using Geolocation API available by default in browser

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by yout browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...'); //disabling button until the location is sent to server

    navigator.geolocation.getCurrentPosition(function (position) {

        locationButton.removeAttr('disabled').text('Send Location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    },
        function () {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        });

});

