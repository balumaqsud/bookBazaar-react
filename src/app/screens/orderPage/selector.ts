import { createSelector } from "reselect";
import { AppRootState } from "../../../libs/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  selectOrdersPage,
  (orderPage) => orderPage.pausedOrders
);
export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (orderPage) => orderPage.processOrders
);
export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (orderPage) => orderPage.finishedOrders
);
