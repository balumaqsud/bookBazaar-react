import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import OrderPage from "./screens/orderPage";
import UserPage from "./screens/userPage";
import ProductsPage from "./screens/productPage";
import HelpPage from "./screens/helpPage";
import HomePage from "./screens/homePage";
import "../css/app.css";
import MainNav from "./components/header/MainNav";
import MemberService from "./services/MemberService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../libs/sweetAlerts";
import { Messages } from "../libs/config";
import { useGlobals } from "./hooks/useGlobals";
import useBasket from "./hooks/useBasket";
import Footer from "./components/footer";
import AuthenticationModal from "./components/auth";
import "../css/header.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cardItems, onAdd, onDelete, onRemove, onDeleteAll } = useBasket();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEL] = useState<HTMLElement | null>(null);

  //handlers
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEL(e.currentTarget);
  };
  const handleCloseLogout = () => {
    setAnchorEL(null);
  };
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (error) {
      console.log(error);
      sweetErrorHandling(Messages.error1).then();
    }
  };
  return (
    <>
      <MainNav
        cardItems={cardItems}
        onAdd={onAdd}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        setLoginOpen={setLoginOpen}
        setSignupOpen={setSignupOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />

      <Switch>
        <Route path="/orders">
          <OrderPage />
        </Route>
        <Route path="/users">
          <UserPage />
        </Route>
        <Route path="/books">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        loginOpen={loginOpen}
        signupOpen={signupOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}
export default App;
