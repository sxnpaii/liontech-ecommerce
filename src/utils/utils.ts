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
  format("### ###, so'm", price);

export { SlugMaker, PriceFormatter };
