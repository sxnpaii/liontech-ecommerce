import Product from "../../components/Product";
import sass from "../../assets/styles/sections/HomePage/Catalog.module.scss";
import { useContext } from "react";
import { HomePageContext } from "../../contexts/HomePageContext";

const Catalog = () => {
  const Products = useContext(HomePageContext);
  return (
    <section className={sass.Catalog}>
      <h4 className={sass.CatalogTitle}>Bizning maxsulotlar</h4>
      <div className={sass.Wrapper}>
        {Products.length !== 0 ? (
          Products.map((doc) => <Product product={doc} key={doc.slug} />)
        ) : (
          <h1>Not found</h1>
        )}
        
      </div>
    </section>
  );
};

export default Catalog;
