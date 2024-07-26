import i18next from "../i18n";
import format from "number-format.js";
import { v4 } from "uuid";
const SlugMaker = (leter: string): string => {
  if (leter) {
    const str = leter
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    return `${str}--${v4()}`;
  }
  return "";
};

const PriceFormatter = (price: number): string =>
  format(`### ###, ${i18next.t("one_product_page.sum")}`, price);

export { SlugMaker, PriceFormatter };
