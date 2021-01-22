import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardHeader, CardMedia, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CardContext } from "../context/user/CardContext";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: "3000%",
  },
});

export default function PokemonCard({ props }) {
  const { cardID, setCardID } = useContext(CardContext);
  const classes = useStyles();
  const history = useHistory();

  console.log("PokemonCards Props", props.detail);

  const showCard = () =>
    props.detail !== null ? (
      <Card className={classes.root}>
        <CardContent>
          <img
            className={classes.img}
            alt="complex"
            src={props.pokemon.imageUrl}
            onClick={() => {
              try {
                setCardID(props.pokemon.id);
                history.push(`/cardDetail/${props.pokemon.id}`);
              } catch (e) {
                alert(e.message);
              }
            }}
          />
        </CardContent>
      </Card>
    ) : (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5">{props.pokemon.name}</Typography>
        </CardContent>
      </Card>
    );

  return <div>{showCard()}</div>;
}
