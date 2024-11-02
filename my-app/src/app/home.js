import React, { useEffect } from "react";
import Head from "next/head";
import Map from "../Map";

function Home() {
  useEffect(() => {
    // Load the Google Maps API script if it isn't already loaded
    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Urban Refuge</title>
      </Head>
      <div id="map" style={{ height: "400px", width: "500px" }}>
        <gmp-map
          center="42.3601,-71.0589"
          zoom="10"
          map-id="DEMO_MAP_ID"
        ></gmp-map>
      </div>
    </>
  );
}

export default Home;
