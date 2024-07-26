import { Outlet } from "react-router-dom";
import UserContextProvider from "../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { Laptop } from "../types/records";
import { db } from "../firebase/firebase";
// components
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
// styles
import sass from "../assets/styles/layouts/User.module.scss";
import ProcessesContextProvider, {
  ProcessesContext,
} from "../contexts/ProcessesContext";
import Loading from "../components/UI/Loading";

const MainLayout = () => {
  const [Products, setProducts] = useState<Laptop[]>([]);
  const { loading } = useContext(ProcessesContext);
  useEffect(() => {
    (async () => {
      loading.mutateLoading(true);
      const docSnap = await getDocs(collection(db, "Products"));
      const temp: Laptop[] = [];
      docSnap.forEach((doc: DocumentData) =>
        temp.push({ id: doc.id, ...doc.data() })
      );
      setProducts(temp);
      loading.mutateLoading(false);
    })();
  }, [loading]);

  return (
    <UserContextProvider value={Products}>
      <ProcessesContextProvider>
        <main className={sass.UserLayout}>
          <Header />
          <section className={sass.Mutable}>
            <Outlet />
          </section>
          <Footer />
        </main>
        <Loading />
      </ProcessesContextProvider>
    </UserContextProvider>
  );
};

export default MainLayout;
