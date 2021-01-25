import { React, useState, useContext } from "react";
import {
  Container,
  FormControl,
  Grid,
  Paper,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  makeStyles,
  Button
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { UserContext } from "../../context/user/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(4),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const url = RESTConstans.DOMAIN + RESTConstans.CHANGE_PASSWORD;
  const { userCreds } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changePassword = async () =>
    await axios
      .post(
        url,
        {
          password: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            token: userCreds.token,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

  return (
    <Container maxWIdth="sm">
      <Paper>
        <h1>Wähle dein neues Password.</h1>
        <FormControl className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <FormControl className={classes.margin} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button  variant="contained" color="primary" onClick={changePassword}>Submit</Button>
      </Paper>
    </Container>
  );
}
