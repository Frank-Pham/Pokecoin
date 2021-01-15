import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import CardPackage from "../../models/CardPackage";
import CardShopHeader from "./CardShopHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ButtonBase from "@material-ui/core/ButtonBase";
import PokemonPack from "../../assets/images/PokemonPack.jpg";
import PokemonList from "../../models/PokemonList";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {ResizableBox} from "react-resizable";
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
}));

export default function CardShop() {
  const classes = useStyles();
  const { token } = useContext(UserContext);
  const { user,setUser } = useContext(UserContext);
  const [pokemon, setPokemon] = useState([]);
  const [openPack, setOpenPack] = useState(false);
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
    console.log("Die Pack-Auswahl " + packArray);
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
    setUser(response.username);
  }

  const buyPack = async() => {
    setOpenPack(true);
    await axios.get(RESTConstans.DOMAIN + RESTConstans.PACKAGES + "/Base" + RESTConstans.DEFAULT_PACK,{
      headers:{
        token: token
      }
    }).then((response) =>{
      const cards = response.data.cards;
      setPokemon([...cards])
      console.log(cards.cards[0].id);
    }).catch((error) => console.log(error))

  }
  const closePack= () => {
    setOpenPack(false);
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
          token: token,
        },
      })
      .then((response) => response.data);
    return response;
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <CardShopHeader user={{ userName: userName, coins: coins }} />
      <h1>{base} Packung</h1>
      <ButtonBase className={classes.image}>
        <img className={classes.img} alt="complex" src={PokemonPack} />
      </ButtonBase>
      <div>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={() => packAmount > 0 ? setPackAmount(packAmount-1) : console.log("Anzahl der Packs ist auf 0!")}>
            <RemoveCircleIcon />
          </Button>
          <Button disabled>{packAmount}</Button>
          <Button onClick={() => setPackAmount(packAmount+1)}>
            <AddCircleIcon />
          </Button>
        </ButtonGroup>
      </div>
      <Button variant="contained" color="primary" onClick={buyPack}>Kaufen</Button>
      <ResizableBox
      height={400}
      width={600}
      >
      <Dialog
          open={openPack}
          TransitionComponent={transition}
          keepMounted
          onClose={closePack}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Pack Cards"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12}>
              <PokemonList pokemon={pokemon}></PokemonList>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePack} color="primary">
            Close and accept Pack
          </Button>
        </DialogActions>
      </Dialog>
      </ResizableBox>
    </Grid>

  );
}
