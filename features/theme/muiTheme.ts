import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { LightStatus, BgColors } from "./types";

export default function createMainTheme(lightMode: LightStatus) {
  const mainTheme = createTheme({
    palette: {
      mode: lightMode === LightStatus.LIGHT ? "light" : "dark",
      background: {
        default:
          lightMode === LightStatus.LIGHT ? BgColors.LIGHT : BgColors.DARK,
        paper: lightMode === LightStatus.LIGHT ? "#FFF" : BgColors.DARK,
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
  });

  return responsiveFontSizes(mainTheme);
}
