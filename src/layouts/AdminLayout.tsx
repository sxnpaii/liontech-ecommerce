import { Outlet, useNavigate, useParams } from "react-router-dom";
import sass from "../assets/styles/layouts/Admin.module.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../components/UI/Header";
import ProcessesContextProvider from "../contexts/ProcessesContext";
import UserContextProvider from "../contexts/UserContext";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Laptop } from "../types/records";
const AdminLayout = () => {
  const [cookies] = useCookies(["authToken"]);
  const navigation = useNavigate();
  const { authToken } = useParams();
  const [Products, setProducts] = useState<Laptop[]>([]);
  useEffect(() => {
    if (cookies.authToken === authToken) {
      navigation(`/dashboard/${authToken}`);
    } else {
      navigation("/");
    }
    (async () => {
      const docSnap = await getDocs(collection(db, "Products"));
      const temp: Laptop[] = [];
      docSnap.forEach((doc: DocumentData) =>
        temp.push({ ...doc.data(), id: doc.id })
      );
      setProducts(temp);
    })();
  }, [cookies, authToken, navigation]);

  return (
    <UserContextProvider value={Products}>
      <ProcessesContextProvider>
        <main className={sass.AdminLayout}>
          <Header isAdmin slug={authToken} />
          <div className={sass.Space} />
          <Outlet />
        </main>
      </ProcessesContextProvider>
    </UserContextProvider>
  );
};

export default AdminLayout;
