import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import react, { useContext, useEffect, useState } from "react";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import CardPackage from "../../models/CardPackage"
import CardShopHeader from "./CardShopHeader";
import React from "react";

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

export default function CardShop() {
  const { token } = useContext(UserContext);
  const [packs, setPacks] = useState([]);
  const [userName, setUserName] = useState("");
  const [coins, setCoins] = useState(0);
  const base = packs[0];
  const deluxe = packs[1];
  const platin = packs[2];

  const basePack = new CardPackage(base, 5, [], 1, 10);
  basePack.fetchCards(token);

  useEffect(() => {
    fetchPackages();
    fetchCoins();
    fetchUserName();
  }, []);

  async function fetchPackages() {
    const packArray = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.PACKAGES
    );
    setPacks(packs => ["base", "deluxe", "platin"]);
    console.log("Die Pack-Auswahl" + packArray);
    for(const pack of packs){
      console.log(pack);
    }

  }
  async function fetchCoins() {
    const response = await fetchData(RESTConstans.DOMAIN + RESTConstans.COINS);
    setCoins(response.amount);
  }

  async function fetchUserName() {
    const response = await fetchData(RESTConstans.DOMAIN + RESTConstans.ME);
    setUserName(response.username);
  }

  /**
   * fetchen ausgelagert
   *
   * @param {*} url
   */
  async function fetchData(url) {
    /*const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
    }).then((response) => response.json());

    return response;*/

    const response = await axios
        .get(url,
            {
              headers: {
                token: token
              }
            })
        .then(response => response.data)
    return response;

  }

  return (
    <Grid>
      <CardShopHeader  user={{ userName: userName, coins: coins }} />
      <h1>{base} {deluxe} {platin}</h1>
    </Grid>
  );
}
