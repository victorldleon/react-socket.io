const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const { Server } = require('socket.io'); 
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST'],
        allowedHeaders: 'Content-Type, Authorization, X-Requested-With, X-Socket-ID',
        credentials: true,
        maxAge: '86400'
    }
});

io.on('connection', (socket) => {
    console.log('socket id', socket.id);

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
    });
})

server.listen(3001, () => {
    console.log('Server running on port 3000');
    }
);