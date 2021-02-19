import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import { CardContext } from "../../context/user/CardContext";
import Paths from "../../utils/constants/Paths";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  title: {
    fontSize: "3000%",
  },
});

export default function PokemonCard({ props }) {
  const { setCardID } = useContext(CardContext);
  const classes = useStyles();
  const history = useHistory();


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
                history.push(`${Paths.CARD_DETAILS}/${props.pokemon.id}`);
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
          <img
            className={classes.img}
            alt="complex"
            src={props.pokemon.imageUrl}
          />
        </CardContent>
      </Card>
    );

  return <div>{showCard()}</div>;
}
