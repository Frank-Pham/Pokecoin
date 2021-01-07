import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import react, { useContext, useEffect, useState } from "react";
import RESTConstans from "../../utiels/constans/RESTConstans";
import { UserContext } from "../../context/user/UserContext";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function CardShop() {
  const { token } = useContext(UserContext);
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    const testpackArray = ["Base", "Fire", "Water"];
    const packArray = await fetchData(
      RESTConstans.DOMAIN + RESTConstans.PACKAGES
    );
    console.log("Die Pack-Auswahl" + packArray);

    for (const pack of testpackArray) {
      setPacks((packs) => [...packs, pack]);
    }
    console.log(packs);
  }

  /**
   * fetchen ausgelagert
   *
   * @param {*} url
   */
  async function fetchData(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
    }).then((response) => response.json());

    return response;
  }

  return (
    <Grid container spacing={3}>
      <Paper>Welcome to the PokeShop</Paper>
    </Grid>
  );
}
