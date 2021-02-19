import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ props }) {
  const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
    },

    li: {
      display: "inline",
    },
  }));
  const classes = useStyles();

  return (
    <Grid container direction={"row"} spacing={3} className={classes.grid}>
      <Grid item container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Grid item container>
            {props.cards.map((p, index) => (
              <Grid item xs={props.windowSize} key={index}>
                <PokemonCard props={{ pokemon: p, detail: props.details }} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Grid>
  );
}
