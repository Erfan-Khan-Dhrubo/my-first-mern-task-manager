import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Details = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  // useParams() gets the URL parameters from the current route.
  // Example:
  // Route → /user/:id
  // URL → /user/42
  // id → "42"

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`); // This sends a GET request to backend.
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]); // useEffect runs when id changes

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`); // Delete the note
      navigate("/"); // navigate to home page
    } catch (error) {
      console.log("Error deleting the note:", error);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      // Return if the field is empty
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await axios.put(`http://localhost:5001/api/notes/${id}`, note); // Update the note from the backend
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    // it shows a loading spinner while data is being fetched.
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <FiLoader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <NavLink to="/" className="btn btn-ghost">
              <FaLongArrowAltLeft className="h-5 w-5" />
              Back to Notes
            </NavLink>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <FaTrash className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  // { ...note } → spread syntax — it makes a copy of all properties in note.
                  // Whenever the user types in the input, take the current note object, make a copy of it,
                  // update only the title property with the input’s new value, and save that updated object back into state.”
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
