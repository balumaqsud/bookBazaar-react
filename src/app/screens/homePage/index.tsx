import React from "react";
import MainNav from "../../components/header/MainNav";
import MainBanner from "./MainBanner";

import "../../../css/home.css";
import Brands from "./Brands";

const HomePage = () => {
  return (
    <div className="homepage">
      <MainNav />
      <MainBanner />
      <Brands />
    </div>
  );
};

export default HomePage;
