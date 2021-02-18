import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React from "react";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
}));

export default function MainPageHeader({ user }) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container className={classes.grid} direction="row">
          <Grid item xs={1} />
          <Grid item xs={8}>
            <Typography className={classes.typographyCSS}>
              MiningStation
            </Typography>
          </Grid>

          <Grid item container xs={3}>
            <AccountCircleIcon />
            <Typography className={classes.typographyCSS}>
              {user.userName} - PokeCoins({user.coins})
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
