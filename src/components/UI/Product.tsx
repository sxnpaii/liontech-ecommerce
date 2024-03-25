import { Link, unstable_useViewTransitionState } from "react-router-dom";
import sass from "../../assets/styles/components/Product.module.scss";
import { Laptop } from "../../types/records";
import { PriceFormatter } from "../../utils/utils";

const Product = ({ product }: { product: Laptop }) => {
  const to = `products/${product.slug}`;
  const isTransitioning = unstable_useViewTransitionState(to);

  return (
    <Link className={sass.Product} to={to} unstable_viewTransition>
      <div className="Image">
        <img src={product.images.primary.img_url} alt={product.images.primary.metadata.alt} style={{
          viewTransitionName: isTransitioning ? product.slug : ""
        }} />
      </div>
      <h4 className={sass.Price}>{PriceFormatter(product.price)}</h4>
      <p className={sass.Title}>{product.title}</p>
      <ul className={sass.CharsList}>
        <li className={sass.Chars}>{product.character.memory}</li>
        <li className={sass.Chars}>{product.character.storage}</li>
        <li className={sass.Chars}>{product.character.cpu}</li>
      </ul>
    </Link>
  );
};

export default Product;
