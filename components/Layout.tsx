import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { Toaster } from "react-hot-toast";

import AppBarChess from "../components/AppBarChess";
import MainTable from "../components/MainTable";
import SelectDay from "../components/SelectDay";

export default function Layout() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AppBarChess />

        <SelectDay />

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
