// ---------------------------------------------------------
// GLOBAL DECLARATIONS
// ---------------------------------------------------------

// var map = L.map('backgroundMap', {
//     "tap": false
// }).setView([50, 0], 3);

// // tile layers

// var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
//     attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
//   }
// );

// var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
//     attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
//   }
// );

// var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// var basemaps = {
//   "Streets": streets,
//   "Satellite": satellite
// };

// // buttons

// var infoBtn = L.easyButton("fa-info fa-xl", function (btn, map) {
//   $("#exampleModal").modal("show");
// });

// // ---------------------------------------------------------
// // EVENT HANDLERS
// // ---------------------------------------------------------

// // initialise and add controls once DOM is ready

// $(document).ready(function () {
  
//   map = L.map("map", {
//     layers: [streets]
//   }).setView([54.5, -4], 6);
  
//   // setView is not required in your application as you will be
//   // deploying map.fitBounds() on the country border polygon

//   layerControl = L.control.layers(basemaps).addTo(map);

//   infoBtn.addTo(map);

// })

// document.addEventListener("DOMContentLoaded", function () {
//   // Initialize the map
//   var map = L.map('map').setView([20, 0], 2);

//   // Add OpenStreetMap tiles
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//   }).addTo(map);

//   // Create a cluster group
//   let markersCluster = L.markerClusterGroup({
//       maxClusterRadius: 20000, // 20 km max distance between markers in the same cluster
//       iconCreateFunction: function (cluster) {
//           // Customize the cluster icon to show a circular number
//           let count = cluster.getChildCount();
//           return L.divIcon({
//               html: `<div style="
//                   background: #f28e2c; 
//                   border-radius: 50%; 
//                   width: 40px; 
//                   height: 40px; 
//                   line-height: 40px; 
//                   text-align: center; 
//                   color: white; 
//                   font-weight: bold;">
//                   ${count}
//                   </div>`,
//               className: 'custom-cluster-icon'
//           });
//       }
//   }).addTo(map);

//   // Dropdown country change event
//   document.getElementById('countrySelect').addEventListener('change', function () {
//       const selectedCountryName = this.options[this.selectedIndex].text;

//       // Fetch the GeoJSON file
//       fetch('./airports_plain.geojson') // Adjust path if needed
//           .then(response => response.json())
//           .then(data => {
//               // Clear previous markers
//               markersCluster.clearLayers();

//               const filteredFeatures = data.features.filter(feature => feature.properties.country === selectedCountryName);

//               if (filteredFeatures.length === 0) {
//                   console.warn('No airports found for the selected country:', selectedCountryName);
//                   return;
//               }

//               // Add markers for the filtered features
//               filteredFeatures.forEach(feature => {
//                   const coords = feature.geometry.coordinates; // GeoJSON uses [lon, lat]
//                   const popupContent = `<b>${feature.properties.nameshort || 'Unknown Location'}</b>`;
//                   const marker = L.marker([coords[1], coords[0]]).bindPopup(popupContent);

//                   // On click, zoom to marker and open popup
//                   marker.on('click', function () {
//                       map.setView([coords[1], coords[0]], 15);
//                       marker.openPopup();
//                   });

//                   markersCluster.addLayer(marker);
//               });

//               // Adjust the map view to fit all markers
//               const bounds = L.latLngBounds(
//                   filteredFeatures.map(feature => [feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
//               );
//               map.fitBounds(bounds);
//           })
//           .catch(error => console.error('Error loading GeoJSON:', error));
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  var map = L.map("map", {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    zoomControl: true,
  });

 


  // Add OpenStreetMap tiles
  const streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);


  const satelliteMap = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  );

  
  // Create MarkerClusterGroup for airports
  const airports = L.markerClusterGroup({
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    polygonOptions: {
      fillColor: "#FF5733",
      color: "#000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.5,
    },
  });

  // Icons for the airports
  const airportIcon = L.ExtraMarkers.icon({
    icon: "fa-plane",       
    prefix: "fa",           
    markerColor: "white",  
    shape: "circle",        
    iconColor: "white",     
  });
  
  L.marker([51.505, -0.09], { icon: airportIcon })
    .addTo(map)
    .bindPopup("Test Airport");

  
  // const baseMaps = {
  //   "Street Map": streetMap,
  // };
  const baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap,
  };
  

  const overlayMaps = {
    Airports: airports,
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);

  let countryBorderLayer; // Placeholder for the border layer

  // Function to highlight the country's border by name
  async function highlightCountryBordersByName(selectedCountryName) {
    // Fetch the GeoJSON file
    const response = await fetch("./countries.geo.json"); // Update the path
    const geoData = await response.json();

    // Find the country's feature in the GeoJSON by name
    const countryFeature = geoData.features.find(
      (feature) => feature.properties.name.toLowerCase() === selectedCountryName.toLowerCase()
    );

    if (!countryFeature) {
      console.error("Country not found in GeoJSON.");
      return;
    }

    // Remove the existing layer if it exists
    if (countryBorderLayer) {
      map.removeLayer(countryBorderLayer);
    }

    // Add the country's border to the map
    countryBorderLayer = L.geoJSON(countryFeature, {
      style: {
        color: "purple",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.3,
      },
    }).addTo(map);

    // Fit the map to the country's bounds
    map.fitBounds(countryBorderLayer.getBounds());
  }


  // Add country change dropdown functionality
  // document.getElementById("countrySelect").addEventListener("click", function () {
  document.getElementById("countrySelect").addEventListener("change", function () {
    const selectedCountryName = this.options[this.selectedIndex].text;
    highlightCountryBordersByName(selectedCountryName);


    // Fetch the GeoJSON file
    fetch("./airports_plain.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GeoJSON data");
        }
        return response.json();
      })
      .then((data) => {
        
        airports.clearLayers();

       
        const filteredFeatures = data.features.filter(
          (feature) => feature.properties.country === selectedCountryName
        );

        if (filteredFeatures.length === 0) {
          console.warn("No data found for the selected country:", selectedCountryName);
          return;
        }

        
        filteredFeatures.forEach((feature) => {
          const coords = feature.geometry.coordinates;
          const properties = feature.properties;

          const marker = L.marker([coords[1], coords[0]], { icon: airportIcon });
          marker.bindPopup(`<b>${properties.nameshort || "Unknown Airport"}</b>`);
          airports.addLayer(marker);
        });

        
        airports.addTo(map);

        
        const bounds = L.latLngBounds(
          filteredFeatures.map((feature) => [feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
        );
        map.fitBounds(bounds);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  });


  airports.addTo(map);

  function showCountryInfo(countryName) {
    const infoModal = new bootstrap.Modal(document.getElementById("infoModal"));
  
    // Get country details
    const country = countryData[countryName];
    if (!country) {
      alert("Country details not found.");
      return;
    }
  
    // Update modal content dynamically
    document.querySelector("#infoModal .modal-body").innerHTML = `
      <p><strong>Continent:</strong> ${country.continent}</p>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Languages:</strong> ${country.languages}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Area:</strong> ${country.area}</p>
    `;
  
    // Show the modal
    infoModal.show();
  }

  const infoButton = document.getElementById("infoButton");
  const infoModal = new bootstrap.Modal(document.getElementById("infoModal"));

  // Add click event listener to the info button
  infoButton.addEventListener("click", () => {
    infoModal.show(); // Show the modal when the button is clicked
  });
});
