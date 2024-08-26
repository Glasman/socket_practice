import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//   io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });


// io.on("connection", (socket) => {
//   console.log("a user connected");

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

//   // Handle chat messages
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
