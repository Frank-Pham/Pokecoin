import React, { useEffect, useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import useStyles from "./RegisterPageStyles";
import { Button, Grid } from "@material-ui/core";
import Endpoints from "../../utils/constants/Endpoints";
import RequestApi from "../../api/RequestApi";

export default function RegisterPage() {
  const requestApi = RequestApi.getInstance();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    const data = {
      username: userName,
      password: password,
    };
    console.log(data);
    await requestApi
      .postRequest(Endpoints.DOMAIN + Endpoints.REGISTER, {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => setError(error.response.data.message));
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
