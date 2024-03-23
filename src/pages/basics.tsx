import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="Lock your cock"
          content="Lock your $DIC and earn rewards."
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;
