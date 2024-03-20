import User from "../layouts/User";
import Home from "../pages/Home";
import Contacts from "../pages/Contacts";
import OneProduct from "../pages/products/OneProduct";

export const publicRoutes = [
  {
    path: "/",
    element: <User />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "products/:slug", 
        element: <OneProduct/>
      }
    ],
  },
];
