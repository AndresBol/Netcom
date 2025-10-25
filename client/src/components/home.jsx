import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLoggedUser } from "@contexts/UserContext";

export function Home() {
  const { loggedUser } = useLoggedUser();
  return (
    <Container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
      maxWidth="sm"
    >
      {loggedUser && (
        <Typography variant="h2" color="text.secondary">
          Welcome {loggedUser.name}!
        </Typography>
      )}
      <Typography variant="h5" align="center" color="text.secondary">
        Descubre y alquila tus películas favoritas por días.
      </Typography>
      <Button href="/user/index" variant="contained">
        View Users
      </Button>
      <Button href="/ticket/new" variant="contained">
        Create Ticket
      </Button>
      <Button href="/ticket/index" variant="contained">
        View Tickets
      </Button>

      <Button href="/category/index" variant="contained">
        View Categories
      </Button>
    </Container>
  );
}
