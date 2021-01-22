import React, { useContext, useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { UserContext } from "../../context/user/UserContext";
import RESTConstans from "../../utiels/constans/RESTConstans";
import PokemonList from "../../models/PokemonList";
import CardShopHeader from "../shop/CardShopHeader";
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

export default function UserCollection() {
  const { userCreds } = useContext(UserContext);
  const [userCards, setUserCards] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchUserCollection();
  }, []);

  async function fetchUserCollection() {
    const response = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.USERCARDS
    );
    const cardIDs = response.map((card) => card.cardId);

    const getCardDetails = async () => {
      return Promise.all(cardIDs.map((cardId) => fetchCardDetails(cardId)));
    };

    getCardDetails().then((cards) => {
      setUserCards([...cards]);
    });
  }

  async function fetchCardDetails(cardId) {
    const response = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.CARDS + "/" + cardId
    );

    return response.card;
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
        <PokemonList props={{ cards: userCards, details: 1 }}></PokemonList>
      </Grid>
    </Grid>
  );
}
