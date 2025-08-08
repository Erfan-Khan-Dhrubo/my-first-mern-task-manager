import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../Components/NoteCard";
import NotesNotFound from "../Components/NotesNotFound";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    //  useEffect is a React hook used to run side effects like fetching data from an API.
    // [] means it will run only once when the component first loads (like componentDidMount in class components).
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        // This sends an HTTP GET request to your backend: http://localhost:5001/api/notes
        // axios.get() returns a promise with the response.
        // await waits for the promise to resolve before moving to the next line.
        // console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("error fetching notes");
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col justify mt-16">
      {notes.length > 0 ? (
        <div className="grid grid-cols-3  gap-8 p-12">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}></NoteCard>
          ))}
        </div>
      ) : (
        <NotesNotFound></NotesNotFound>
      )}
    </div>
  );
};

export default Home;
