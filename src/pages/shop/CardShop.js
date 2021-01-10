import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import react, { useContext, useEffect, useState } from "react";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import CardPackage from "../../models/CardPackage"

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
  const base = packs[0];
  const deluxe = packs[1];
  const platin = packs[2];

  const basePack = new CardPackage(base, 5, [], 1, 10);
  basePack.fetchCards(token);

  useEffect(() => {
    fetchPackages();
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
      <Paper>Welcome to the PokeShop</Paper>
      <h1>{base} {deluxe} {platin}</h1>
    </Grid>
  );
}
