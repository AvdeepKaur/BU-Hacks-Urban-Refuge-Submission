"use client"; // Ensures this is treated as a client component in Next.js

import React, { useEffect } from "react";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const CONFIGURATION = {
  ctaTitle: "Submit",
  mapOptions: {
    center: { lat: 42.3601, lng: 71.0589 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 11,
    zoomControl: true,
    maxZoom: 22,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ visibility: "on" }],
      },
      { featureType: "poi.business", stylers: [{ visibility: "off" }] }, // Hide restaurants, stores, and other businesses
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#aadaff", visibility: "on" }],
      },
      {
        featureType: "poi.museum",
        elementType: "geometry",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [{ visibility: "on" }],
      },
    ],
  },
};

export default function MapComponent() {
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (document.getElementById("google-maps-script")) return;

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const map = new google.maps.Map(
        document.getElementById("map"),
        CONFIGURATION.mapOptions
      );
      const geocoder = new google.maps.Geocoder();
      const infowindow = new google.maps.InfoWindow();

      const handleFormSubmit = (e) => {
        e.preventDefault();
        const address = getAddressFromForm();
        geocodeAddress(geocoder, map, infowindow, address);
      };

      document
        .getElementById("address-form")
        .addEventListener("submit", handleFormSubmit);
    };

    const getAddressFromForm = () => {
      const fields = [
        "location",
        "locality",
        "administrative_area_level_1",
        "postal_code",
        "country",
      ];
      return fields
        .map((field) => document.getElementById(`${field}-input`).value)
        .join(" ");
    };

    const geocodeAddress = (geocoder, map, infowindow, address) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const place = results[0];
          map.setCenter(place.geometry.location);
          const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
          });

          const content = `
            <div>
              <h2>${place.formatted_address}</h2>
              <p>Latitude: ${place.geometry.location.lat()}</p>
              <p>Longitude: ${place.geometry.location.lng()}</p>
            </div>`;

          marker.addListener("click", () => {
            infowindow.setContent(content);
            infowindow.open(map, marker);
          });

          infowindow.setContent(content);
          infowindow.open(map, marker);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };

    loadGoogleMapsAPI();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "300px",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Enter Address</h3>
        <form id="address-form">
          <input
            type="text"
            placeholder="Address"
            id="location-input"
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="City"
            id="locality-input"
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="State/Province"
            id="administrative_area_level_1-input"
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Zip/Postal code"
            id="postal_code-input"
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Country"
            id="country-input"
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            {CONFIGURATION.ctaTitle}
          </button>
        </form>
      </div>
      <div
        id="map"
        style={{
          height: "500px",
          width: "600px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      ></div>
    </div>
  );
}

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
