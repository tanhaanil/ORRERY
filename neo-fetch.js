// NASA API endpoint for today's NEOs
const url = 'https://api.nasa.gov/neo/rest/v1/feed/today?api_key=E13D5ieFc1bR44T6fODYRckPIuJOcdF2p3dJLgAa';

// Function to fetch NEO data
async function fetchNEOData() {
  try {
    const response = await fetch(url);  // Make the API request
    if (response.ok) {
      const data = await response.json();  // Parse the JSON response
      console.log(data);  // Display the data in the console or process it further
      displayNEOData(data);  // Optionally call a function to display the data
    } else {
      console.error('Error fetching NEO data:', response.status);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Example function to display NEO data (You can modify it as per your needs)
function displayNEOData(data) {
  const neoList = data.near_earth_objects;  // Extract NEOs from the data object
  const neoKeys = Object.keys(neoList);     // Dates of NEOs as keys (e.g., '2024-09-29')
  
  neoKeys.forEach(date => {
    console.log(`NEOs for date: ${date}`);
    neoList[date].forEach(neo => {
      console.log(`Name: ${neo.name}, Diameter (km): ${neo.estimated_diameter.kilometers.estimated_diameter_max}`);
      console.log(`Potentially Hazardous: ${neo.is_potentially_hazardous_asteroid}`);
    });
  });
}

// Call the function to fetch NEO data
fetchNEOData();
