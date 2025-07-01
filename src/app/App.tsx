import React from "react";
import { Switch, Route } from "react-router-dom";
import OrderPage from "./screens/orderPage";
import UserPage from "./screens/userPage";
import ProductPage from "./screens/productPage";
import HelpPage from "./screens/helpPage";
import HomePage from "./screens/homePage";
import "../css/app.css";

function App() {
  return (
    <>
      <Switch>
        <Route path="/orders">
          <OrderPage />
        </Route>
        <Route path="/users">
          <UserPage />
        </Route>
        <Route path="/products">
          <ProductPage />
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
    </>
  );
}
export default App;
