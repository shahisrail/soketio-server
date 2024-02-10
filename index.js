// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to parse JSON bodies
app.use(express.json());

// Define route to handle messages from users
app.post('/send-message', (req, res) => {
  const message = req.body.message;
  io.emit('message', message); // Broadcast message to all connected clients
  res.sendStatus(200);
});

// server.js
io.on("connection", (socket) => {
    console.log("New client connected");
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  
    socket.on("send-message", (message) => {
      console.log("Received message:", message);
      io.emit("message", message); // Broadcast message to all connected clients
    });
  });
  
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
