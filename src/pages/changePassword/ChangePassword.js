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
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { UserContext } from "../../context/user/UserContext";
import Exception from "../../utiels/constans/Exceptions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiContainer-root": {
      margin: theme.spacing(3),
      width: "25ch",
    },
  },
  paper: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(2),
    width: "50%",
  },
  margin: {
    margin: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  header: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  textField: {
    width: "25ch",
  },
  button: {
    margin: theme.spacing(3),
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(59, 76, 202, .3)",
    background: "linear-gradient(60deg, #2196F2 30%, #21CBF1 90%)",
    color: "white",
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const url = RESTConstans.DOMAIN + RESTConstans.CHANGE_PASSWORD;
  const { userCreds } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      .then((response) => console.log(response.data))
      .catch(function(error) {
        const errorJson = error.response.data;
        console.log(errorJson);
        setIsInvalid(true);
        setErrorMessage(errorJson.code.includes(Exception.PASSWORD_INCORRECT) ? errorJson.text : "");
      });

  return (
    <Container maxWIdth="sm" className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center">
          <h1 className={classes.header}>Wähle dein neues Password.</h1>
          <FormControl className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Old password
            </InputLabel>
            <OutlinedInput
              error={isInvalid}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
              helperText={errorMessage === "" ?  "" : errorMessage}
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
          <FormControl className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              New password
            </InputLabel>
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
          <Button
            variant="contained"
            className={classes.button}
            onClick={changePassword}
          >
            Submit
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}
