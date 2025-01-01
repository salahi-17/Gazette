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
    const response = await fetch("./libs/php/countryBorders.geo.json"); // Update the path
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

  async function showCountryInfoModal(countryName) {
    const country = await getCountryDetailsByName(countryName);
  
    if (country) {
      document.querySelector("#infoModal .modal-body").innerHTML = `
        <p><strong>Country:</strong> ${country.country}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Area:</strong> ${country.area} km²</p>
        <p><strong>Currency:</strong> ${country.currencyName} (${country.currencyCode})</p>
        <p><strong>Languages:</strong> ${country.languages}</p>
      `;
  
      const infoModal = new bootstrap.Modal(document.getElementById("infoModal"));
      infoModal.show();
    } else {
      alert("Country information not found.");
    }
  }

  const infoButton = document.getElementById("infoButton");
  const infoModal = new bootstrap.Modal(document.getElementById("infoModal"));

  async function getCountryDetailsByName(countryName) {
    const countries = await fetchCountryInfo();
  
    // Find the country by name
    const country = countries.find(
      (c) => c.country.toLowerCase() === countryName.toLowerCase()
    );
  
    if (country) {
      console.log(country);
      return country;
    } else {
      console.error("Country not found.");
      return null;
    }
  }


  // Fetch and process the country info file
  async function fetchCountryInfo() {
    const response = await fetch("libs/php/countryInfo.txt"); 
    const data = await response.text();

  
    const lines = data.split("\n");

   
    const countries = lines
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const fields = line.split("\t"); // Tab-separated fields
        return {
          iso: fields[0]?.trim(),
          iso3: fields[1]?.trim(),
          country: fields[4]?.trim(),
          capital: fields[5]?.trim(),
          area: fields[6]?.trim(),
          population: fields[7]?.trim(),
          continent: fields[8]?.trim(),
          currencyCode: fields[10]?.trim(),
          currencyName: fields[11]?.trim(),
          languages: fields[9]?.trim(),
        };
      });

    return countries;
  }




  
  // Add click event listener to the info button
  infoButton.addEventListener("click", async () => {
    
    const countryDropdown = document.getElementById("countrySelect");
    const selectedCountryName = countryDropdown.options[countryDropdown.selectedIndex].text;

    
    if (selectedCountryName) {
      
      showCountryInfoModal(selectedCountryName);
    } else {
      
      alert("Please select a country from the dropdown.");
    }
  });
  
});

 // Wallet Button Click Event



// Fetch and Populate All Currencies in Dropdown
async function populateCurrencyDropdown() {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await response.json();

    const currencyDropdown = document.getElementById('currencyTo');
    currencyDropdown.innerHTML = ''; // Clear existing options

    for (const currency in data.rates) {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = `${currency} - ${getCurrencyFullName(currency)}`;
      currencyDropdown.appendChild(option);
    }
  } catch (error) {
    console.error('Failed to fetch currency list:', error);
  }
}

