import Commerce from "@chec/commerce.js";

const { REACT_APP_CHEC_PUBLIC_KEY } = process.env;

export const commerce = new Commerce(
    REACT_APP_CHEC_PUBLIC_KEY,
  true
);