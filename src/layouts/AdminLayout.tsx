import { Outlet } from "react-router-dom";
import sass from "../assets/styles/layouts/Admin.module.scss";
const AdminLayout = () => {
  return (
    <main className={sass.AdminLayout}>
      <Outlet />
    </main>
  );
};

export default AdminLayout;
