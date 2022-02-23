import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Provider } from "react-redux";

import { store } from "../app/store";

import createMainTheme from "../features/theme/muiTheme";
import { LightStatus } from "../features/theme/types";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Storage } from "../constants";

// window.addEventListener("beforeunload", () => {
//   localStorage.setItem(
//     Storage.LIGHT_MODE,
//     JSON.stringify(store.getState().theme.lightStatus)
//   );
// });

const mainTheme = createMainTheme(store.getState().theme.lightStatus);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
