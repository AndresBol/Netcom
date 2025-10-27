import { Container } from "@mui/material";

export function View({ children, styles, maxWidth = "xl" }) {
  return (
    <Container sx={styles} maxWidth={maxWidth}>
      {children}
    </Container>
  );
}
