import React from "react";
import Header from "./header.js";
import LandmarkMap from "./map.js";

function Home() {
  return (
    <>
      <head>
        <title>Urban Refuge</title>
      </head>
      <body>
        <Header />
        <LandmarkMap />
      </body>
    </>
  );
}

export default Home;