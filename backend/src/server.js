import express from "express";
import notesRoutes from "./notesRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"; // http → Native Node.js HTTP module — needed because Socket.IO works with an HTTP server, not directly with Express.
import { Server } from "socket.io"; // The Socket.IO server constructor.

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Notes API routes
app.use("/api/notes", notesRoutes);

// Normally, in an Express-only app, you’d start your server like this:
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// But Socket.IO doesn’t attach directly to the Express app object —
// it needs to attach to an actual HTTP server (from Node’s http module).
const server = http.createServer(app);
// http.createServer(app) takes your Express app and wraps it in Node’s native HTTP server.
// Think of it like:
//    Express handles routes (GET /api/notes)
//    HTTP server handles network-level requests (TCP connections, HTTP protocol).
//    This HTTP server will now be the "host" for both:
//    Express routes
//    Socket.IO real-time connections

const io = new Server(server, {
  //new Server(server) → Creates a Socket.IO instance that’s attached to the same HTTP server as your Express routes. This means your REST API and Socket.IO are running on the same port.
  cors: {
    origin: "http://localhost:5173", // Only allow connections from your React frontend.
    methods: ["GET", "POST"], // Allow only these HTTP methods during the Socket.IO handshake phase
  },
});

// Socket.IO events
// Socket.IO events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Sender requests connection
  socket.on("request_connection", ({ room }) => {
    socket.to(room).emit("request_connection");
  });

  // Receiver accepts
  socket.on("accept_connection", ({ room }) => {
    socket.to(room).emit("accept_connection");
  });

  // Receiver rejects
  socket.on("reject_connection", ({ room }) => {
    socket.to(room).emit("reject_connection");
  });

  // Messaging after connection accepted
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("send_message", data);
  });

  // Location sharing events
  socket.on("share_location", ({ room, location }) => {
    socket.to(room).emit("receive_location", location);
  });

  socket.on("stop_location_sharing", ({ room }) => {
    socket.to(room).emit("location_sharing_stopped");
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Start DB + server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
