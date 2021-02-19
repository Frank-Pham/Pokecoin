import { Card, CardContent, makeStyles } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "../../context/user/CardContext";
import { UserContext } from "../../context/user/UserContext";
import Endpoints from "../../utils/constants/Endpoints";
import RequestApi from "../../api/RequestApi";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: "3000%",
  },
});

export default function CardDetails() {
  const requestApi = RequestApi.getInstance();
  const { cardID } = useContext(CardContext);
  const { userCreds } = useContext(UserContext);
  const [card, setCard] = useState("");
  const classes = useStyles();

  useEffect(() => {
    fetchCardDetails(cardID);
  }, []);

  /**
   * Gibt CardID für fetchData weiter und kriegt die CARD returned
   * dann Card ins State setzten
   * @param {*} cardID
   */

  async function fetchCardDetails(cardID) {
    const response = await requestApi.getRequest(
      Endpoints.DOMAIN + Endpoints.CARDS + "/" + cardID, userCreds.token
    );
    setCard(response.card);
    return response.card;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <img className={classes.img} alt="complex" src={card.imageUrlHiRes} />
      </CardContent>
    </Card>
  );
}
