import MainBanner from "./MainBanner";
import "../../../css/home.css";
import Brands from "./Brands";
import BestSeller from "./BestSeller";
import Statistics from "./Statistics";
import LatestBooks from "./LatestBooks";
import FeaturedBook from "./FeaturedBook";
import Advertisement from "./advertisement";

import TopUsers from "./top-user";

const HomePage = () => {
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
