import "./App.css";
import React, { useState } from "react";
import RegisterPage from "./components/register/RegisterPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import MainPage from "./components/main/MainPage";
import { UserContext } from "./context/user/UserContext";
import CardShop from "./components/shop/CardShop";
import CardCollection from "./components/cardCollection/CardCollection";
import Navbar from "./components/navbar/Navbar";
import Cards from "./components/cards/Cards";
import CardDetails from "./components/cards/CardDetails";
import { CardContext } from "./context/user/CardContext";
import ChangePassword from "./components/changePassword/ChangePassword";
import Profile from "./components/profile/Profile";
import Colors from "./themes/Colors";

function App() {
  const [userCreds, setUserCreds] = useState({
    username: "",
    token: null,
    coins: 0,
  });
  const [cardID, setCardID] = useState("");

  const isLoggedIn = () => (userCreds.token != null ? <Navbar /> : "");

  return (
    <div
      style={{
        backgroundColor: Colors.background,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
      }}
    >
      <Router>
        <UserContext.Provider value={{ userCreds, setUserCreds }}>
          {isLoggedIn()}

          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/changePassword">
              <ChangePassword />
            </Route>
            <Route path="/main">
              <MainPage />
            </Route>
            <CardContext.Provider value={{ cardID, setCardID }}>
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
            </CardContext.Provider>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
