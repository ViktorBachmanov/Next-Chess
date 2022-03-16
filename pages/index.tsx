import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useEffect, useMemo, createContext, Context } from "react";

import { db } from "../lib/db";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { RootState, store } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { assignTables } from "../features/db/dbSlice";
import { User, Game } from "../features/db/types";

import {
  //setInitialMainTable,
  filterGamesAndUsersByDay,
  //mainTableObject,
  setGamesTable,
  setDayFilter,
  resetMainTable as resetMainTableAction,
} from "../features/filter/filterSlice";
// import { Order, MainTableRow } from "../features/filter/types";
// import MainTable from "../features/filter/MainTable";

import Layout from "../components/Layout";

//import createMainTheme from "../features/theme/muiTheme";
import { LightStatus } from "../features/theme/types";
import { setLightStatus } from "../features/theme/themeSlice";
import { setLoginStatus } from "../features/auth/authSlice";

import { Storage } from "../constants";

//import { observer } from "mobx-react";
import RootStore from "../mobx/RootStore";
import Tables from "../mobx/tables/Tables";
import Theme from "../mobx/theme/Theme";

//import Timer from "./Timer";

//export let timer: Timer;

export let StoreContext: Context<RootStore>;

function Home({
  //mainTable,
  users,
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //timer = new Timer();

  console.log("Home");

  const dispatch = useAppDispatch();

  // const initialMainTable: Array<MainTableRow> = useMemo(
  //   () => JSON.parse(mainTable),
  //   [mainTable]
  // );

  // const myTables: Tables = useMemo(
  //   () => new Tables(allUsers, allGames),
  //   [allUsers, allGames]
  // );

  let rootStore: RootStore;
  const allUsers = JSON.parse(users) as Array<User>;
  const allGames = JSON.parse(games) as Array<Game>;

  const myTables = new Tables(allUsers, allGames);
  //const myTheme = new Theme(getInitialLightMode());
  const myTheme = new Theme();

  rootStore = new RootStore(myTables, myTheme);

  StoreContext = createContext<RootStore>(rootStore);

  useEffect(() => {
    myTheme.setLightStatus(getInitialLightMode());
  }, []);

  // useEffect(() => {
  //   dispatch(setLightStatus(getInitialLightMode()));
  //   window.addEventListener("beforeunload", saveInLocalStorage);

  //   const authToken = localStorage.getItem(Storage.TOKEN);
  //   if (authToken) {
  //     dispatch(setLoginStatus(true));
  //   }

  //   return function cleanUp() {
  //     window.removeEventListener("beforeunload", saveInLocalStorage);
  //   };
  // }, [dispatch]);

  // const lightMode = useAppSelector(
  //   (state: RootState) => state.theme.lightStatus
  // );

  //const mainTheme = useMemo(() => createMainTheme(lightMode), [lightMode]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Chess</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StoreContext.Provider value={rootStore}>
        <Layout />
      </StoreContext.Provider>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  let allUsers: User[];
  let allGames: Game[];

  [allUsers, allGames] = await Promise.all([
    db.query<User[]>("SELECT * FROM users ORDER BY rating DESC"),
    db.query<Game[]>("SELECT * FROM games ORDER BY id DESC"),
  ]);

  db.end();

  const { games, users } = filterGamesAndUsersByDay(allGames, allUsers, "all");

  // const mainTableObject = new MainTable();
  // mainTableObject.regenerate(games, users);
  // const mainTable = mainTableObject.getTableOrderedBy(Order.RATING);

  return {
    props: {
      //mainTable: JSON.stringify(mainTable),
      users: JSON.stringify(allUsers),
      games: JSON.stringify(allGames),
    },
  };
}

export default Home;

// // helper functions

function saveInLocalStorage() {
  localStorage.setItem(
    Storage.LIGHT_MODE,
    JSON.stringify(store.getState().theme.lightStatus)
  );
}

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
