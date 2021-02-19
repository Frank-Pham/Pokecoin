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
  FormHelperText
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Endpoints from "../../utils/constants/Endpoints";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import useStyles from "./LoginPageStyles";
import { useCookies } from "react-cookie";
import CookieConstants from "../../utils/constants/CookieConstants";
import useRestCalls from "../../hooks/rest/useRestCalls";
import Paths from "../../utils/constants/Paths";
import RequestApi from "../../api/RequestApi";

export default function LoginPage() {
  const requestApi = RequestApi.getInstance();
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

  const login = async () =>
    await requestApi
      .postRequest(
        Endpoints.DOMAIN + Endpoints.LOGIN,
        { username: userName, password: password },
        null
      )
      .then((response) => {
        const token = response.data.token;
        setUserCreds({
          username: userName,
          token: token,
          coins: getCoins(token).data,
        });
        setCookie(CookieConstants.USER_NAME, userName);
        setCookie(CookieConstants.TOKEN, token);

        history.push(Paths.MAIN); //hängt an aktuelle UL drann
      })
      .catch((error) =>
        setError(error.response.data.message)
      );

  const handleClickRegisterLink = async () => {
    history.push(Paths.REGISTER);
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
        <FormHelperText error={error == "" ? false:true} filled={true}>{error}</FormHelperText>
      </Grid>
    </Grid>
  );
}
