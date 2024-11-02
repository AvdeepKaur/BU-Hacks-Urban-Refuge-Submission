"use client"; // Ensures this is treated as a client component in Next.js

import React, { useEffect } from "react";

const CONFIGURATION = {
  ctaTitle: "Submit",
  mapOptions: {
    center: { lat: 37.4221, lng: -122.0841 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 11,
    zoomControl: true,
    maxZoom: 22,
  },
};

export default function MapComponent() {
  useEffect(() => {
    // Load Google Maps API dynamically
    const loadGoogleMapsAPI = () => {
      if (document.getElementById("google-maps-script")) {
        initMap();
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCA3yaFbVmsBYqh5O1R3Rd-6NEESD4TdbI&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => console.error("Google Maps script could not load.");
      document.head.appendChild(script);

      window.initMap = initMap;
    };

    const initMap = () => {
      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.error("Map element not found!");
        return;
      }

      const map = new google.maps.Map(mapElement, CONFIGURATION.mapOptions);
      const geocoder = new google.maps.Geocoder();

      const handleFormSubmit = (e) => {
        e.preventDefault();
        const address = getAddressFromForm();
        geocodeAddress(geocoder, map, address);
      };

      document.getElementById("address-form").addEventListener("submit", handleFormSubmit);
    };

    const getAddressFromForm = () => {
      const fields = ["location", "locality", "administrative_area_level_1", "postal_code", "country"];
      return fields.map((field) => document.getElementById(`${field}-input`).value).join(" ");
    };

    const geocodeAddress = (geocoder, map, address) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          new google.maps.Marker({
            map,
            position: location,
          });
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
        }
      });
    };

    loadGoogleMapsAPI();
  }, []);

  return (
<<<<<<< HEAD
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "20px" }}>
      <div style={{ width: "300px", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px" }}>
        <h3>Enter Address</h3>
        <form id="address-form">
          <input type="text" placeholder="Address" id="location-input" style={inputStyle} />
          <input type="text" placeholder="City" id="locality-input" style={inputStyle} />
          <input type="text" placeholder="State/Province" id="administrative_area_level_1-input" style={inputStyle} />
          <input type="text" placeholder="Zip/Postal code" id="postal_code-input" style={inputStyle} />
          <input type="text" placeholder="Country" id="country-input" style={inputStyle} />
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
      <div id="map" style={{ height: "500px", width: "600px", border: "1px solid #ddd", borderRadius: "8px" }}></div>
    </div>
=======
    <>
      <head>
        <title>Add a Map using HTML</title>
      </head>
      <body>
        <gmp-map
          center="42.3601,-71.0589"
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
>>>>>>> 5b5328fe6250ab7cddaa4064dc4df0cae62d2d77
  );
}

// Styles for the input fields and button
const inputStyle = {
  width: "100%",
  margin: "10px 0",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
};
