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
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {/* Comentario */}
      <Container>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Typography align="center" color="white" variant="subtitle1">
              ISW-613
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" color="secondary.main" variant="body1">
              {`${new Date().getFullYear()}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  );
}
