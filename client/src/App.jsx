import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { appTheme } from "./themes/theme";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  );
}
