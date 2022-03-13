import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/MainTable.module.css";

import { Toaster } from "react-hot-toast";

import AppBarChess from "../components/AppBarChess";
import MainTable from "../components/MainTable";
import GamesTable from "../components/GamesTable";
import SelectDay from "../components/SelectDay";

import { MainTableRow } from "../features/filter/types";

interface Props {
  initialMainTable: MainTableRow[];
}

export default function Layout(props: Props) {
  const { initialMainTable } = props;

  return (
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
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
