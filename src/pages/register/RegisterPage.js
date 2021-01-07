import React, { useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import useStyles from "./RegisterPageStyles";
import { Button, Grid } from "@material-ui/core";
import RESTConstans from "../../utiels/constans/RESTConstans";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    console.log(userName, password);
    const data = {
      username: userName,
      password: password,
    };
    console.log(data);
    const response = await fetch(RESTConstans.DOMAIN + RESTConstans.REGISTER, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log("response", response);
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
      <Button variant="contained" color="primary" onClick={register}>
        Regristireren
      </Button>
    </Grid>
  );
}