// Helper Function to Map Currency Codes to Full Names
function getCurrencyFullName(code) {
  const currencyNames = {
    AED: "United Arab Emirates Dirham",
    AFN: "Afghan Afghani",
    ALL: "Albanian Lek",
    AMD: "Armenian Dram",
    ANG: "Netherlands Antillean Guilder",
    AOA: "Angolan Kwanza",
    ARS: "Argentine Peso",
    AUD: "Australian Dollar",
    AWG: "Aruban Florin",
    AZN: "Azerbaijani Manat",
    BAM: "Bosnia and Herzegovina Convertible Mark",
    BBD: "Barbadian Dollar",
    BDT: "Bangladeshi Taka",
    BGN: "Bulgarian Lev",
    BHD: "Bahraini Dinar",
    BIF: "Burundian Franc",
    BMD: "Bermudian Dollar",
    BND: "Brunei Dollar",
    BOB: "Bolivian Boliviano",
    BRL: "Brazilian Real",
    BSD: "Bahamian Dollar",
    BTN: "Bhutanese Ngultrum",
    BWP: "Botswanan Pula",
    BYN: "Belarusian Ruble",
    BZD: "Belize Dollar",
    CAD: "Canadian Dollar",
    CDF: "Congolese Franc",
    CHF: "Swiss Franc",
    CLP: "Chilean Peso",
    CNY: "Chinese Yuan",
    COP: "Colombian Peso",
    CRC: "Costa Rican Colón",
    CUP: "Cuban Peso",
    CVE: "Cape Verdean Escudo",
    CZK: "Czech Republic Koruna",
    DJF: "Djiboutian Franc",
    DKK: "Danish Krone",
    DOP: "Dominican Peso",
    DZD: "Algerian Dinar",
    EGP: "Egyptian Pound",
    ERN: "Eritrean Nakfa",
    ETB: "Ethiopian Birr",
    EUR: "Euro",
    FJD: "Fijian Dollar",
    FKP: "Falkland Islands Pound",
    FOK: "Faroese Króna",
    FJD: "Fijian Dollar",
    FKP: "Falkland Islands Pound",
    FOK: "Faroese Króna",
    GBP: "British Pound Sterling",
    GEL: "Georgian Lari",
    GGP: "Guernsey Pound",
    GHS: "Ghanaian Cedi",
    GIP: "Gibraltar Pound",
    GMD: "Gambian Dalasi",
    GNF: "Guinean Franc",
    GTQ: "Guatemalan Quetzal",
    GYD: "Guyanaese Dollar",
    HKD: "Hong Kong Dollar",
    HNL: "Honduran Lempira",
    HRK: "Croatian Kuna",
    HTG: "Haitian Gourde",
    HUF: "Hungarian Forint",
    IDR: "Indonesian Rupiah",
    ILS: "Israeli New Sheqel",
    IMP: "Isle of Man Pound",
    INR: "Indian Rupee",
    IQD: "Iraqi Dinar",
    IRR: "Iranian Rial",
    ISK: "Icelandic Króna",
    JEP: "Jersey Pound",
    JMD: "Jamaican Dollar",
    JOD: "Jordanian Dinar",
    JPY: "Japanese Yen",
    KES: "Kenyan Shilling",
    KGS: "Kyrgystani Som",
    KHR: "Cambodian Riel",
    KID: "Kiribati Dollar",
    KRW: "South Korean Won",
    KWD: "Kuwaiti Dinar",
    KYD: "Cayman Islands Dollar",
    KZT: "Kazakhstani Tenge",
    LAK: "Laotian Kip",
    LBP: "Lebanese Pound",
    LKR: "Sri Lankan Rupee",
    LRD: "Liberian Dollar",
    LSL: "Lesotho Loti",
    LYD: "Libyan Dinar",
    MAD: "Moroccan Dirham",
    MDL: "Moldovan Leu",
    MGA: "Malagasy Ariary",
    MKD: "Macedonian Denar",
    MMK: "Myanma Kyat",
    MNT: "Mongolian Tugrik",
    MOP: "Macanese Pataca",
    MRU: "Mauritanian Ouguiya",
    MUR: "Mauritian Rupee",
    MVR: "Maldivian Rufiyaa",
    MWK: "Malawian Kwacha",
    MXN: "Mexican Peso",
    MYR: "Malaysian Ringgit",
    MZN: "Mozambican Metical",
    NAD: "Namibian Dollar",
    NGN: "Nigerian Naira",
    NIO: "Nicaraguan Córdoba",
    NOK: "Norwegian Krone",
    NPR: "Nepalese Rupee",
    NZD: "New Zealand Dollar",
    OMR: "Omani Rial",
    PAB: "Panamanian Balboa",
    PEN: "Peruvian Nuevo Sol",
    PGK: "Papua New Guinean Kina",
    PHP: "Philippine Peso",
    PKR: "Pakistani Rupee",
    PLN: "Polish Złoty",
    PYG: "Paraguayan Guarani",
    QAR: "Qatari Rial",
    RON: "Romanian Leu",
    RSD: "Serbian Dinar",
    RUB: "Russian Ruble",
    RWF: "Rwandan Franc",
    SAR: "Saudi Riyal",
    SBD: "Solomon Islands Dollar",
    SCR: "Seychellois Rupee",
    SDG: "Sudanese Pound",
    SEK: "Swedish Krona",
    SGD: "Singapore Dollar",
    SHP: "Saint Helena Pound",
    SLL: "Sierra Leonean Leone",
    SOS: "Somali Shilling",
    SRD: "Surinamese Dollar",
    STN: "São Tomé and Príncipe Dobra",
    SYP: "Syrian Pound",
    SZL: "Swazi Lilangeni",
    THB: "Thai Baht",
    TJS: "Tajikistani Somoni",
    TMT: "Turkmenistani Manat",
    TND: "Tunisian Dinar",
    TOP: "Tongan Pa'anga",
    TRY: "Turkish Lira",
    TTD: "Trinidad and Tobago Dollar",
    TWD: "New Taiwan Dollar",
    TZS: "Tanzanian Shilling",
    UAH: "Ukrainian Hryvnia",
    UGX: "Ugandan Shilling",
    USD: "United States Dollar",
    UYU: "Uruguayan Peso",
    UZS: "Uzbekistan Som",
    VES: "Venezuelan Bolívar",
    VND: "Vietnamese Dong",
    VUV: "Vanuatu Vatu",
    WST: "Samoan Tala",
    XAF: "Central African CFA franc",
    XCD: "East Caribbean Dollar",
    XOF: "Central African CFA franc",
    XPF: "CFP Franc",
    YER: "Yemeni Rial",
    ZAR: "South African Rand",
    ZMW: "Zambian Kwacha",
    ZWL: "Zimbabwean Dollar",
    // Add more common currencies if needed
  };

  return currencyNames[code] || code; // Default to code if name is unavailable
}

  // Open Modal and Populate Dropdown
  document.getElementById('walletButton').addEventListener('click', () => {
    populateCurrencyDropdown();
    const currencyModal = new bootstrap.Modal(document.getElementById('currencyModal'));
    currencyModal.show();
  });

  // Currency Conversion Logic
  document.getElementById('convertCurrency').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const targetCurrency = document.getElementById('currencyTo').value;

    if (isNaN(amount) || amount <= 0 || !targetCurrency) {
      alert('Please enter a valid amount and select a currency.');
      return;
    }

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const data = await response.json();

      if (data.rates[targetCurrency]) {
        const convertedAmount = (amount * data.rates[targetCurrency]).toFixed(2);
        document.getElementById('currencyResult').value = `${convertedAmount} ${targetCurrency}`;
      } else {
        alert('Currency not supported.');
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      alert('Failed to fetch exchange rates. Please try again.');
    }
  });


  // Weather Button Click Event
  document.getElementById('weatherButton').addEventListener('click', async () => {
    try {
      const weatherModal = new bootstrap.Modal(document.getElementById('weatherModal'));
      weatherModal.show();

      const userLocation = await getUserLocation();
      const { latitude, longitude } = userLocation.coords;

      fetchWeatherData(latitude, longitude);
    } catch (error) {
      console.error('Error fetching user location for weather:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  });

  // Fetch Weather Data
  async function fetchWeatherData(lat, lon) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c7ec83037380441f874230709243112&q=${lat},${lon}&days=3`);
      const data = await response.json();

      if (data) {
        // Today's Weather
        document.getElementById('weatherTodayCondition').innerText = data.current.condition.text;
        document.getElementById('weatherTodayIcon').src = `https:${data.current.condition.icon}`;
        document.getElementById('weatherTodayTemp').innerText = `${data.current.temp_c}°C`;

        // Day 1 Weather
        document.getElementById('weatherDay1Date').innerText = data.forecast.forecastday[1].date;
        document.getElementById('weatherDay1Icon').src = `https:${data.forecast.forecastday[1].day.condition.icon}`;
        document.getElementById('weatherDay1Temp').innerText = `${data.forecast.forecastday[1].day.avgtemp_c}°C`;

        // Day 2 Weather
        document.getElementById('weatherDay2Date').innerText = data.forecast.forecastday[2].date;
        document.getElementById('weatherDay2Icon').src = `https:${data.forecast.forecastday[2].day.condition.icon}`;
        document.getElementById('weatherDay2Temp').innerText = `${data.forecast.forecastday[2].day.avgtemp_c}°C`;
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please check your API key.');
    }
  }

  // Get User Location
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }


  // Wikipedia Button Click Event
  document.getElementById('wikipediaButton').addEventListener('click', async () => {
    try {
      const selectedCountry = document.getElementById('countrySelect').value; // Get selected country code

      if (!selectedCountry) {
        alert('Please select a country first.');
        return;
      }

      const countryDetails = await fetchWikipediaDetails(selectedCountry);
      displayWikipediaDetails(countryDetails);
    } catch (error) {
      console.error('Error fetching Wikipedia details:', error);
      alert('Failed to fetch Wikipedia details. Please try again.');
    }
  });

  // Fetch Wikipedia Details
  async function fetchWikipediaDetails(countryCode) {
    try {
      const response = await fetch(`libs/php/Wikipedia.php?countryCode=${countryCode}`);
      const data = await response.json();

      if (data && data.data && data.data.geonames.length > 0) {
        const wikiData = data.data.geonames[0];
        return {
          summary: wikiData.summary || 'No summary available.',
          title: wikiData.title || 'No title available.',
          link: wikiData.wikipediaUrl ? `https://${wikiData.wikipediaUrl}` : '#'
        };
      } else {
        throw new Error('No Wikipedia details found for this country.');
      }
    } catch (error) {
      console.error('Error in Wikipedia API:', error);
      throw error;
    }
  }

  // Display Wikipedia Details in Modal
  function displayWikipediaDetails(details) {
    document.getElementById('wikiSummary').innerText = details.summary;
    document.getElementById('wikiTitle').innerText = details.title;
    document.getElementById('wikiLink').href = details.link;
    document.getElementById('wikiLink').innerText = details.link;

    const wikiModal = new bootstrap.Modal(document.getElementById('wikipediaModal'));
    wikiModal.show();
  }

