import { Server } from 'socket.io';

let io;
let users = [];

// Function to add user to the users array
const addUser = (userData, socketId) => {
  if (!users.some(user => user._id === userData._id)) {
    users.push({ ...userData, socketId });
  }
};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      cors: {
        origin: 'https://biz-convo-pi.vercel.app',
      },
      transports: ['polling'], // Required due to Vercel's limitations on WebSockets
    });

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      // Add user to users array
      socket.on('addUsers', (userData) => {
        addUser(userData, socket.id);
        io.emit('getUsers', users); // Broadcast the users list
      });

      // Handle sending messages
      socket.on('sendMessage', (data) => {
        io.emit('getMessage', data); // Emit the message to all connected clients
      });

      // Handle user disconnection
      socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users); // Broadcast the updated users list
      });
    });

    res.socket.server.io = io; // Attach Socket.IO to the server
  }
  
  res.end(); // End the response to prevent hanging
}
