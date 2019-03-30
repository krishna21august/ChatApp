const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New WebSocket connection");

  //emit to recently connected client
  socket.emit("message", "Welcome");

  //emit event to all connected client other than recently connected client
  socket.broadcast.emit("message", "A new user joined");

  socket.on("sendMessage", message => {
    //emit to all connected clients
    io.emit("message", message);
  });

  //Alert: disconnect has not be emitted from client end by writing code.it is automatically emitted when the client closes
  socket.on("disconnect", () => {
    io.emit("message", "user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
