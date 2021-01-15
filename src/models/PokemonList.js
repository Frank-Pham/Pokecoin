import { Grid, Paper, makeStyles } from "@material-ui/core";
import React from "react";
import PokemonCard from "./PokemonCard";

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
  console.log("WAS IST IN DER PROMP ", pokemon);
  console.log(
    "pokemon-PROBS=",
    pokemon.map((p) => p.name)
  );
  return (
    <Grid container direction={"column"} spacing={3} className={classes.grid}>
      <Grid item container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Grid item container>
            {pokemon.map((p) => (
              <Grid item xs={4} key={p.name}>
                <PokemonCard Pokemondetails={p} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Grid>
  );
}
