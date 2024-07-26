import { Link, unstable_useViewTransitionState } from "react-router-dom";
import sass from "../../assets/styles/components/Product.module.scss";
import { Laptop } from "../../types/records";
import { PriceFormatter } from "../../utils/utils";
import { useContext } from "react";
import { ProcessesContext } from "../../contexts/ProcessesContext";
import { useTranslation } from "react-i18next";

const Product = ({
  product,
  isAdmin,
  actions,
}: {
  product: Laptop;
  isAdmin?: boolean;
  actions?: {
    Delete?: (id?: string, images?: Laptop["images"]) => Promise<void>;
    Edit?: () => Promise<void>;
  };
}) => {
  const to = `products/${product.slug}`;
  const isTransitioning = unstable_useViewTransitionState(to);
  const { modal } = useContext(ProcessesContext);
  const { t } = useTranslation();

  const HandleDelete = () => {
    return (
      actions?.Delete && isAdmin && actions.Delete(product.id, product.images)
    );
  };
  return (
    <div className={sass.Product}>
      <Link to={!isAdmin ? to : "#"} unstable_viewTransition>
        <img
          src={product.images.primary.img_url}
          alt={product.images.primary.metadata.alt}
          style={{
            viewTransitionName: isTransitioning ? product.slug : "",
          }}
        />
      </Link>
      <h4 className={sass.Price}>{PriceFormatter(product.price)}</h4>
      <p className={sass.Title}>{product.title}</p>
      <ul className={sass.CharsList}>
        <li className={sass.Chars}>{product.character.memory}</li>
        <li className={sass.Chars}>{product.character.storage}</li>
        <li className={sass.Chars}>{product.character.cpu}</li>
      </ul>
      {isAdmin ? (
        <div className={sass.EditActions}>
          <a className={sass.Edit} onClick={() => modal.mutateModal(true)}>
            {t("product_comp.edit")}
          </a>
          <a className={sass.Delete} onClick={HandleDelete}>
            {t("product_comp.delete")}
          </a>
        </div>
      ) : (
        <Link className={sass.More} to={to}>
          {t("product_comp.more")}
        </Link>
      )}
    </div>
  );
};

export default Product;
