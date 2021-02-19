import React, { useEffect, useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import useStyles from "./RegisterPageStyles";
import { Button, Grid } from "@material-ui/core";
import Endpoints from "../../utils/constants/Endpoints";
import axios from "axios";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {}, [error]);

  const register = async () => {
    if (userName === "" || password === "") {
      if (userName === "") {
        setError("Please select a username!");
      }
      if (password === "") {
        setError("Please select a password!");
      }
      if (userName === "" && password === "") {
        setError("Please enter a username AND password!");
      }
    } else {
      const data = {
        username: userName,
        password: password,
      };
      console.log(data);
      await axios
        .post(Endpoints.DOMAIN + Endpoints.REGISTER, {
          username: data.username,
          password: data.password,
        })
        .then(function (response) {
          console.log(response);
          setError("");
        })
        .catch((error) => setError("This username is already in use"));

      console.log("Errormsg", error);
    }
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <TextField
        id="forName"
        label="Filled"
        variant="filled"
        onChange={(event) => setUserName(event.target.value)}
      />
      <TextField
        id="forPassword"
        label="Filled"
        variant="filled"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={register}>
        Regristireren
      </Button>
      <Grid>
        <p>{error}</p>
      </Grid>
    </Grid>
  );
}
