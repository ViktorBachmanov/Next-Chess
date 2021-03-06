import type { InferGetStaticPropsType } from "next";
import Head from "next/head";

import { useContext } from "react";

import { db } from "../lib/db";

import { observer } from "mobx-react-lite";

import Tables, { filterGamesAndUsersByDay } from "../mobx/tables/Tables";
import { User, Game } from "../mobx/tables/types";
import { StoreContext } from "../components/Layout";

import MainTableComponent from "../components/MainTable";
import GamesTable from "../components/GamesTable";
import SelectDay from "../components/SelectDay";

import styles from "../styles/MainTable.module.css";

const Home = observer(function Home({
  //mainTable,
  users,
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //console.log("Home");

  //const initialMainTable = JSON.parse(mainTable) as MainTableRow[];
  const allUsers = JSON.parse(users) as User[];
  const allGames = JSON.parse(games) as Game[];

  const rootStore = useContext(StoreContext);

  if (!rootStore.tables) {
    rootStore.tables = new Tables(allUsers, allGames);
  }

  return (
    <>
      <Head>
        <title>Chess</title>
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SelectDay />

      <div className={styles.smartTable}>
        <div style={{ overflow: "auto" }}>
          <MainTableComponent
            isFixed={false}
            //initialMainTable={initialMainTable}
          />
        </div>
        <MainTableComponent
          isFixed={true}
          //initialMainTable={initialMainTable}
        />
      </div>

      <GamesTable />
    </>
  );
});

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

  const [games, users] = filterGamesAndUsersByDay(allGames, allUsers, "all");
  // const mainTableObj = new MainTable(users, games);
  // const initialMainTable = mainTableObj.getTableOrderedBy(Order.RATING);

  //console.log("initialMainTable: ", initialMainTable);

  return {
    props: {
      //mainTable: JSON.stringify(initialMainTable),
      users: JSON.stringify(allUsers),
      games: JSON.stringify(allGames),
    },
  };
}

export default Home;
