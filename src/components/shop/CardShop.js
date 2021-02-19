import {
  Grid,
  DialogTitle,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Endpoints from "../../utils/constants/Endpoints";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import CardPackage from "../models/CardPackage";
import CardPack from "../../assets/images/CardBack.jpg";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ButtonBase from "@material-ui/core/ButtonBase";
import PokemonPack from "../../assets/images/PokemonPack.jpg";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { ResizableBox } from "react-resizable";
import CardAnimation from "./CardAnimation";
import CoinBalanceService from "../../services/CoinBalanceService";

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  resizable: {
    position: "relative",
    "& .react-resizable-handle": {
      position: "absolute",
      width: 20,
      height: 20,
      bottom: 0,
      right: 0,
      padding: "0 3px 3px 0",
      "background-repeat": "no-repeat",
      "background-origin": "content-box",
      "box-sizing": "border-box",
      cursor: "se-resize",
    },
  },
}));

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};
export default function CardShop() {
  const classes = useStyles();
  const { userCreds, setUserCreds } = useContext(UserContext);
  const [openPack, setOpenPack] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [packs, setPacks] = useState([]);
  const [packAmount, dispatch] = useReducer(reducer, 0);
  const coinBalanceService = CoinBalanceService.getInstance();
  let countPacks = 0;
  const pack = packs[countPacks];

  const basePack = new CardPackage(pack, 5, [], 1, 10);
  basePack.fetchCards(userCreds.token);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    const packArray = await fetchData(Endpoints.DOMAIN + Endpoints.PACKAGES);
    const packIndex = JSON.stringify(packArray);

    for (const pack of packArray) {
      console.log("Pack " + countPacks + ": " + pack);
      console.log("Packlänge: " + JSON.stringify(packArray[countPacks]));
      if (packArray.length > 1) {
        countPacks++;
        let howManyPacks = packArray.length;
        while (countPacks < howManyPacks) {
          setPacks((packs) => JSON.stringify(packArray[countPacks]));
        }
      }
    }

    setPacks((packs) => Array.from(packArray));
    console.log("Die Pack-Auswahl: " + packIndex);
    console.log("Alle Packs: " + packs);
    for (const pack of packs) {
      console.log("Was ist hier " + pack);
    }
  }

  const buyPack = async () => {
    await axios
      .get(
        Endpoints.DOMAIN +
          Endpoints.PACKAGES +
          "/" +
          pack +
          Endpoints.DEFAULT_PACK,
        {
          headers: {
            token: userCreds.token,
          },
        }
      )
      .then(async (response) => {
        const cards = response.data.cards;
        setPokemon(cards);
        await coinBalanceService.getCoins(userCreds.token).then((response) => {
          setUserCreds({ ...userCreds, coins: response });
        });
        setOpenPack(true);
      })
      .catch((error) => console.log(error));
  };

  const closePack = () => {
    setOpenPack(false);
  };
  const testBuy = () => {
    setOpenPack(true);
  };

  const showPull = () =>
    openPack === true ? <h1>Dein Gekauftes Pack!</h1> : "";

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

  const testClick = () => {
    console.log("HAllo!");
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {packs.map((packName) => (
        <>
          <h1>{packName} Packung</h1>

          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={PokemonPack} />
          </ButtonBase>
          <div>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() =>
                  packAmount > 0
                    ? dispatch({ type: "decrement" })
                    : console.log("Anzahl der Packs ist auf 0!")
                }
              >
                <RemoveCircleIcon />
              </Button>
              <Button disabled>{packAmount}</Button>
              <Button onClick={() => dispatch({ type: "increment" })}>
                <AddCircleIcon />
              </Button>
            </ButtonGroup>
          </div>
          <Button variant="contained" color="primary" onClick={buyPack}>
            Kaufen
          </Button>

          <ResizableBox height={400} width={1200} className={classes.resizable}>
            <Dialog
              open={openPack}
              TransitionComponent={transition}
              keepMounted
              onClose={closePack}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Pack Cards"}
              </DialogTitle>
              <DialogContent>
                {/* <PokemonList
              props={{ cards: pokemon, details: null }}
            ></PokemonList> */}
                <CardAnimation props={{ cards: pokemon }}></CardAnimation>
                {console.log(pokemon)}
              </DialogContent>
              <DialogActions>
                <Button onClick={closePack} color="primary">
                  Close and accept Pack
                </Button>
              </DialogActions>
            </Dialog>
          </ResizableBox>
        </>
      ))}
    </Grid>
  );
}
