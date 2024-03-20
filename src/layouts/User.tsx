import { Outlet } from "react-router-dom";
import { HomePageContext } from "../contexts/HomePageContext";
import { useState, useEffect } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { Laptop } from "../types/records";
import { db } from "../firebase/firebase";
// components
import Header from "../components/Header";
import Footer from "../components/Footer";
// styles
import sass from "../assets/styles/layouts/User.module.scss";

const User = () => {
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

export default User;
