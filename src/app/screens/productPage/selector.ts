import { createSelector } from "reselect";
import { AppRootState } from "../../../libs/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveAdmin = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.admin
);
export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.chosenProduct
);
export const retrieveProducts = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.products
);
