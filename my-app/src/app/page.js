"use client";
import React from "react";
import Script from "next/script";
import MapComponent from "./mapcomponent.js";
function Home() {
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
        <title>Urban Refuge</title>
      </head>
      <body>
        <MapComponent />
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
