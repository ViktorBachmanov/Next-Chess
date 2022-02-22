import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";

import prisma from "../lib/prisma";

import { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { assignTables } from "../features/db/dbSlice";
import { RequestStatus } from "../features/types";
import {
  synchronizeMainTable,
  setDayFilter,
} from "../features/filter/filterSlice";

import AppBarChess from "../components/AppBarChess";
import MainTable from "../components/MainTable";
import SelectDay from "../components/SelectDay";

// function mapStateToProps(state: RootState) {
//   return {
//     allGames: state.db.games,
//     games: state.filter.games,
//     requestStatus: state.filter.requestStatus,
//     mainTable: state.filter.mainTable,
//     orderBy: state.filter.orderBy,
//   };
// }

// const mapDispatchToProps = {
//   setDayFilter: setDayFilterAction,
//   setOrder: setOrderAction,
//   synchronizeMainTable: synchronizeMainTableAction,
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// interface Props {
//   users: Array<any>;
//   games: Array<any>;
// }

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
    //dispatch(synchronizeMainTable());
    dispatch(setDayFilter("all"));
  }, [allUsers, allGames, dispatch]);

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

  //console.log("games: ", games);

  // let users: any;
  // let games: any;
  //[users, games] = tables;

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
