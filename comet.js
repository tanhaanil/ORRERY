const apiKey = "E13D5ieFc1bR44T6fODYRckPIuJOcdF2p3dJLgAa";
const baseUrl = "https://images-api.nasa.gov/search";

document.getElementById("search-button").addEventListener("click", function() {
    const cometName = document.getElementById("search-input").value;
    fetchCometData(cometName);
});

function fetchCometData(cometName) {
    const url = `${baseUrl}?q=${encodeURIComponent(cometName)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.collection.items);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            document.getElementById("search-result").innerHTML = `<p>Error fetching data. Please try again.</p>`;
        });
}

function displayResults(items) {
    const resultContainer = document.getElementById("search-result");
    resultContainer.innerHTML = ""; // Clear previous results

    if (!items || items.length === 0) {
        resultContainer.innerHTML = `<p>No results found for your search.</p>`;
        return;
    }

    items.forEach(item => {
        const mediaType = item.data[0].media_type; // Get media type
        const title = item.data[0].title; // Get title
        const nasaId = item.data[0].nasa_id; // Get NASA ID
        const imgUrl = item.links ? item.links[0].href : ''; // Image link
        const videoUrl = mediaType === 'video' ? item.data[0].description : ''; // Video link

        const cardHTML = `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${title}</span>
                    ${mediaType === 'image' ? `<img src="${imgUrl}" alt="${title}" class="responsive-img">` : ''}
                    ${mediaType === 'video' ? `<p>${videoUrl}</p>` : ''}
                </div>
            </div>
        `;

        resultContainer.innerHTML += cardHTML;
    });
}
