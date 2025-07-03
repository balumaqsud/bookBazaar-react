import { createSelector } from "reselect";
import { AppRootState } from "../../../libs/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveLatestBooks = createSelector(
  selectHomePage,
  (homePage) => homePage.latestBooks
);
export const retrieveBestSellers = createSelector(
  selectHomePage,
  (homePage) => homePage.bestSellers
);

export const retrieveRandomBook = createSelector(
  selectHomePage,
  (homePage) => homePage.randomBook
);

export const retrieveFeaturedBook = createSelector(
  selectHomePage,
  (homePage) => homePage.featuredBook
);
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (homePage) => homePage.topUsers
);
