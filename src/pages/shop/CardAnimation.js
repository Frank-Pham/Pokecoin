import { Card, CardContent, Grid, makeStyles, Paper } from "@material-ui/core";
import { RotateLeft, RotateRight } from "@material-ui/icons";
import React from "react";
import CardBack from "../../assets/images/CardBack.jpg";

export default function CardAnimation({ props }) {
  const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px",
    },
    img: {
      width: "6.5vw",
      height: "9.5vw",
    },
  }));

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2, 3, 4].map((value) => (
            <Grid key={value} item>
              <img
                className={classes.img}
                alt="complex"
                src={CardBack}
                onlick={() => {
                  console.log("HALLO");
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
