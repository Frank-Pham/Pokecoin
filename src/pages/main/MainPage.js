import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

/* eslint-disable import/no-webpack-loader-syntax */
import DefaultWorker from "worker-loader!../../workers/blockWorker.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, CardMedia, Popover } from "@material-ui/core";
import { UserContext } from "../../context/user/UserContext";
import RESTConstans from "../../utiels/constans/RESTConstans";
import MiningAnimation from "../../assets/animations/MiningAnimation.gif";
import useTabVisibility from "../../hooks/tabVisibility/useTabVisibility";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    marginTop: theme.spacing(7),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },

  media: {
    width: 600,
    height: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function MainPage() {
  const { userCreds, setUserCreds } = useContext(UserContext);
  //const { pokemons, setPokemons } = useContext(UserContext);
  const [worker, setWorker] = useState();
  const [difficulty, setDifficulty] = useState();
  const [miningButtonText, setMiningButtonText] = useState("Start Mining");
  const isTabVisible = useTabVisibility();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //######################## UI - ELEMENTE ############################################

  const classes = useStyles();
  /**
   * Beim First render werden Username + CoinAmount gefetcht
   * und der blockWorker initialisiert
   * UI-Element Username
   */
  useEffect(() => {
    fetchCoins();
    fetchDifficulty();
    initBlockWorker();
  }, []);

  //###################################################################################

  const mineCoins = (event) => {
    setAnchorEl(event.currentTarget);
    setMiningButtonText("Mining...");
    collectInfoForBlock();
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
    setUserCreds({ ...userCreds, coins: response.amount });
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
    const response = await axios
      .get(url, {
        headers: {
          token: userCreds.token,
        },
      })
      .then((response) => response.data);

    return response;
  }
  /**
   *
   * Posten einen Blocks ausgelagert
   * @param {*} url
   * @param {*} Block
   */
  async function postData(url, Block) {
    const response = await axios
      .post(url, Block, {
        headers: {
          token: userCreds.token,
        },
      })
      .then(
        (response) => response.data,
        setMiningButtonText("Start Mining"),
        handleClose()
      )
      .catch(function (error) {
        console.log("Mining Error: " + error);
        setMiningButtonText("Start Mining");
      });
    return response;
  }

  return (
    <div>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Button
              variant="contained"
              aria-describedby={id}
              color="primary"
              onClick={mineCoins}
            >
              {miningButtonText}
            </Button>
            <p className="visibility">
              {isTabVisible ? "Tab offen. Happy Mining :" + isTabVisible : "zu"}
            </p>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <CardMedia
                className={classes.media}
                component="iframe"
                image={MiningAnimation}
                autoPlay
              ></CardMedia>
            </Popover>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
