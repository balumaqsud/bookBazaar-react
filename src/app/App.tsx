import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderPage from "./screens/orderPage";
import UserPage from "./screens/userPage";
import ProductPage from "./screens/productPage";
import HelpPage from "./screens/helpPage";
import HomePage from "./screens/homePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/order" element={<OrderPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}
export default App;
