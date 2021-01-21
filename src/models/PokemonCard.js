import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardHeader, CardMedia, IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    paddingTop: "100%",
    paddingBottom: "50%",
  },
});

export default function PokemonCard({ props }) {
  console.log("PokemonCards Props", props);
  const classes = useStyles();
  const showHeader = () =>
    !props.details ? (
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={<IconButton aria-label="settings">HALLO</IconButton>}
        title={props.pokemon.name}
        subheader={props.pokemon.subtype}
      />
    ) : (
      ""
    );
  const showDetails = () =>
    props.detail ? (
      <CardMedia className={classes.media} image={props.pokemon.imageUrl} />
    ) : (
      ""
    );

  return (
    <Card className={classes.root}>
      {showHeader()}
      <CardContent>{showDetails()}</CardContent>
    </Card>
  );
}
