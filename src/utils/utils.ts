import format from "number-format.js";
const SlugMaker = (leter: string): string => {
  if (leter) {
    return leter
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  return "";
};

const PriceFormatter = (price: number): string =>
  format("### ###, so'm", price);

export { SlugMaker, PriceFormatter };
