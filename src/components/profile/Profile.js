import React from "react";
import { Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Paths from "../../utils/constants/Paths";

export default function Profile() {
  const history = useHistory();

  const goToChangePassword = () => {
    history.push(Paths.CHANGE_PASSWORD);
  }

  return (
    <Container>
      <h1>Dein Profil</h1>
      <Button variant="contained" color="primary" onClick={goToChangePassword}>
        Password wechseln
      </Button>
    </Container>
  );
}
