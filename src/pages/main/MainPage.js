import * as crypto from "crypto";
import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

/* eslint-disable import/no-webpack-loader-syntax */
import DefaultWorker from "worker-loader!../../workers/blockWorker.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { UserContext } from "../../context/user/UserContext";
import { useHistory } from "react-router-dom";
import PokemonList from "../../models/PokemonList";
import RESTConstans from "../../utiels/constans/RESTConstans";
import MainPageHeader from "./MainPageHeader";

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

export default function MainPage() {
  const { token } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [coins, setCoins] = useState(0);
  const [worker, setWorker] = useState();
  const [difficulty, setDifficulty] = useState();
  const [pokemon, setPokemon] = useState([]);
  const history = useHistory();

  //######################## UI - ELEMENTE ############################################

  const classes = useStyles();
  /**
   * Beim First render werden Username + CoinAmount gefetcht
   * und der blockWorker initialisiert
   * UI-Element Username
   */
  useEffect(() => {
    fetchUserName();
    fetchCoins();
    fetchDifficulty();
    initBlockWorker();
    fetchCards();
  }, []);

  //###################################################################################

  const mineCoins = () => {
    collectInfoForBlock();
  };

  const goToShop = () => {
    history.push("/cardShop"); //hängt an aktuelle UL drann
  };

  async function collectInfoForBlock() {
    // Letzten Block holen und hash rausziehen
    fetchDifficulty();
    const lastBlock = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.LASTBLOCK
    );
    const prevBlockHash = lastBlock.hash;
    //neuen Block bauen mit hash als prevHash
    const newBlock = buildBlock(prevBlockHash);
    //Block wird zum minen dem blockWorker übergeben
    const workerEvent = { block: { ...newBlock }, difficulty: difficulty };
    worker.postMessage(workerEvent);
  }

  function buildBlock(prevHash) {
    const newBlock = {
      previousHash: prevHash,
      data: "Sieben Schneeschipper schippen sieben Schippen Schnee.",
      timestamp: Date.now(),
      nonce: 0,
    };
    return newBlock;
  }

  async function postOurBlock(postBlock) {
    const response = await postData(
      RESTConstans.DOMAIN + RESTConstans.BLOCKS,
      postBlock
    ).then(() => {
      fetchCoins();
    });
    console.log("response", response);
    return response;
  }

  function initBlockWorker() {
    const tempWorker = new DefaultWorker();
    tempWorker.onmessage = (event) => {
      const postBlock = { ...event.data };
      console.log("Mein Block" + JSON.stringify(postBlock));
      postOurBlock(postBlock);
    };
    setWorker(tempWorker);
    return () => {
      tempWorker.terminate();
    };
  }

  /**
   * Coins-amount wird gefecht und im Sate gespeichert
   */
  async function fetchCoins() {
    const response = await fetchData(RESTConstans.DOMAIN + RESTConstans.COINS);
    setCoins(response.amount);
  }
  /**
   * Aktueller UserName wird gefecht und gespeichert
   */
  async function fetchUserName() {
    const response = await fetchData(RESTConstans.DOMAIN + RESTConstans.ME);
    setUserName(response.username);
  }

  async function fetchCards() {
    const response = await fetchData(RESTConstans.DOMAIN + RESTConstans.CARDS);
    console.log(response.cards.map((poke) => poke));
    setPokemon([...response.cards]);
    console.log("Whats in the PokemonArray", pokemon);
  }

  async function fetchDifficulty() {
    const response = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.DIFFICULTY
    );
    setDifficulty(response);
    console.log("response nach dem Fetch", response);
    console.log("difficulty" + difficulty);
  }

  /**
   * fetchen ausgelagert
   *
   * @param {*} url
   */
  async function fetchData(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
    }).then((response) => response.json());

    return response;
  }
  /**
   *
   * Posten einen Blocks ausgelagert
   * @param {*} url
   * @param {*} Block
   */
  async function postData(url, Block) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(Block),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
    }).then((response) => response.json());
    return response;
  }

  return (
    <Grid container spacing={3} className={classes.grid}>
      <MainPageHeader user={{ userName: userName, coins: coins }} />

      <Grid item xs={9}>
        <Paper className={classes.paper}>
          <Button variant="contained" color="primary" onClick={mineCoins}>
            Start Mining
          </Button>
          <Button variant="contained" color="primary" onClick={goToShop}>
            CardShop
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <PokemonList pokemon={pokemon}></PokemonList>
      </Grid>
    </Grid>
  );
}
