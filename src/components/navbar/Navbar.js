import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import PageNameConstants from "../../utils/constants/PageNameConstants";
import HomeIcon from "@material-ui/icons/Home";
import Paths from "../../utils/constants/Paths";

const useStyles = makeStyles((theme) => ({
  root: {
    flexgrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  grid: {
    width: "100%",
    margin: "0px",
  },

  buttons: {
    marginLeft: theme.spacing(3),
    background: "#757ce8",
  },
  homeButton: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: "white",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const { userCreds } = useContext(UserContext);
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Button onClick={() => history.push(Paths.MAIN)}>
            <HomeIcon className={classes.homeButton} />
          </Button>
          <Typography className={classes.title}>
            {PageNameConstants.MAIN}
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(Paths.SHOP)}
              className={classes.buttons}
            >
              CardShop
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(Paths.COLLECTION)}
              className={classes.buttons}
            >
              Cardcollection
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(Paths.CARDS)}
              className={classes.buttons}
            >
              All Cards
            </Button>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(Paths.PROFILE)}
          >
            <AccountCircleIcon />
          </Button>
          <Typography className={classes.typographyCSS}>
            {userCreds.username} - PokeCoins({userCreds.coins})
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
