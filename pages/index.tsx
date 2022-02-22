import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";

import prisma from "../lib/prisma";

import { Toaster } from "react-hot-toast";

import { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { assignTables } from "../features/db/dbSlice";
import { setDayFilter } from "../features/filter/filterSlice";

import AppBarChess from "../components/AppBarChess";
import MainTable from "../components/MainTable";
import SelectDay from "../components/SelectDay";

function Home({
  users,
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const allUsers = JSON.parse(users) as Array<any>;
  const allGames = JSON.parse(games) as Array<any>;

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("index useEffect()");
    console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

    dispatch(assignTables({ users: allUsers, games: allGames }));
    dispatch(setDayFilter("all"));
  }, [allUsers, allGames, dispatch]);

  const requestStatus = useAppSelector(
    (state: RootState) => state.db.requestStatus
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Chess</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AppBarChess />

        <SelectDay allGames={allGames} />

        <MainTable />

        <Toaster />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
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
    prisma.user.findMany({ orderBy: { name: "asc" } }),
    prisma.game.findMany(),
  ]);

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
