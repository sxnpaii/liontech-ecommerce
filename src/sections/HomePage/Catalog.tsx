import Product from "../../components/UI/Product";
import sass from "../../assets/styles/sections/HomePage/Catalog.module.scss";
import { useContext } from "react";
import { HomePageContext } from "../../contexts/HomePageContext";
import { useTranslation } from "react-i18next";

const Catalog = () => {
  const Products = useContext(HomePageContext);
  const { t } = useTranslation();
  return (
    <section className={sass.Catalog}>
      <h4 className={sass.CatalogTitle}>{t("home_page.our_products")}</h4>
      <div className={sass.Wrapper}>
        {Products.length !== 0 ? (
          Products.map((doc) => <Product product={doc} key={doc.slug} />)
        ) : (
          <h6>Данные загружаются...</h6>
        )}
      </div>
    </section>
  );
};

export default Catalog;
