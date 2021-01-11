import { Grid, Paper, makeStyles } from "@material-ui/core";
import React from "react";

export default function PokemonList({ pokemon }) {
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
    <Grid container direction={"column"} spacing={3} className={classes.grid}>
      <Grid item container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          {pokemon.map((p) => (
            <Paper key={p}>{p}</Paper>
          ))}
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Grid>
  );
}
