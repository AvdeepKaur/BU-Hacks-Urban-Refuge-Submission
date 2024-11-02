# BOSTONHACKS: MapRefuge

### Hackers: Avdeep Kaur, Brian Zeng, Kelvin Lin, Olivia Ma

>  - Main Track: **Comet Care**
> -  Side Tracks:
    -   **Urban Refuge**: A GIS-Powered, Privacy-First Challenge
    -   **MLH**: Best .Tech Domain Name
    -   **MLH** : Most Creative Adobe Express Add-on

# Welcome to MapRefuge!🗺️📌

MapRefuge is a **web-based application** designed to provide refugees, asylees, parolees, and other vulnerable individuals with **a secure, privacy-focused platform to locate essential resources**. With curated data and an intuitive map interface, MapRefuge helps users **find legal services, healthcare, housing, employment, and more, without tracking their personal information**.

Built on a foundation of privacy, MapRefuge leverages **Cloudflare**’s protection to ensure all user interactions are untrackable, and **Google Maps** integration allows users to locate nearby resources by type and specific accessibility needs.

## Main Features

-   **Privacy-First Design**: No tracking of user location or IP. Cloudflare shields user data, and the site operates without location-based requests.
-   **Resource Mapping**: Displays hard-coded resources from a CSV file, avoiding real-time tracking.
-   **Google Maps Integration**: Interactive map for viewing nearby essential services and resources.
-   **Filter and Search**: Allows users to filter resources based on accessibility, affordability, and type of service.
-   **User-Contributed Tags and Ratings**: Users can add relevant tags (e.g., LGBTQ+ friendly, wheelchair accessible) to improve information accuracy.
-   **Detailed Resource Information**: Provides basic details, ratings, and reviews for each location.

## Project Structure

- **Backend**🌍: Imports resource data from a CSV file and renders markers on the map.
-   **Frontend**🌎: Uses HTML, CSS, and JavaScript to display a Google Maps interface with customized markers.
-   **Data Privacy**🌏: Cloudflare’s SSL/TLS and IP masking features ensure user privacy, masking location and IP details.


## Getting Started

To get started with MapRefuge on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/MapRefuge.git
   ```
2. **Set up Cloudflare**:
   - Ensure the domain is linked with Cloudflare and SSL/TLS is set to **Full (Strict)** for secure end-to-end encryption.

3. **Integrate Google Maps API**:
   - Get an API key from the [Google Maps Platform](https://cloud.google.com/maps-platform/) and replace the placeholder `API_KEY` in your HTML file.

4. **Prepare Resource Data**:
   - Place your CSV file (`resources.csv`) in the designated directory, or convert it to `resources.json` for easy access by the frontend.

5. **Launch the Application**:
   - Open `index.html` in your preferred browser to test locally.

## Features Checklist 

- [x] **Cloudflare SSL/TLS Encryption**: Set up Full (Strict) SSL mode to secure user data.
- [x] **IP Masking**: User IPs are masked, protecting their identity and location.
- [x] **Map Display**: Shows curated resources on a Google Maps interface.
- [x] **CSV Data Integration**: Resource data imported from a CSV file or JSON format.
- [x] **Filter Options**: Users can filter resources by type, accessibility, cost, and more.
- [x] **User-Added Tags**: Tags like “LGBTQ+ Friendly” or “Wheelchair Accessible” help users identify relevant resources.
- [x] **Resource Information**: Displays names, addresses, phone numbers, ratings, and reviews for each resource.
- [x] **No User Location Requests**: Ensures no tracking by not requesting geolocation data from users.

## ✨ Future Enhancements✨

- **User Account System**: Optional registration to save favorite locations or personal notes.
- **Additional Filters**: Further filtering options for more refined searches.
- **Mobile Optimization**: Improved experience for mobile users accessing the application.

## Contributions

We welcome contributions! If you’d like to add features or help improve the project.