import React, { useMemo, useContext, useEffect } from "react";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/MainTable.module.css";

import { Toaster } from "react-hot-toast";

import AppBarChess from "../components/AppBarChess";
import MainTable from "../components/MainTable";
import GamesTable from "../components/GamesTable";
import SelectDay from "../components/SelectDay";

import createMainTheme from "../mobx/theme/muiTheme";
import { StoreContext } from "../pages/index";
import { observer } from "mobx-react-lite";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { MainTableRow } from "../mobx/tables/types";

interface Props {
  initialMainTable: MainTableRow[];
}

const Layout = observer(function Layout(props: Props) {
  const { initialMainTable } = props;
  //console.log("Layout");

  const rootStore = useContext(StoreContext);
  const themeStore = rootStore.theme;
  const authStore = rootStore.auth;
  const lightMode = themeStore.lightStatus;

  const mainTheme = useMemo(() => createMainTheme(lightMode), [lightMode]);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className={homeStyles.container}>
        <main className={homeStyles.main}>
          <AppBarChess />

          <SelectDay />

          <div className={styles.smartTable}>
            <div style={{ overflow: "auto" }}>
              <MainTable isFixed={false} initialMainTable={initialMainTable} />
            </div>
            <MainTable isFixed={true} initialMainTable={initialMainTable} />
          </div>

          <GamesTable />

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
  );
});

export default Layout;
