import { Card, CardContent, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "../../context/user/CardContext";
import { UserContext } from "../../context/user/UserContext";
import Endpoints from "../../utils/constants/Endpoints";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: "3000%",
  },
});

export default function CardDetails() {
  const { cardID } = useContext(CardContext);
  const { userCreds } = useContext(UserContext);
  const [card, setCard] = useState("");
  const classes = useStyles();

  useEffect(() => {
    console.log(cardID);
    fetchCardDetails(cardID);
  }, []);

  /**
   * Gibt CardID für fetchData weiter und kriegt die CARD returned
   * dann Card ins State setzten
   * @param {*} cardID
   */

  async function fetchCardDetails(cardID) {
    const response = await fetchData(
      Endpoints.DOMAIN + Endpoints.CARDS + "/" + cardID
    );
    setCard(response.card);
    return response.card;
  }

  /**
   * Kriegt die URL mitgegeben und fetch
   * die Datan der jeweiligen URL
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

  return (
    <Card className={classes.root}>
      <CardContent>
        <img className={classes.img} alt="complex" src={card.imageUrlHiRes} />
      </CardContent>
    </Card>
  );
}
