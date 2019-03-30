const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Filter = require("bad-words");

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New WebSocket connection");

  //emit to recently connected client
  socket.emit("message", "Welcome");

  //emit event to all connected client other than recently connected client
  socket.broadcast.emit("message", "A new user joined");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    //emit to all connected clients
    io.emit("message", message);

    //ensures the client sending mesage has delivered the message
    callback("delivered");
  });

  //Alert: disconnect has not be emitted from client end by writing code.it is automatically emitted when the client closes
  socket.on("disconnect", () => {
    io.emit("message", "user has left");
  });

  //send location to all the clients
  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
