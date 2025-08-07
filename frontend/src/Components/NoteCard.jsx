import React from "react";
import { DataFunc } from "../Utilities/DateFunc";
import { FaTrashAlt } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";
import { NavLink } from "react-router";

const NoteCard = (Note) => {
  // console.log(Note.note);
  const { _id, title, content, createdAt } = Note.note;
  return (
    <NavLink to={`/details/${_id}`}>
      <div className="p-4 bg-customBlack rounded-lg border">
        <div className="text-lg mb-2">{title}</div>
        <div>{content}</div>
        <div className="flex justify-between items-center mt-4">
          <div>{DataFunc(new Date(createdAt))}</div>
          <div className="flex  gap-2">
            <div>
              <FaPenSquare />
            </div>
            <div>
              <FaTrashAlt color="red" />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default NoteCard;
