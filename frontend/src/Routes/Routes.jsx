import React from "react";

import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root";
import ErrorPage from "./../Pages/ErrorPage";
import Details from "./../Pages/Details";
import CreatePage from "./../Pages/CreatePage";
import Home from "../Pages/Home";
import SendMsg from "../Components/socket/SendMsg";
import Receive from "../Components/socket/Receive";

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
        path: "/details/:id",
        Component: Details,
      },
      {
        path: "/create",
        Component: CreatePage,
      },
      {
        path: "/send",
        Component: SendMsg,
      },
      {
        path: "/receive",
        Component: Receive,
      },
    ],
  },
]);
