import "./App.css";
import React, { useState } from "react";
import RESTConstans from "./utiels/constans/RESTConstans";
import RegisterPage from "./pages/register/RegisterPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import { UserContext } from "./context/user/UserContext";
import CardShop from "./pages/shop/CardShop";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{ token, setToken }}>
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
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
