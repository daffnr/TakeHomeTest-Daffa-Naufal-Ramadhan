import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import DrugDetailPage from "./pages/drugDetailPage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkOutPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/home" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/drug/:id" Component={DrugDetailPage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/checkout" Component={CheckoutPage} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
