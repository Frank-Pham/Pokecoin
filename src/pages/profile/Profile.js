import React from "react";
import { Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();

  const goToChangePassword = () => {
    history.push("/changePassword");
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
