import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import react, { useContext, useEffect, useState } from "react";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import CardPackage from "../../models/CardPackage";
import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ButtonBase from "@material-ui/core/ButtonBase";
import PokemonPack from "../../assets/images/PokemonPack.jpg";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },

  image: {
    width: 160,
    height: 239,
  },

  img: {
    marginBottom: "25px",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function CardShop() {
  const classes = useStyles();
  const { token } = useContext(UserContext);
  const [packs, setPacks] = useState([]);
  const [userName, setUserName] = useState("");
  const [coins, setCoins] = useState(0);
  const [packAmount, setPackAmount] = useState(0);
  const base = packs[0];

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
    setPacks((packs) => ["base"]);
    console.log("Die Pack-Auswahl" + packArray);
    for (const pack of packs) {
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

  const buyPack = async () => {
    await axios
      .get(
        RESTConstans.DOMAIN +
          RESTConstans.PACKAGES +
          "/Base" +
          RESTConstans.DEFAULT_PACK,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  /**
   * fetchen ausgelagert
   *
   * @param {*} url
   */
  async function fetchData(url) {
    const response = await axios
      .get(url, {
        headers: {
          token: token,
        },
      })
      .then((response) => response.data);
    return response;
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <h1>{base} Packung</h1>
      <ButtonBase className={classes.image}>
        <img className={classes.img} alt="complex" src={PokemonPack} />
      </ButtonBase>
      <div>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            onClick={() =>
              packAmount > 0
                ? setPackAmount(packAmount - 1)
                : console.log("Anzahl der Packs ist auf 0!")
            }
          >
            <RemoveCircleIcon />
          </Button>
          <Button disabled>{packAmount}</Button>
          <Button onClick={() => setPackAmount(packAmount + 1)}>
            <AddCircleIcon />
          </Button>
        </ButtonGroup>
      </div>
      <Button variant="contained" color="primary" onClick={buyPack}>
        Kaufen
      </Button>
    </Grid>
  );
}
