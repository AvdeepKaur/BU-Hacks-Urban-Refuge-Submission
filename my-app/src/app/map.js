import React, { useEffect } from "react";

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: 42.3601, lng: 71.0589 },
    zoom: 8,
  });
}

export default function MapComponent() {
  useEffect(() => {
    // Check if the Google Maps script is already added
    if (!document.querySelector("script#google-maps")) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=maps&v=beta`;
      script.id = "google-maps";
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
}
