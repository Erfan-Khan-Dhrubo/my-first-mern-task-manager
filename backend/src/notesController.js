import Note from "./models/Note.js";

// req: The request object from the client.
// res: The response object to send data back to the client.
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 means newest notes come first (most recent date).
    // Note.find(): Uses Mongoose to fetch all documents (notes) from the MongoDB collection associated with the Note model.

    res.status(200).json(notes);
    // res.status(200) sends an HTTP status code 200 OK.
    // .json(notes) sends the notes array as a JSON response to the client.

    // Example Response to the client:
    // [
    //   {
    //     "_id": "64f9ab12dcdcab1234...",
    //     "title": "Shopping List",
    //     "content": "Milk, Eggs",
    //     "createdAt": "2025-08-05T18:23:14Z"
    //   },
    //   {
    //     "_id": "64f9aa01dcdcaa1234...",
    //     "title": "Workout Plan",
    //     "content": "Run 5km",
    //     "createdAt": "2025-08-04T11:12:45Z"
    //   }
    // ]
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "internal server error" });
    // Sends a 500 Internal Server Error response to the client, indicating that something went wrong on the server.
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    //  Note.findById(...) is a Mongoose method that fetches one note document by its _id field (which MongoDB gives automatically).
    // req.params.id gets the id from the URL route parameter.
    // For example, if the route is /api/notes/64f9aa01dcdcaa1234..., then req.params.id will be 64f9aa01dcdcaa1234....

    if (!note) return res.status(404).json({ message: "Note not found" });
    //  This checks if no note was found with that ID.
    //  If not found, it sends a 404 Not Found response with a message.

    res.status(200).json(note);
  } catch (error) {
    console.error("error in getNoteById controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    // Destructure 'title' and 'content' from the request body
    // Example: if req.body = { title: "Study", content: "Learn MERN" }
    // then title = "Study", content = "Learn MERN"
    const { title, content } = req.body;

    // Create a new Note instance using the Note model
    // This creates a MongoDB document (not saved yet)
    const note = new Note({ title, content });

    // Save the new note to the MongoDB database
    // This returns the saved document with _id and timestamps
    const saveNote = await note.save();

    // Respond to the client with a 201 status (Created)
    // and return the saved note data as JSON
    res.status(201).json(saveNote);
  } catch (error) {
    console.error("error in createNotes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    // Extract title and content from the request body
    // Example: { title: "New Title", content: "Updated content" }
    const { title, content } = req.body;

    // Find the note by ID and update its title and content
    // - req.params.id = the ID from the URL (e.g., /api/notes/:id)
    // - { title, content } = the new data to update
    // - { new: true } = return the updated document (not the old one)
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    // If no note was found with that ID, return 404 (Not Found)
    if (!updateNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("error in updateNotes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    // Find the note by ID and delete it from the database
    // req.params.id gets the note's ID from the URL parameter
    const deleteNote = await Note.findByIdAndDelete(req.params.id);

    // If no note is found with the given ID, respond with 404 Not Found
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("error in deleteNotes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}
