const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

let count = 0;

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('message', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }
        io.emit('message', message);
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        callback();
    });

    
    socket.broadcast.emit('message', `A new user has joined`);

    socket.on('disconnect', () => {
        io.emit('message', `A user has left`);
    });
    
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});