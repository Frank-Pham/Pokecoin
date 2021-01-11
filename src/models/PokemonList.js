import { makeStyles } from "@material-ui/core";
import React from "react";

export default function PokemonList({ pokemon }) {
  const useStyles = makeStyles((theme) => ({
    ul: {
      colums: 6,
    },
    li: {
      display: "inline",
    },
  }));
  const classes = useStyles();
  return (
    <ul className={classes.ul}>
      {pokemon.map((p) => (
        <li key={p} className={classes.li}>
          {p}
        </li>
      ))}
    </ul>
  );
}
