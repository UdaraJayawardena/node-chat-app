var socket = io.connect('192.168.1.9:3000', {reconnect: true});

socket.on('connect', function () {
    console.log('connected to the server');

    // socket.emit('createEmail', {
    //     'to': 'Udara Jayawardena',
    //     'text': 'hey this is andrew'
    // })

    // socket.emit('createMessage', {
    //     'from': 'udara',
    //     'text': 'Hi I am Udara'
    // });

})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
    console.log(message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${
        message.text
    }`);

    jQuery('#messages').append(li);
})

// socket.emit('createMessage', {
//     'from': 'Udara',
//     'text': 'This is from Udara'
// }, function (data) {
//     console.log(data);
//     console.log('Done')
// })

// socket.on('sendMessage',function(message){
//     console.log('sendMessage : ', message)
// })

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        'from': 'user',
        'text': jQuery('[name=message]').val()
    }, function () {});
});
