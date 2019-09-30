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

    socket.on('disconnect', function () {
        console.log('Disconnected from server')
    });
})

socket.on('newMessage', function (message) {
    console.log(message);
})

// socket.on('sendMessage',function(message){
//     console.log('sendMessage : ', message)
// })
