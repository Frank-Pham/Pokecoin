import "./App.css";
import React, { useState } from "react";
import RegisterPage from "./pages/register/RegisterPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import { UserContext } from "./context/user/UserContext";
import CardShop from "./pages/shop/CardShop";
import CardCollection from "./pages/cardCollection/CardCollection";
import Navbar from "./pages/navbar/Navbar";
import Cards from "./pages/cards/Cards";
import CardDetails from "./pages/cards/CardDetails";

function App() {
  const [userCreds, setUserCreds] = useState({
    username: "",
    token: null,
    coins: 0,
  });

  const isLoggedIn = () => (userCreds.token != null ? <Navbar /> : "");

  return (
    <Router>
      <UserContext.Provider value={{ userCreds, setUserCreds }}>
        {isLoggedIn()}

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
          <Route path="/cards">
            <Cards></Cards>
          </Route>
          <Route path="/cardDetail/:cardId">
            <CardDetails>halloooo</CardDetails>
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
