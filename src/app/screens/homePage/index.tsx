import React from "react";
import MainNav from "../../components/header/MainNav";
import MainBanner from "./MainBanner";

import "../../../css/home.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <MainNav />
      <MainBanner />
    </div>
  );
};

export default HomePage;
