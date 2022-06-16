import React, {
  useMemo,
  useContext,
  useEffect,
  createContext,
  Context,
} from "react";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";

import { Toaster } from "react-hot-toast";

import AppBarChess from "../components/AppBarChess";

import createMainTheme from "../mobx/theme/muiTheme";
import RootStore from "../mobx/RootStore";

import { Storage } from "../constants";

import { LightStatus } from "../mobx/theme/types";

import { observer } from "mobx-react-lite";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export let StoreContext: Context<RootStore>;

const rootStore = new RootStore();

interface Props {
  children: React.ReactNode;
}

const Layout = observer(function Layout(props: Props) {
  //console.log("Layout");

  StoreContext = useMemo(() => createContext<RootStore>(rootStore), []);

  useEffect(() => {
    //console.log("Layout useEffect");

    rootStore.theme.setLightStatus(getInitialLightMode());

    const authToken = localStorage.getItem(Storage.TOKEN);
    if (authToken) {
      rootStore.auth.setToken(authToken);
    }

    function saveInLocalStorage() {
      localStorage.setItem(
        Storage.LIGHT_MODE,
        JSON.stringify(rootStore.theme.lightStatus)
      );

      localStorage.setItem(Storage.TOKEN, rootStore.auth.token);
    }
    window.addEventListener("beforeunload", saveInLocalStorage);

    return function cleanUp() {
      window.removeEventListener("beforeunload", saveInLocalStorage);
    };
  }, []);

  const themeStore = rootStore.theme;
  const lightMode = themeStore.lightStatus;

  const mainTheme = useMemo(() => createMainTheme(lightMode), [lightMode]);

  return (
    <StoreContext.Provider value={rootStore}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <div className={homeStyles.container}>
          <main className={homeStyles.main}>
            <AppBarChess />

            {props.children}

            <Toaster />
          </main>

          <footer className={homeStyles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={homeStyles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </div>
      </ThemeProvider>
    </StoreContext.Provider>
  );
});

export default Layout;

//  helper functions

function getInitialLightMode(): LightStatus {
  const storageStatus = localStorage.getItem(Storage.LIGHT_MODE);
  if (storageStatus) {
    return JSON.parse(storageStatus);
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? LightStatus.DARK
      : LightStatus.LIGHT;
  }
}
