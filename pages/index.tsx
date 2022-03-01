import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { useEffect, useMemo } from "react";

import prisma from "../lib/prisma";

import { db } from "../lib/db";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Toaster } from "react-hot-toast";

import { RootState, store } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { assignTables } from "../features/db/dbSlice";
import { setDayFilter } from "../features/filter/filterSlice";

import Layout from "../components/Layout";

import createMainTheme from "../features/theme/muiTheme";
import { LightStatus } from "../features/theme/types";
import { setLightStatus } from "../features/theme/themeSlice";

import { Storage } from "../constants";

function Home({
  users,
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLightStatus(getInitialLightMode()));
    window.addEventListener("beforeunload", saveInLocalStorage);

    return function cleanUp() {
      window.removeEventListener("beforeunload", saveInLocalStorage);
    };
  }, []);

  useEffect(() => {
    console.log("index useEffect()");
    console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

    //fetch("/api/auth/hash");
    //fetch("/api/auth/sendmail");

    const allUsers = JSON.parse(users) as Array<any>;
    const allGames = JSON.parse(games) as Array<any>;

    dispatch(assignTables({ users: allUsers, games: allGames }));
    dispatch(setDayFilter("all"));
    console.log(navigator.userAgent);
  }, [users, games, dispatch]);

  // const requestStatus = useAppSelector(
  //   (state: RootState) => state.db.requestStatus
  // );

  const lightMode = useAppSelector(
    (state: RootState) => state.theme.lightStatus
  );

  const mainTheme = useMemo(() => createMainTheme(lightMode), [lightMode]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Chess</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const [users, games] = await Promise.all([
    //prisma.user.findMany({ orderBy: { name: "asc" } }),
    //prisma.game.findMany(),
    db.query("SELECT * FROM users ORDER BY rating DESC"),
    db.query("SELECT * FROM games ORDER BY id DESC"),
  ]);

  db.end();

  // fetch("/api/db/mysql")
  //     .then(
  //       (rslt) => {
  //         const prms = rslt.json();
  //         console.log("/api/db/mysql: ", prms);
  //         return prms;
  //       }
  //       //(err) => console.log("/api/db/mysql rejected", err)
  //     )
  //     .then((data) => {
  //       console.log("/api/db/mysql result: ", data);
  //     });

  // By returning { props: { users, games } }, the Home component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users: JSON.stringify(users),
      games: JSON.stringify(games),
    },
  };
}

export default Home;

// helper functions

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
