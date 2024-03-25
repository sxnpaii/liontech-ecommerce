import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Remarkable } from "remarkable";

import { Laptop } from "../../types/records";
import { HomePageContext } from "../../contexts/HomePageContext";
import { PriceFormatter } from "../../utils/utils";
import { DummyLaptop } from "../../utils/DummyData";
import ProductImages from "../../components/UI/ProductImages";

import tgIcon from "../../assets/images/telegram.svg";
import sass from "../../assets/styles/pages/OneProduct.module.scss";

const OneProduct = () => {
  const [oneProduct, setOneProduct] = useState<Laptop>(DummyLaptop);
  const { slug } = useParams();
  const OneProduct = useContext(HomePageContext);
  useEffect(() => {
    (() => {
      OneProduct.forEach((laptop: Laptop) => {
        if (laptop.slug === slug) {
          setOneProduct(laptop);
        }
      });
    })();
  }, [slug, OneProduct]);
  // md renderer
  const md = new Remarkable({
    breaks: true,
    html: true,
  });
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
                <p className={sass.Char}>
                  {" "}
                  <span className={sass.CharTitle}>{name.toUpperCase()}: </span>
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
                Sotib olish uchun
                <img src={tgIcon} alt="" width={45} />
              </a>
            </button>
          </div>
        </div>
      ) : (
        <h1> Error</h1>
      )}
      <div className={sass.OtherProps}>
        <h3 className={sass.Text}>Boshqa Ma'lumotlar</h3>
        {/* md renderer */}
        <div
          className={sass.Others}
          dangerouslySetInnerHTML={{ __html: md.render(oneProduct.others) }}
        />
      </div>
    </section>
  );
};

export default OneProduct;
