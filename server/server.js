const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {genarateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app)
var io = socketIO(server);

io.on('connection', (socket) => {

    console.log('new user connected');

    socket.emit('newMessage', genarateMessage('Admin', 'Welcome to the Chat App'))

    socket.broadcast.emit('newMessage', genarateMessage('Admin', 'New User Join'))

    socket.on('createMessage', (message, callback) => {
        console.log('Message : ', message);

        io.emit('newMessage', genarateMessage(message.from, message.text))

        callback('This is from server.js');

        // socket.broadcast.emit('newMessage', {
        //     'from': message.from,
        //     'text': message.text,
        //     createAt: new Date().getTime()
        // })

    })

    socket.on('disconnect', () => {
        console.log('user is disconnected')
    })

    // socket.on('createAccount', (account) => {
    //     console.log(account)
    //     chat.insert({
    //         account
    //     }, () => {
    //         console.log('insert')
    //     })
    // })


})


app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server is running on port : ' + port)
})
