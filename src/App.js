import "./App.css";
import RESTConstans from "./utiels/constans/RESTConstans";
import RegisterPage from "./pages/register/RegisterPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <Router>
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
      </Switch>
    </Router>
  );
}

export default App;
