import "./App.css";
import React, { useState } from "react";
import RESTConstans from "./utiels/constans/RESTConstans";
import RegisterPage from "./pages/register/RegisterPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import { UserContext } from "./context/user/UserContext";
import CardShop from "./pages/shop/CardShop";
import CardCollection from "./pages/cardCollection/CardCollection";
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const [coins, setCoins] = useState(0);

  return (
    <Router>
      <UserContext.Provider value={{ token, setToken, user, setUser, coins, setCoins }}>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/main">
            <MainPage />
          </Route>
          <Route path="/cardShop">
            <CardShop></CardShop>
          </Route>
          <Route path="/cardCollection">
            <CardCollection></CardCollection>
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
