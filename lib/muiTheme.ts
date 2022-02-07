import { createTheme } from "@mui/material/styles";


export enum LightStatus {
    LIGHT,
    DARK,
}
  
enum BgColors {
    DARK = "#102027",
    LIGHT = "#F7F8FC",
}


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

  return mainTheme;
}