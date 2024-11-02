"use client";
import React from "react";
import Script from "next/script";
import MapComponent from "./mapcomponent.js";
function Home() {
  return (
    <>
      <head>
        <title>Urban Refuge</title>
      </head>
      <body>
        <MapComponent />
      </body>
    </>
  );
}

export default Home;
