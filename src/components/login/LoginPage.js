import React, { useState, useContext } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  FilledInput,
  TextField,
  Link,
  FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import RESTConstans from "../../utils/constans/RESTConstans";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import useStyles from "./LoginPageStyles";
import { useCookies } from "react-cookie";
import CookieConstants from "../../utils/constans/CookieConstants";
import useRestCalls from "../../hooks/rest/useRestCalls";

export default function LoginPage() {
  const classes = useStyles();
  const { userCreds, setUserCreds } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const [error, setError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    CookieConstants.CREDENTIALS_STORE,
  ]);

  const { getCoins } = useRestCalls();

  const login = async () => {
    console.log(userName, password);
    const data = {
      username: userName,
      password: password,
      valid: "",
    };
    console.log(data);
    await axios
      .post(RESTConstans.DOMAIN + RESTConstans.LOGIN, {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        console.log(response.data);
        const token = response.data.token;
        setUserCreds({
          username: data.username,
          token: token,
          coins: getCoins(token).data,
        });
        console.log(data.username);
        console.log(userCreds);

        // save data to cookies
        setCookie(CookieConstants.USER_NAME, data.username);
        setCookie(CookieConstants.TOKEN, token);

        history.push("/main"); //hängt an aktuelle UL drann
      })
      .catch((error) =>
        setError("Loginname and/or password is wrong, please try again!")
      );
  };

  const handleClickRegisterLink = async () => {
    history.push("/register");
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <h1>Pokecoin-Login 🪙</h1>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.content}
      >
        <Grid container direction="column">
          <Grid
            container
            justify="center"
            className={classes.textFieldContainer}
          >
            <TextField
              id="forName"
              label="Username"
              variant="filled"
              onChange={(event) => setUserName(event.target.value)}
              className={classes.textField}
            />
          </Grid>
          <Grid
            container
            justify="center"
            className={classes.textFieldContainer}
          >
            <FormControl variant="filled" className={classes.textField}>
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                label="Password"
                type={showPassword ? "text" : "password"}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          className={classes.loginButtonContainer}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={login}
            className={classes.loginButton}
          >
            Anmelden
          </Button>
        </Grid>
        <Grid item className={classes.registerContainer}>
          <Link
            href="#"
            onClick={handleClickRegisterLink}
            className={classes.link}
          >
            Registrieren
          </Link>
        </Grid>
        <p color="red">{error}</p>
      </Grid>
    </Grid>
  );
}
