import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from "react-redux";

import { store } from "../app/store";

import createMainTheme, { LightStatus } from '../lib/muiTheme';

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const mainTheme = createMainTheme(LightStatus.DARK);

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
  )
}

export default MyApp
