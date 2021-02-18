import { Grid, makeStyles } from "@material-ui/core";

import React, { useState } from "react";
import CardBack from "../../assets/images/CardBack.jpg";

export default function CardAnimation({ props }) {
  const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px",
    },
    img: {
      width: "6.5vw",
      height: "9.5vw",
    },
  }));

  const [firstCardReveald, setfirstCardReveald] = useState(false);
  const [secondCardReveald, setsecondCardReveald] = useState(false);
  const [thirdCardReveald, setThirdCardReveald] = useState(false);
  const [fourthCardReveald, setFourthCardReveald] = useState(false);
  const [fifthCardReveald, setFifthCardReveald] = useState(false);

  const pulledCards = props.cards;
  const classes = useStyles();

  const flipCard = (value) => {
    switch (value) {
      case 0:
        setfirstCardReveald(true);
        break;
      case 1:
        setsecondCardReveald(true);
        break;
      case 2:
        setThirdCardReveald(true);
        break;
      case 3:
        setFourthCardReveald(true);
        break;
      case 4:
        setFifthCardReveald(true);
        break;
      default:
        break;
    }
    setfirstCardReveald(true);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid key={0} item>
            <img
              className={classes.img}
              alt="complex"
              src={firstCardReveald ? pulledCards[0].imageUrl : CardBack}
              onClick={() => {
                flipCard(0);
              }}
            />
          </Grid>
          <Grid key={1} item>
            <img
              className={classes.img}
              alt="complex"
              src={secondCardReveald ? pulledCards[1].imageUrl : CardBack}
              onClick={() => {
                flipCard(1);
              }}
            />
          </Grid>
          <Grid key={2} item>
            <img
              className={classes.img}
              alt="complex"
              src={thirdCardReveald ? pulledCards[2].imageUrl : CardBack}
              onClick={() => {
                flipCard(2);
              }}
            />
          </Grid>
          <Grid key={3} item>
            <img
              className={classes.img}
              alt="complex"
              src={fourthCardReveald ? pulledCards[3].imageUrl : CardBack}
              onClick={() => {
                flipCard(3);
              }}
            />
          </Grid>
          <Grid key={4} item>
            <img
              className={classes.img}
              alt="complex"
              src={fifthCardReveald ? pulledCards[4].imageUrl : CardBack}
              onClick={() => {
                flipCard(4);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
