import express from "express"; // This imports the Express framework.
import notesRoutes from "./notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"; // This lets your app read environment variables from a .env file.

const app = express();
// This creates an Express app instance.
// Think of app like the central controller for your server.

const PORT = process.env.PORT || 5001; // It checks if there is a PORT in the environment (like from .env), or uses 5001 as a fallback.

dotenv.config(); // This actually loads the .env file, making process.env.MONGO_URL and others work.

// Middleware:
// Middleware in Express is a function that runs between receiving a request and sending a response.

// It can:
// => Modify the request (req)
// => Modify the response (res)
// => End the request/response cycle
// => Or pass control to the next middleware

// 📦 Think of it like this:
// Imagine a restaurant kitchen:
// A customer (client) gives an order (request).
// The waiter (middleware) checks the order, maybe adds something, or validates it.
// Then the order goes to the chef (final route handler) to prepare the food (response).
// Middleware can be many layers of waiters, each doing something.

app.use(express.json());
// This middleware lets your server read JSON in the request body.
// Without this, you can't do req.body.title or req.body.content.

// Example:
// Sending JSON data like this:
//     {
//        "title": "My Note",
//        "content": "This is the content"
//     }
// Would be parsed and available in your backend like this:
// const { title, content } = req.body;

app.use("/api/notes", notesRoutes);
// This is where you tell Express to use your notes routes.
// Any request that starts with /api/notes will go to notesRoutes.js.

connectDB().then(() => {
  // app.listen() starts the server so it can listen for requests.
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
