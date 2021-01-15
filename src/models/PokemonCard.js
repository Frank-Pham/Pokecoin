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
    paddingTop: "80%",
    paddingBottom: "50%",
  },
});

export default function PokemonCard({ Pokemondetails }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={Pokemondetails.name}
        subheader={Pokemondetails.subtype}
      />
      <CardContent>
        <CardMedia className={classes.media} image={Pokemondetails.imageUrl} />
      </CardContent>
    </Card>
  );
}
