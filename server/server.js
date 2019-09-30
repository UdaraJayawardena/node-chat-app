const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app)

var io = socketIO(server);

const mongo = require('mongodb').MongoClient;

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/data', function (err, db) {
    if (err) {
        throw err;
    }

    console.log('MongoDB connected...');

    io.on('connection', (socket) => {

        let chat = db.collection('sample');

        console.log('new user connected');

        socket.emit('newMessage', {
            'from': 'Admin',
            'text': 'Welcome to the Chat App',
            'createAt': new Date().getTime()
        })

        socket.broadcast.emit('newMessage', {
            'from': 'Admin',
            'text': 'New User Joined',
            'createAt': new Date().getTime()
        })

        socket.on('createMessage', (message) => {
            console.log('Message : ', message);

            io.emit('newMessage', {
                from: message.from,
                text: message.text,
                createAt: new Date().getTime()
            })

            // socket.broadcast.emit('newMessage', {
            //     'from': message.from,
            //     'text': message.text,
            //     createAt: new Date().getTime()
            // })

            console.log('after new message');
        })

        socket.on('disconnect', () => {
            console.log('user is disconnected')
        })

        // socket.on('createAccount', (account) => {
        // console.log(account)
        // chat.insert({
        //     account
        // }, () => {
        //     console.log('insert')
        // })
        // })


    })
})

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server is running on port : ' + port)
})
