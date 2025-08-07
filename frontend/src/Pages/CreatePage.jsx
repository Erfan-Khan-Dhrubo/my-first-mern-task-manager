import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaLongArrowAltLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // This line uses the useNavigate hook from React Router to create a function (navigate) that lets you programmatically change the route
  // Once you call useNavigate(), you can use navigate() like this:
  // navigate("/"); => redirects to home page || navigate("/about"); => redirects to the "about" page

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default behavior of the browser

    if (!title.trim() || !content.trim()) {
      // check if the tittle and content is empty or not
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });
      // This is sending a POST request to the backend http://localhost:5001/api/notes
      // It uses an Axios instance named api (created using axios.create()).
      // The request body includes two fields:
      // title: value from the form (likely from useState)
      // content: value from the form
      // This line communicates with the backend to create a new note.

      navigate("/"); // After successfully creating the note, this line navigates the user to the homepage (usually where all notes are shown).
    } catch (error) {
      console.log("Error creating note", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <NavLink to={"/"} className="btn btn-ghost mb-6">
            <FaLongArrowAltLeft />
            Back to Notes
          </NavLink>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Every time the user types, it updates the title state.
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Every time the user types, it updates the title state.
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CreatePage;
