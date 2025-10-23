import React from "react";
import { Container, Typography, Grid, Toolbar } from "@mui/material";
export function Footer() {
  return (
    <Toolbar
      sx={{
        px: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "4.5rem",
        backgroundColor: "primary.main",
        zIndex: 1200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Comentario */}
      <Container>
        <Typography align="center" color="white" variant="subtitle1">
          ISW-613
        </Typography>
        <Typography align="center" color="secondary.main" variant="body1">
          {`${new Date().getFullYear()}`}
        </Typography>
      </Container>
    </Toolbar>
  );
}
