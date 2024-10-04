// Asteroids data (array of objects with asteroid details and videos)
const asteroids = [
    {
        img: "assets/apophis.png",
        video: "assets/apophis_orbit.mp4",
        modelLink: "https://www.spacereference.org/solar-system#ob=99942-apophis-2004-mn4",
        name: "99942 Apophis",
        info: "Apophis is a small Aten-class asteroid with a diameter of approximately 340 meters, comparable in size to the U.S. Capitol building. Apophis's orbit is 0.00 AU from Earth's orbit at its closest point, with a predicted pass within 38,012 kilometers (0.00024 AU) on April 13, 2029. Its orbit around the Sun takes 324 days (0.89 years). Apophis rotates on its axis once every 30.56 hours, and its spectral type suggests it is composed of silicate minerals.",
        hazardous: true,
    },
    {
        img: "assets/eros.png",
        video: "assets/eros_orbit.mp4",
        modelLink: "https://www.spacereference.org/solar-system#ob=433-eros-a898-pa",
        name: "433 Eros",
        info: "Eros is a large Amor-class asteroid with a diameter of approximately 16.8 kilometers, comparable in size to the city of Philadelphia. Eros's orbit is 0.15 AU from Earth's orbit at its closest point, and it is predicted to pass within 22.41 million kilometers (0.148 AU) of Earth in 2056. The asteroid orbits the Sun every 643 days (1.76 years) and completes a rotation on its axis every 5.27 hours. Its spectral type suggests that it is composed of silicate materials.",
        hazardous: false,
    },
    {
        img: "assets/itokawa.png",
        video: "assets/itokawa_orbit.mp4",
        modelLink: "https://www.spacereference.org/solar-system#ob=25143-itokawa-1998-sf36",
        name: "25143 Itokawa",
        info: "Itokawa is a small Apollo-class asteroid with a diameter of approximately 330 meters, comparable in size to a football field. Itokawa's orbit is within 0.01 AU of Earth's orbit at its closest point. The asteroid will make a close approach to Earth on March 23, 2033, passing within 12,760,467 kilometers (0.084 AU) of the planet. It completes an orbit around the Sun every 557 days (1.52 years). Itokawa rotates on its axis once every 12.13 hours, and its spectral type suggests that it is likely composed of silicate minerals.",
        hazardous: true,
    },
    {
        img: "assets/golevka.png",
        video: "assets/golevka_orbit.mp4",
        modelLink: "https://www.spacereference.org/solar-system#ob=6489-golevka-1991-jx",
        name: "6489 Golevka",
        info: "Golevka is a small Apollo-class asteroid with a diameter of approximately 0.5 kilometers, comparable in size to the Golden Gate Bridge. Golevka's orbit is 0.02 AU from Earth's orbit at its closest point, and it is predicted to pass within 7,600,131 kilometers (0.051 AU) of Earth in 2046. The asteroid orbits the Sun every 1,430 days (3.92 years) and completes a rotation on its axis every 6.03 hours. Its spectral type suggests that it is likely composed of silicate minerals.",
        hazardous: true,
    },
    {
        img: "assets/cruithne.png",
        video: "assets/cruithne_orbit.mp4",
        modelLink: "https://www.spacereference.org/solar-system#ob=3753-cruithne-1986-to",
        name: "3753 Cruithne",
        info: "Cruithne is a mid-sized Aten-class asteroid with a diameter of approximately 2.1 kilometers, comparable in size to Mount Everest. Cruithne's orbit is 0.07 AU from Earth's orbit at its closest point, and it is classified as a Near-Earth Asteroid (NEA). The asteroid orbits the Sun every 1,096 days (3.01 years) and completes a rotation on its axis every 5.9 hours. Its spectral type suggests that it is likely composed of silicate minerals.",
        hazardous: false,
    },
];

// Global variables
let currentAsteroidIndex = 0;
let score = 0; // Initialize score

// Load the first asteroid
function loadAsteroid(index) {
    const asteroid = asteroids[index];

    // Set the asteroid image
    document.getElementById("asteroidImg").src = asteroid.img;
    
    // Update asteroid info
    document.getElementById("asteroidInfo").textContent = `${asteroid.name}: ${asteroid.info}`;

    // Hide video while loading
    const videoElement = document.getElementById("asteroidVideo");
    videoElement.style.opacity = 0; // Hide the video

    // Set the video source for the current asteroid
    const videoSource = document.getElementById("asteroidVideoSource");
    videoSource.src = asteroid.video;
    videoElement.load();  // Reload video for the new source

    // Show video when it's ready
    videoElement.oncanplay = () => {
        videoElement.style.opacity = 1; // Show the video when it's ready
    };

    // Update the 3D model link
    const modelLinkElement = document.getElementById("modelLink");
    modelLinkElement.innerHTML = `<a href="${asteroid.modelLink}" target="_blank">View 3D Model of ${asteroid.name}</a>`;

    // Clear messages and actions
    document.getElementById("resultMessage").textContent = '';

    // Update button visibility
    updateButtonVisibility();

    // Update score display
    updateScoreDisplay();
}


// Function to update button visibility
function updateButtonVisibility() {
    document.getElementById("backButton").style.display = currentAsteroidIndex > 0 ? "inline" : "none";
    document.getElementById("nextButton").style.display = currentAsteroidIndex < asteroids.length - 1 ? "inline" : "none";
}

// Load the next asteroid upon clicking the Next button
function loadNextAsteroid() {
    if (currentAsteroidIndex < asteroids.length - 1) {
        currentAsteroidIndex++;
        loadAsteroid(currentAsteroidIndex);
    } else {
        document.getElementById("resultMessage").textContent = `Congratulations! You've successfully assessed all the asteroids.`;
    }
}

// Load the previous asteroid
function loadPreviousAsteroid() {
    if (currentAsteroidIndex > 0) {
        currentAsteroidIndex--;
        loadAsteroid(currentAsteroidIndex);
    }
}

// Function to handle the user's guess
function guess(isHazardous) {
    const asteroid = asteroids[currentAsteroidIndex];

    if (isHazardous === asteroid.hazardous) {
        // Correct guess
        if (asteroid.hazardous) {
            // Correct guess for a hazardous asteroid
            document.getElementById("resultMessage").textContent = "Spot on! You've detected a potential hazard!";
            document.getElementById("dartButton").style.display = "inline"; // Show the button for hazardous asteroid
        } else {
            // Correct guess for a non-hazardous asteroid
            document.getElementById("resultMessage").textContent = "Correct! This asteroid is harmless.";
            document.getElementById("dartButton").style.display = "none"; // Hide the button if not hazardous
        }
    } else {
        // Wrong guess
        if (asteroid.hazardous) {
            // Wrong guess for a hazardous asteroid
            document.getElementById("resultMessage").textContent = "Not quite! This one's a serious threat!";
        } else {
            // Wrong guess for a non-hazardous asteroid
            document.getElementById("resultMessage").textContent = "Oops! That one's harmless. Keep looking!";
        }

        document.getElementById("dartButton").style.display = "none"; // Hide the button on wrong guess
    }
}



// Function to handle DART mission launch
function launchDART() {
    document.getElementById("dartButton").style.display = "none"; // Hide the button after it's clicked

    // Redirect to the dartMission.html page
    window.location.href = "dartMission.html";
}


// Start the game by loading the first asteroid
loadAsteroid(currentAsteroidIndex);


