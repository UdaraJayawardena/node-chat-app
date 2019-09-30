const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app)

var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('connected socket ID : ' + socket.id);
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('user is disconnected')
    })
})

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server is running on port : ' + port)
})
