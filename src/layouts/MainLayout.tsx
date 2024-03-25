import { Outlet } from "react-router-dom";
import { HomePageContext } from "../contexts/HomePageContext";
import { useState, useEffect } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { Laptop } from "../types/records";
import { db } from "../firebase/firebase";
// components
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
// styles
import sass from "../assets/styles/layouts/User.module.scss";

const MainLayout = () => {
  const [Products, setProducts] = useState<Laptop[]>([]);
  useEffect(() => {
    (async () => {
      const docSnap = await getDocs(collection(db, "Products"));
      const temp: Laptop[] = [];
      docSnap.forEach((doc: DocumentData) => temp.push(doc.data()));
      setProducts(temp);
    })();
  }, []);

  return (
    <HomePageContext.Provider value={Products}>
      <main className={sass.UserLayout}>
        <Header />
        <section className={sass.Mutable}>
          <Outlet />
        </section> 
        <Footer />
      </main>
    </HomePageContext.Provider>
  );
};

export default MainLayout;
