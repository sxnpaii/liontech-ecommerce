import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Remarkable } from "remarkable";

import { Laptop } from "../../types/records";
import { UserContext } from "../../contexts/UserContext";
import { PriceFormatter } from "../../utils/utils";
import { DummyLaptop } from "../../utils/DummyData";
import ProductImages from "../../components/UI/ProductImages";

import { useTranslation } from "react-i18next";
import tgIcon from "../../assets/images/telegram.svg";
import sass from "../../assets/styles/pages/OneProduct.module.scss";
import { ProcessesContext } from "../../contexts/ProcessesContext";
import Loading from "../../components/UI/Loading";
import { styles } from "../../assets/styles/Basics";
const OneProduct = () => {
  const [oneProduct, setOneProduct] = useState<Laptop>(DummyLaptop);
  const { slug } = useParams();
  const OneProduct = useContext(UserContext);
  const { loading } = useContext(ProcessesContext);
  useEffect(() => {
    (async () => {
      try {
        loading.mutateLoading(true);
        OneProduct.forEach((laptop: Laptop) => {
          if (laptop.slug === slug) {
            setOneProduct(laptop);
            loading.mutateLoading(false);
          }
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [slug, OneProduct, loading]);
  // md renderer
  const md = new Remarkable({
    breaks: true,
    html: true,
  });
  // localization
  const { t } = useTranslation();
  return (
    <section className={sass.OneProduct}>
      {oneProduct ? (
        <div className={sass.Properties}>
          <ProductImages oneProdImgs={oneProduct.images} slug={slug} />
          <div className={sass.Props}>
            <h5 className={sass.Title}>{oneProduct.title}</h5>
            <b className={sass.Price}>{PriceFormatter(oneProduct.price)}</b>
            <div className={sass.Characters}>
              {Object.keys(oneProduct.character).map((name: string) => (
                <p className={sass.Char} key={name}>
                  {" "}
                  <span className={sass.CharTitle}>
                    {t(`one_product_page.character.${name}`)}:{" "}
                  </span>
                  {oneProduct.character[name]}
                </p>
              ))}
            </div>
            <button>
              <a
                href="https://t.me/+998881811177"
                target="_blank"
                className={sass.Ordered}
              >
                {t("one_product_page.contact_for_buy")}
                <img src={tgIcon} alt="" width={45} />
              </a>
            </button>
          </div>
        </div>
      ) : (
        <h1> Error</h1>
      )}
      <div className={sass.OtherProps}>
        <h3 className={sass.Text}>{t("one_product_page.others")}</h3>
        {/* md renderer */}
        <div
          className={sass.Others}
          dangerouslySetInnerHTML={{ __html: md.render(oneProduct.others) }}
        />
        <style scoped>{styles}</style>
      </div>
      <Loading />
    </section>
  );
};

export default OneProduct;
