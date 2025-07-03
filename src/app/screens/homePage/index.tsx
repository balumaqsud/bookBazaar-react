import MainBanner from "./MainBanner";
import "../../../css/home.css";
import Brands from "./Brands";
import BestSeller from "./BestSeller";
import Statistics from "./Statistics";
import LatestBooks from "./LatestBooks";
import FeaturedBook from "./FeaturedBook";
import Advertisement from "./advertisement";
import TopUsers from "./top-user";
import { Product } from "../../../libs/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setBestSellers,
  setLatestBooks,
  setTopUsers,
  setFeaturedBook,
  setRandomBook,
} from "./slice";
import { Member } from "../../../libs/types/member";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import MemberService from "../../services/MemberService";
import ProductService from "../../services/ProductService";

//REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBestSellers: (data: Product[]) => dispatch(setBestSellers(data)),
  setLatestBooks: (data: Product[]) => dispatch(setLatestBooks(data)),
  setFeaturedBook: (data: Product[]) => dispatch(setFeaturedBook(data)),
  setRandomBook: (data: Product[]) => dispatch(setRandomBook(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

const HomePage = () => {
  const {
    setBestSellers,
    setLatestBooks,
    setTopUsers,
    setFeaturedBook,
    setRandomBook,
  } = actionDispatch(useDispatch());

  useEffect(() => {
    const products = new ProductService();
    const members = new MemberService();
    //Backend server data request = Data
    //Slice: Data => Store
    products
      .getProducts({
        page: 1,
        limit: 4,
        order: "productView",
      })
      .then((data) => {
        setBestSellers(data);
      })
      .catch((err) => console.log(err));

    //for new dishes
    products
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        console.log("came here:", data);
        setLatestBooks(data);
      })
      .catch((err) => console.log(err));

    //random
    products
      .getProducts({
        page: 3,
        limit: 1,
        order: "productLeftCount",
      })
      .then((data) => {
        console.log("came here:", data);
        setRandomBook(data);
      })
      .catch((err) => console.log(err));

    products
      .getProducts({
        page: 3,
        limit: 1,
        order: "productLeftCount",
      })
      .then((data) => {
        console.log("came here:", data);
        setFeaturedBook(data);
      })
      .catch((err) => console.log(err));

    //active users
    members
      .getTopUsers()
      .then((data) => {
        console.log("top users", data);
        setTopUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="homepage">
      <MainBanner />
      <Brands />
      <BestSeller />
      <Advertisement />
      <FeaturedBook />
      <LatestBooks />
      <Statistics />
      <TopUsers />
    </div>
  );
};

export default HomePage;
