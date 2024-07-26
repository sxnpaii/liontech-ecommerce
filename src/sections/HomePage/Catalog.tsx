import Product from "../../components/UI/Product";
import sass from "../../assets/styles/sections/HomePage/Catalog.module.scss";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import Loading from "../../components/UI/Loading";

const Catalog = () => {
  const Products = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <section className={sass.Catalog}>
      <h4 className={sass.CatalogTitle}>{t("home_page.our_products")}</h4>
      <div className={sass.Wrapper}>
        {Products.length !== 0 ? (
          Products.map((doc) => <Product product={doc} key={doc.slug} />)
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default Catalog;
