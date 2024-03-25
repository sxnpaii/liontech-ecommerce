import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import OneProduct from "./pages/products/OneProduct";
import AdminLayout from "./layouts/AdminLayout";
import AdminPage from "./pages/AdminPanel/AdminPage";
// import Login from "./pages/Login";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
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
        element: <OneProduct />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <AdminPage />,
      },
    ],
  },
];
