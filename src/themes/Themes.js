import { createMuiTheme } from "@material-ui/core";
import Colors from "./Colors";

const LightTheme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
  },
});

export { LightTheme };
