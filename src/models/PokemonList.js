import { Grid, Paper, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  console.log("WAS IST IN DER PROMP ", props.cards);
  console.log(
    "pokemon-PROBS=",
    props.cards.map((p) => p.name)
  );
  return (
    <Grid container direction={"column"} spacing={3} className={classes.grid}>
      <Grid item container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Grid item container>
            {props.cards.map((p) => (
              <Grid item xs={props.windowSize} key={p.name}>
                <PokemonCard
                  props={{ pokemon: p, detail: props.details }}
                  onClick={() => {
                    try {
                      history.push(`/cards/${p.id}`);
                    } catch (e) {
                      alert(e.message);
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Grid>
  );
}
