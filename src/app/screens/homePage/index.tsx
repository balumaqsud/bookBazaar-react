import React from "react";
import MainNav from "../../components/header/MainNav";
import MainBanner from "./MainBanner";
import "../../../css/home.css";
import Brands from "./Brands";
import BestSeller from "./BestSeller";
import Statistics from "./Statistics";
import LatestBooks from "./LatestBooks";
import FeaturedBook from "./FeaturedBook";
import Advertisement from "./advertisement";
import Footer from "../../components/footer";

const HomePage = () => {
  return (
    <div className="homepage">
      <MainNav />
      <MainBanner />
      <Brands />
      <BestSeller />
      <Advertisement />
      <LatestBooks />
      <FeaturedBook />
      <Statistics />
      <Footer />
    </div>
  );
};

export default HomePage;
