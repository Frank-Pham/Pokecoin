import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

/* eslint-disable import/no-webpack-loader-syntax */
import DefaultWorker from "worker-loader!../../workers/blockWorker.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, CardMedia, Popover } from "@material-ui/core";
import { UserContext } from "../../context/user/UserContext";
import Endpoints from "../../utils/constants/Endpoints";
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
  const [difficulty, setDifficulty] = useState(0);
  const [miningButtonText, setMiningButtonText] = useState("Start Mining");
  const [isMining, setIsMining] = useState(false);
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
    initBlockWorker();
    fetchCoins();
    //fetchDifficulty(); Ausgelagert
  }, []);

  useEffect(() => {
    if (worker && isTabVisible && isMining) worker.postMessage(userCreds.token);
  }, [userCreds.coins]);

  //###################################################################################

  const mineCoins = (event) => {
    if (isMining == false) {
      setAnchorEl(event.currentTarget);
      setMiningButtonText("Mining...");
      setIsMining(true);
      worker.postMessage(userCreds.token);
    } else {
      setIsMining(false);
      setMiningButtonText("Start Mining");
    }
  };

  async function postOurBlock(postBlock) {
    const response = await postData(
      Endpoints.DOMAIN + Endpoints.BLOCKS,
      postBlock
    ); /*.then(() => {
      fetchCoins();
    });*/
    console.log("response", response);
    return response;
  }

  function initBlockWorker() {
    const tempWorker = new DefaultWorker();
    setWorker(tempWorker);
    tempWorker.onmessage = (event) => {
      const postBlock = { ...event.data };
      console.log("Mein Block" + JSON.stringify(postBlock));
      postOurBlock(postBlock).then(() => {
        fetchCoins();
        //collectInfoForBlock();
      });
    };
    return () => {
      tempWorker.terminate();
    };
  }
  /**
   * Coins-amount wird gefecht und im Sate gespeichert
   */
  async function fetchCoins() {
    const response = await fetchData(Endpoints.DOMAIN + Endpoints.COINS);
    setUserCreds({ ...userCreds, coins: response.amount });
  }
  /**
   * Könnte man auslagern in einer fetchApi
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
        (response) => response.data
        //handleClose()
      )
      .catch(function (error) {
        console.log("Mining Error: " + error);
        setIsMining(false);
        setMiningButtonText("Start Mining");
      });
    return response;
  }

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
    <div>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
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
            {/*
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
            </Popover>*/}
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
