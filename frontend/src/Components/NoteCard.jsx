import { DataFunc } from "../Utilities/DateFunc";
import { FaTrashAlt } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";
import { NavLink } from "react-router";
import axios from "axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevents the default behavior of the event — like if the button is inside a form, it will stop the page from reloading.

    if (!window.confirm("Are you sure you want to delete this note?")) return;
    // Shows a popup asking for user confirmation.
    // If the user clicks Cancel, the function exits early.

    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      // Makes an HTTP DELETE request to your backend to delete the note with the given id.

      setNotes((prev) => prev.filter((note) => note._id !== id));
      // This line removes the deleted note from the UI immediately, without needing to re-fetch all notes from the server.
    } catch (error) {
      console.log("error in handleDelete", error);
    }
  };
  const { _id, title, content, createdAt } = note;
  return (
    <NavLink to={`/details/${_id}`}>
      <div className="p-6 bg-customBlack rounded-lg border border-amber-400">
        <div className="text-lg mb-2">{title}</div>
        <div>{content}</div>
        <div className="flex justify-between items-center mt-4">
          <div>{DataFunc(new Date(createdAt))}</div>
          <div className="flex  gap-2">
            <NavLink to={`/details/${_id}`} className="p-2 hover:bg-lightBlack">
              <FaPenSquare />
            </NavLink>
            <button
              className="hover:bg-lightBlack p-2"
              onClick={(e) => handleDelete(e, _id)} // passing the id
            >
              <FaTrashAlt color="red" />
            </button>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default NoteCard;
