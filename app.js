window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Textbox elements to display asteroid size and distance
    const sizeInput = document.getElementById("size-input");
    const distanceInput = document.getElementById("distance-input");

    // Sun, Earth, and asteroid details
    const sun = { x: 400, y: 300, radius: 50 };
    const earth = { x: 600, y: 300, radius: 20 };
    let asteroid = {
        x: 200, y: 300, radius: 15,
        size: Math.random() * (300 - 100) + 100, // Random size between 100m and 300m
        orbitalDistance: Math.random() * 0.1 + 0.02 // Random distance between 0.02 AU and 0.12 AU
    };

    // Update the textboxes with asteroid size and orbital distance
    function updateAsteroidInfo() {
        sizeInput.value = Math.round(asteroid.size) + " meters";
        distanceInput.value = asteroid.orbitalDistance.toFixed(3) + " AU";
    }

    // Animation
    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the Sun
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();

        // Draw the Earth
        ctx.beginPath();
        ctx.arc(earth.x, earth.y, earth.radius, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();

        // Draw the asteroid
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();

        // Move asteroid in an orbit
        asteroid.x = 200 + 200 * Math.cos(Date.now() * 0.001);
        asteroid.y = 300 + 100 * Math.sin(Date.now() * 0.001);

        // Update asteroid information in the textboxes
        updateAsteroidInfo();

        requestAnimationFrame(draw);
    }

    draw();

    // Event listeners for buttons
    const safeBtn = document.getElementById("safe-btn");
    const hazardBtn = document.getElementById("hazard-btn");
    const decisionDialog = document.getElementById("decision-dialog");
    const decisionMessage = document.getElementById("decision-message");

    // Determine if the asteroid is hazardous
    function isHazardous(asteroid) {
        return asteroid.size > 140 && asteroid.orbitalDistance < 0.05; // Hazardous if larger than 140m and MOID < 0.05 AU
    }

    // User clicks "Safe"
    safeBtn.addEventListener("click", function () {
        const hazardous = isHazardous(asteroid);
        decisionDialog.style.display = "block";
        if (!hazardous) {
            decisionMessage.textContent = "Correct! The asteroid is safe.";
        } else {
            decisionMessage.textContent = "Wrong! The asteroid is hazardous.";
        }
    });

    // User clicks "Hazardous"
    hazardBtn.addEventListener("click", function () {
        const hazardous = isHazardous(asteroid);
        decisionDialog.style.display = "block";
        if (hazardous) {
            decisionMessage.textContent = "Correct! The asteroid is hazardous.";
        } else {
            decisionMessage.textContent = "Wrong! The asteroid is safe.";
        }
    });
};
