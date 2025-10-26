import { Container } from "@mui/material";

export function View({ children, styles }) {
  return (
    <Container sx={styles} maxWidth="xl">
      {children}
    </Container>
  );
}
