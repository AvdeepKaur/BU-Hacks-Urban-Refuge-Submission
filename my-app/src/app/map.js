"use client"; // Ensures this is treated as a client component in Next.js

import React, { useEffect, useState } from "react";

const CONFIGURATION = {
  ctaTitle: "Load Locations",
  mapOptions: {
    center: { lat: 42.3601, lng: -71.0589 }, // Center map on Boston
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 12,
    zoomControl: true,
    maxZoom: 22,
  },
};

export default function LandmarkMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (document.getElementById("google-maps-script")) return;

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const newMap = new google.maps.Map(document.getElementById("map"), CONFIGURATION.mapOptions);
      setMap(newMap);
    };

    loadGoogleMapsAPI();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/readData");
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch error:", response.status, errorText);
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch failed:", error);
      throw error;
    }
  };
  

  // Plot addresses as markers on the map
  const plotAddresses = async () => {
    if (!map) return; // Ensure the map has loaded
    const addressData = await fetchAddresses();
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();

    addressData.forEach((location) => {
      const fullAddress = `${location.Street}, ${location.City}`;
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === "OK" && results[0]) {
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: location["Name of Organization"],
          });

          // Info window content on marker click
          marker.addListener("click", () => {
            infowindow.setContent(`
              <div>
                <h2>${location["Name of Organization"]}</h2>
                <p>${location["Summary of Services"]}</p>
                <p><strong>Address:</strong> ${fullAddress}</p>
                <p><strong>Website:</strong> <a href="${location.Website}" target="_blank">${location.Website}</a></p>
              </div>
            `);
            infowindow.open(map, marker);
          });
        }
      });
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    plotAddresses();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "20px" }}>
      <div style={{ width: "300px", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px" }}>
        <h3>Load Locations from CSV</h3>
        <form onSubmit={handleFormSubmit}>
          <button type="submit" style={buttonStyle}>{CONFIGURATION.ctaTitle}</button>
        </form>
      </div>
      <div id="map" style={{ height: "500px", width: "600px", border: "1px solid #ddd", borderRadius: "8px" }}></div>
    </div>
  );
}

// Styles for the input fields and button
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
