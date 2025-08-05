import React from "react";

import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root";
import ErrorPage from "./../Pages/ErrorPage";
import Details from "./../Pages/Details";
import CreatePage from "./../Pages/CreatePage";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: ErrorPage,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/details",
        Component: Details,
      },
      {
        path: "/create",
        Component: CreatePage,
      },
    ],
  },
]);
