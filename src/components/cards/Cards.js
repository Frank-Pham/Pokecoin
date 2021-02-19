import React, { useContext, useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { UserContext } from "../../context/user/UserContext";
import Endpoints from "../../utils/constants/Endpoints";
import PokemonList from "../../models/PokemonList";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function Cards() {
  const { userCreds } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    const response = await fetchData(Endpoints.DOMAIN + Endpoints.CARDS);

    setCards(response.cards);
  }
  /**
   * fetchen ausgelagert
   *
   * @param {*} url
   */
  async function fetchData(url) {
    const response = await axios
      .get(url, {
        headers: {
          token: userCreds.token,
        },
      })
      .then((response) => response.data);

    return response;
  }

  return (
    <Grid container spacing={3} className={classes.grid}>
      <Grid item xs={12}>
        <PokemonList props={{ cards: cards, details: 1 }}></PokemonList>
      </Grid>
    </Grid>
  );
}
