import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../libs/types/screen";

const initialState: HomePageState = {
  bestSellers: [],
  latestBooks: [],
  topUsers: [],
  featuredBook: [],
  randomBook: [],
};

const homepageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBestSellers: (state, action) => {
      state.bestSellers = action.payload;
    },
    setLatestBooks: (state, action) => {
      state.latestBooks = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
    setFeaturedBook: (state, action) => {
      state.featuredBook = action.payload;
    },
    setRandomBook: (state, action) => {
      state.randomBook = action.payload;
    },
  },
});

export const {
  setBestSellers,
  setLatestBooks,
  setTopUsers,
  setFeaturedBook,
  setRandomBook,
} = homepageSlice.actions;

const HomePageReducer = homepageSlice.reducer;
export default HomePageReducer;
