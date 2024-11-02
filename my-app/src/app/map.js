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

const ADDRESS_COMPONENT_TYPES_IN_FORM = [
  "location",
  "locality",
  "administrative_area_level_1",
  "postal_code",
  "country",
];

export default function MapComponent() {
  useEffect(() => {
    // Helper function to load Google Maps API dynamically
    const loadGoogleMapsAPI = (callback) => {
      if (document.getElementById("google-maps-script")) {
        callback();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callback.name}`;
      script.id = "google-maps-script";
      script.async = true;
      script.defer = true;
      script.onerror = () => console.error("Google Maps script could not load.");
      document.head.appendChild(script);
    };

    // Function to initialize the map and set up geocoding
    const initMap = () => {
      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.error("Map element not found!");
        return;
      }

      const map = new google.maps.Map(mapElement, CONFIGURATION.mapOptions);
      const geocoder = new google.maps.Geocoder();

      ADDRESS_COMPONENT_TYPES_IN_FORM.forEach((componentType) => {
        const inputEl = document.getElementById(`${componentType}-input`);
        if (inputEl) {
          inputEl.addEventListener("blur", () => geocodeAddress(geocoder, map));
          inputEl.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
              geocodeAddress(geocoder, map);
            }
          });
        }
      });
    };

    // Geocode and render address on the map
    const geocodeAddress = (geocoder, map) => {
      const address = ADDRESS_COMPONENT_TYPES_IN_FORM.map(
        (componentType) => document.getElementById(`${componentType}-input`)?.value || ""
      ).join(" ");

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const place = results[0];
          const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
          });
          map.setCenter(place.geometry.location);
          marker.setPosition(place.geometry.location);
        }
      });
    };

    // Load the Google Maps API and initialize the map
    loadGoogleMapsAPI(initMap);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ padding: "20px", width: "300px", backgroundColor: "#f0f0f0", border: "1px solid #ddd" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <img
            src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg"
            alt="Location icon"
            style={{ marginRight: "8px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Address Selection</span>
        </div>
        <input type="text" placeholder="Address" id="location-input" style={inputStyle} />
        <input type="text" placeholder="Apt, Suite, etc (optional)" style={inputStyle} />
        <input type="text" placeholder="City" id="locality-input" style={inputStyle} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input type="text" placeholder="State/Province" id="administrative_area_level_1-input" style={halfInputStyle} />
          <input type="text" placeholder="Zip/Postal code" id="postal_code-input" style={halfInputStyle} />
        </div>
        <input type="text" placeholder="Country" id="country-input" style={inputStyle} />
        <button style={{ marginTop: "20px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none" }}>
          {CONFIGURATION.ctaTitle}
        </button>
      </div>
      <div id="map" style={{ height: "500px", width: "600px", marginLeft: "20px", border: "1px solid #ddd" }}></div>
    </div>
  );
}

// Common styling
const inputStyle = {
  height: "30px",
  width: "100%",
  margin: "8px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "0 10px",
  fontSize: "14px",
};

const halfInputStyle = {
  ...inputStyle,
  width: "48%",
};
