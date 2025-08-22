/*
 * SONASTRA MAP SCRIPT (Phase 1 & 3)
 * This file handles all logic for the Sonastra hexagon challenge map.
 * - It generates the map's HTML structure.
 * - It checks the player's level (highest wave) against the map challenges.
 * - It dynamically unlocks hexagons based on player progress.
 * - It will handle click events to launch Sonastra challenges.
 */

/**
 * Initializes the entire Sonastra Map feature.
 * This function is called once from the main script.js when the hub is loaded.
 */
function initSonastraMap() {
    console.log("Initializing Sonastra Map...");
    generateHexGrid();
    updateSonastraMap();
}

/**
 * Creates the HTML for the hexagon grid and injects it into the map container.
 * This keeps our index.html clean.
 */
function generateHexGrid() {
    const mapContainer = document.getElementById('sonastra-map-container');
    if (!mapContainer) {
        console.error("Sonastra Map container not found!");
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'sonastra-grid';

    // We have 20 levels to unlock, from 5 to 100 in steps of 5.
    for (let i = 1; i <= 20; i++) {
        const levelToUnlock = i * 5;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'hexagon-wrapper';

        const hexagon = document.createElement('div');
        // Start all hexagons as locked. The update function will unlock them.
        hexagon.className = 'hexagon locked';
        hexagon.dataset.level = levelToUnlock;

        hexagon.innerHTML = `
            <span class="level-text">${levelToUnlock}</span>
            <span class="padlock">🔒</span>
        `;

        // Add a click listener for future use (Phase 4)
        hexagon.addEventListener('click', () => onHexagonClick(levelToUnlock, hexagon.classList.contains('unlocked')));

        wrapper.appendChild(hexagon);
        grid.appendChild(wrapper);
    }
    
    mapContainer.innerHTML = ''; // Clear any placeholders
    mapContainer.appendChild(grid);
}

/**
 * Checks the player's saved data and updates the visual state of the hexagons.
 * This is the core logic that handles unlocking challenges.
 */
function updateSonastraMap() {
    // We'll re-use the loadPlayerData function from the main script.
    const playerData = loadPlayerData(); 
    const playerLevel = playerData.highestWave || 0;

    console.log(`Updating map for Player Level: ${playerLevel}`);

    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach(hex => {
        const requiredLevel = parseInt(hex.dataset.level, 10);

        if (playerLevel >= requiredLevel) {
            // Player is high enough level, unlock this hexagon!
            hex.classList.remove('locked');
            hex.classList.add('unlocked');
        } else {
            // Player is not high enough, ensure it's locked.
            hex.classList.add('locked');
            hex.classList.remove('unlocked');
        }

        // TODO (Phase 6): Add logic here to check for completion data
        // and apply the '.completed' class if the player has beaten this Sonastra.
    });
}

/**
 * Handles the click event on a hexagon.
 * @param {number} level - The level of the Sonastra challenge.
 * @param {boolean} isUnlocked - Whether the clicked hexagon is currently unlocked.
 */
function onHexagonClick(level, isUnlocked) {
    if (isUnlocked) {
        console.log(`Player clicked unlocked Sonastra challenge for Level ${level}.`);
        // TODO (Phase 4):
        // 1. Hide the main hub view.
        // 2. Show the new "Antechamber" (sonastra-setup-modal).
        // 3. Populate the modal with the specific Sonastra's info and pre-determined video.
        alert(`Starting Sonastra Challenge: Level ${level}!`); // Placeholder
    } else {
        console.log(`Player clicked a locked hexagon for Level ${level}.`);
        // Maybe show a small, temporary message on the screen?
        // e.g., "Reach Wave {level} to unlock this challenge!"
    }
}


// --- INITIALIZATION ---
// We need to wait for the main script to be ready. A simple timeout works,
// but a more robust solution might use a custom event if we expand further.
setTimeout(initSonastraMap, 100);

