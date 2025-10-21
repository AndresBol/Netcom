import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export function Home() {
  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Alquiler de Peliculas
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary">
        Descubre y alquila tus películas favoritas por días.
      </Typography>
      <Button href="/ticket/new" variant="contained">
        Create Ticket
      </Button>

        <Button href="/ticket/1" variant="outlined" color="secondary">
        Detail Ticket
      </Button>
    </Container>
  );
}
