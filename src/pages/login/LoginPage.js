import React, { useState, useContext } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  FilledInput,
  TextField,
  FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff, ViewColumn } from "@material-ui/icons";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { red } from "@material-ui/core/colors";
import axios from "axios";

const useStyles = makeStyles((theme) => {
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    input: {
      "&MuiTextField-root": {
        margin: theme.spacing(10),
        width: "50ch",
      },
    },
  });
});

export default function LoginPage() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState("");

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
        console.log(response.data)
        setToken(response.data.token);
        history.push("/main"); //hängt an aktuelle UL drann
      })
      .catch((error) =>
        setError("Loginname and/or password is wrong, please try again!")
      );
  };

  const goToRegister = () => {
    history.push("/register");
  };

  const register = async () => {
    history.push("/register");
  };

  return (
    <Grid container direction="column">
      <h1>Pokecoin-Login 🪙</h1>
      <TextField
        id="forName"
        label="Username"
        variant="filled"
        onChange={(event) => setUserName(event.target.value)}
      />
      <FormControl variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
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
      <Button variant="contained" color="primary" onClick={login}>
        Anmelden
      </Button>
      <Button variant="contained" color="primary" onClick={register}>
        Registrieren
      </Button>
      <Button variant="contained" color="primary" onClick={goToRegister}>
        Haben Sie noch keinen Account?
      </Button>
      <p color="red">{error}</p>
    </Grid>
  );
}
