import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

/* eslint-disable import/no-webpack-loader-syntax */
import DefaultWorker from "worker-loader!../../workers/blockWorker.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, CardMedia, Popover, Chip } from "@material-ui/core";
import { UserContext } from "../../context/user/UserContext";
import Endpoints from "../../utils/constants/Endpoints";
import MiningAnimation from "../../assets/animations/MiningAnimation.gif";
import useTabVisibility from "../../hooks/tabVisibility/useTabVisibility";
import { lime, red } from "@material-ui/core/colors";
import RequestApi from "../../api/RequestApi";
import CoinBalanceService from "../../services/CoinBalanceService";
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

  tabState: {
    marginTop: theme.spacing(3),
  },
}));

export default function MainPage() {
  const requestApi = RequestApi.getInstance();
  const coinBalanceService = CoinBalanceService.getInstance();
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
    setIsMining(false);
    setMiningButtonText("Start Mining");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //######################## UI - ELEMENTE ############################################

  const classes = useStyles();
  /**
   * Beim First render wird der blockworker intialisiert
   */
  useEffect(() => {
    initBlockWorker();
  }, []);

  useEffect(() => {
    if (worker && isTabVisible && isMining) worker.postMessage(userCreds.token);
    else {
      handleClose();
      setMiningButtonText("Start Mining");
      setIsMining(false);
    }
  }, [userCreds.coins]);

  //###################################################################################

  const mineCoins = (event) => {
    if (isMining === false) {
      setAnchorEl(event.currentTarget);
      setMiningButtonText("Mining...");
      setIsMining(true);
      worker.postMessage(userCreds.token);
    } else {
      handleClose();
      setIsMining(false);
      setMiningButtonText("Start Mining");
    }
  };

  async function postOurBlock(postBlock) {
    await requestApi
      .postRequest(
        Endpoints.DOMAIN + Endpoints.BLOCKS,
        postBlock,
        userCreds.token
      )
      .then(
        async () =>
          await coinBalanceService
            .getCoins(userCreds.token)
            .then((response) => setUserCreds({ ...userCreds, coins: response }))
      )
      .catch(async (error) => {
        if (
          window.confirm(
            "Mining Error: " +
              error.response.data.message +
              " - Press ok to continue mining"
          ) &&
          worker !== undefined
        ) {
          worker.postMessage(userCreds.token);
        } else {
          handleClose();
          setIsMining(false);
          setMiningButtonText("Start Mining");
        }
      });
  }

  function initBlockWorker() {
    const tempWorker = new DefaultWorker();
    setWorker(tempWorker);
    tempWorker.onmessage = async (event) => {
      const postBlock = { ...event.data };
      console.log("Mein Block" + JSON.stringify(postBlock));
      await postOurBlock(postBlock);
    };
    return () => {
      tempWorker.terminate();
    };
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
            <div className={classes.tabState}>
              <Chip
                style={{
                  backgroundColor: isTabVisible ? lime["A400"] : red[200],
                }}
                label={
                  isTabVisible
                    ? "Tab offen. Happy Mining"
                    : "Tab wurde gewechselt. Mining wurde gestoppt"
                }
              />
            </div>

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
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
