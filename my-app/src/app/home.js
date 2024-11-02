import React from "react";
import Head from "next/head";
import Map from "../Map";

function Home() {
  return (
    <>
      <Head>
        <title>Add a Map using HTML</title>
        <link rel="stylesheet" type="text/css" href="./style.css" />
      </Head>
      <main>
        <Map />
      </main>
    </>
  );
}

export default Home;
