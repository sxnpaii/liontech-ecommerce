import { Outlet, useNavigate, useParams } from "react-router-dom";
import sass from "../assets/styles/layouts/Admin.module.scss";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "../components/UI/Header";
const AdminLayout = () => {
  const [cookies] = useCookies(["authToken"]);
  const navigation = useNavigate();
  const { authToken } = useParams();
  useEffect(() => {
    if (cookies.authToken !== authToken) {
      navigation("/");
    }
  }, [cookies, authToken, navigation]);
  return (
    <main className={sass.AdminLayout}>
      <Header />
      <Outlet />
    </main>
  );
};

export default AdminLayout;
