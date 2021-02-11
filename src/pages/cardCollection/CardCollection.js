import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import CardShopHeader from "../shop/CardShopHeader";
import { UserContext } from "../../context/user/UserContext";
import UserCollection from "./UserCollection";

export default function CardCollection() {
  const { user } = useContext(UserContext);
  const { coins } = useContext(UserContext);

  return (
    <Grid>
      <CardShopHeader user={{ userName: user, coins: coins }} />
      <UserCollection />
    </Grid>
  );
}
