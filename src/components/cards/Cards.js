import React, { useContext, useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { UserContext } from "../../context/user/UserContext";
import Endpoints from "../../utils/constants/Endpoints";
import PokemonList from "../models/PokemonList";
import RequestApi from "../../api/RequestApi";
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
  const requestApi = RequestApi.getInstance();
  const { userCreds } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    const response = await requestApi.getRequest(Endpoints.DOMAIN + Endpoints.CARDS, userCreds.token);
    setCards(response.cards);
  }

  return (
    <Grid container spacing={3} className={classes.grid}>
      <Grid item xs={12}>
        <PokemonList props={{ cards: cards, details: 1 }}></PokemonList>
      </Grid>
    </Grid>
  );
}
