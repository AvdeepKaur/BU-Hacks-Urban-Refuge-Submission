import React from 'react';
import Script from 'next/script';

function Home() {
  return (
    <>
      <head>
        <title>Add a Map using HTML</title>
      </head>
      <body>
        <gmp-map
          center="37.4220656,-122.0840897"
          zoom="10"
          map-id="DEMO_MAP_ID"
          style={{ height: '400px' }}
        ></gmp-map>
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA3yaFbVmsBYqh5O1R3Rd-6NEESD4TdbI&libraries=maps&v=beta"
          strategy="lazyOnload"
        />
        <Script type="module" src="./index.js" strategy="lazyOnload" />
      </body>
    </>
  );
}

export default Home;
