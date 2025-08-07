import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="w-9/12 mx-auto min-h-screen border-2 mt-4 rounded-lg overflow-hidden">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
