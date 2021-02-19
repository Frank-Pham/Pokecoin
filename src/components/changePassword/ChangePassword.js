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
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Endpoints from "../../utils/constants/Endpoints";
import { UserContext } from "../../context/user/UserContext";
import Exception from "../../utils/constants/Exceptions";
import RequestApi from "../../api/RequestApi";

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

const HelperText = (props) => {
  if (props.isInvalid) {
    return (
      <FormHelperText error={props.isInvalid} filled={true}>
        {props.errorMessage}
      </FormHelperText>
    );
  } else {
    return <FormHelperText>{props.successMessage}</FormHelperText>;
  }
};

export default function ChangePassword() {
  const classes = useStyles();
  const url = Endpoints.DOMAIN + Endpoints.CHANGE_PASSWORD;
  const { userCreds } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const requestApi = RequestApi.getInstance();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changePassword = async () => {
    if (newPassword == "") {
      setIsInvalid(true);
      setErrorMessage("Neues Password darf nicht leer sein!");

      return;
    }

    requestApi
      .postRequest(
        url,
        {
          password: oldPassword,
          newPassword: newPassword,
        },
        userCreds.token
      )
      .then(
        () => setErrorMessage(""),
        setIsInvalid(false),
        setSuccessMessage("Password erfolgreich geändert!")
      )
      .catch(function (error) {
        const errorJson = error.response.data;
        setIsInvalid(true);
        setErrorMessage(
          errorJson.code.includes(Exception.PASSWORD_INCORRECT)
            ? errorJson.message
            : ""
        );
      });
  };
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
              helperText={errorMessage}
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
          <HelperText
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
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
