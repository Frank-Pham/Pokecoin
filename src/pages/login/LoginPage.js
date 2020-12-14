import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = async () => {
    console.log(userName, password);
    const data = {
      username: userName,
      password: password,
    };
    console.log(data);
    const response = await fetch(RESTConstans.DOMAIN + RESTConstans.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    console.log("response", response);
    if (response.token) {
      history.push("/main"); //hängt an aktuelle UL drann
    }
  };

  return (
    <Grid container direction="column">
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
      <Button variant="contained" color="primary" onClick={login}>
        Anmelden
      </Button>
    </Grid>
  );
}
