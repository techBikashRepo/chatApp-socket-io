import express from "express";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

const io = new Server(server);

let onlineUsers = 0;
io.on("connection", (socket) => {
  console.log("Socket connection established: ", socket.id);
  onlineUsers++;

  socket.on("sendMessage", (msg, callback) => {
    io.emit("broadcastMessage", msg);
    callback("Message has been delievered");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
    onlineUsers--;
  });
});
