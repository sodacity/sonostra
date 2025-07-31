// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the client-side files (index.html, app.js, style.css)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a room
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
        // Notify others in the room that a new peer has joined
        socket.to(roomId).emit('peer-joined', socket.id);
    });

    // Relay WebRTC signaling messages
    socket.on('signal', (data) => {
        // Send the signal to the other user in the room
        io.to(data.to).emit('signal', {
            from: socket.id,
            signal: data.signal,
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // In a real app, you'd want to notify the room about the disconnection.
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Signaling server running on port ${PORT}`));
