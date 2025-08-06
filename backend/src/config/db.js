import mongoose from "mongoose";
// This imports the Mongoose library.
// Mongoose is a tool that helps you:
// Connect to MongoDB
// Define schemas and models (like your Note model)
// Interact with the database easily (using .find(), .save(), etc.)
// Without Mongoose, you’d have to write a lot of raw MongoDB queries manually.

// The 'async' keyword allows us to use 'await' inside this function
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // This is the main line that connects to MongoDB.
    // The 'async' keyword allows us to use 'await' inside this function

    console.log("mongobd successfully connected!!");
  } catch (error) {
    console.log("error connecting mongodb", error);
    process.exit(1);
    // If there is a connection error, this line stops your server from running.
    // 1 means the program exited with an error.
    // This is useful because your app shouldn't keep running without a database connection.
  }
};
