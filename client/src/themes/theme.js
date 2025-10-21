import { createTheme } from "@mui/material/styles";
export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5ac5d7",
    },
    secondary: {
      main: "#1D5B79",
    },
    primaryLight: {
      main: "#EF6262",
      contrastText: "#F3AA60",
    },
  },
});
