import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://biz-convo-pi.vercel.app', // Update to your actual Vercel frontend
  },
});

let users = [];

const addUser = (userData, socketId) => {
  !users.some(user => user?._id === userData?._id) && users.push({ ...userData, socketId });
};

io.on('connection', (socket) => {
  console.log('Connected:', socket.id);

  socket.on('addUsers', (userData) => {
    addUser(userData, socket.id);
    console.log('Users:', users);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', (data) => {
    const user = users.find((user) => user._id === data.receiverId);
    console.log('User:', user);
    console.log('Data:', data);
    io.emit('getMessage', data);
  });
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = io;
