import React from 'react';

function Home() {
  return (
    <>
      <head>
        <title>Add a Map using HTML</title>

        <link rel="stylesheet" type="text/css" href="./style.css" />
        <script type="module" src="./index.js"></script>
      </head>
      <body>
        <gmp-map
          center="37.4220656,-122.0840897"
          zoom="10"
          map-id="DEMO_MAP_ID"
          style="height: 400px"
        ></gmp-map>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA3yaFbVmsBYqh5O1R3Rd-6NEESD4TdbI&libraries=maps&v=beta"
          defer
        ></script>
      </body>
    </>
  );
}

export default Home;
