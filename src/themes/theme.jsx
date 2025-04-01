import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00695c", // Customize your primary color
    },
    secondary: {
      main: "#ffcc80", // Customize your secondary color
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
    },
  },
});

export default theme;
