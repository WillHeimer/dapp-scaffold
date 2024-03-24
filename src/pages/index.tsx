import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Degen Inu Liquidity Locker</title>
        <meta
          name="description"
          content="Degen Inu Liquidity Locker"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
