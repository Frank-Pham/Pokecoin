import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import CardShopHeader from "./CardShopHeader";
import { UserContext } from "../../context/user/UserContext";
import CardShop from "./CardShop";

export default function BuyPackDialog() {
    const { user } = useContext(UserContext);
    const { coins } = useContext(UserContext);

    return (
        <Grid>
            <CardShopHeader user={{ userName: user, coins: coins }} />
            <CardShop />
        </Grid>
    );
}
