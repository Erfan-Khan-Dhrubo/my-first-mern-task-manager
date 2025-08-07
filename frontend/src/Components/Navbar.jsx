import React from "react";
import { GoPlus } from "react-icons/go";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-16 py-4 bg-amber-950">
      <p className="font-semibold text-2xl">ThinkBoard</p>
      <NavLink className="py-2 px-4 rounded-lg border-2 btn" to="/create">
        <GoPlus size={20} /> Create Note
      </NavLink>
    </div>
  );
};

export default Navbar;
