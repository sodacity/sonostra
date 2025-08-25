/*
 * SONASTRA MAP SCRIPT (Phase 1 & 3)
 * This file handles all logic for the Sonastra hexagon challenge map.
 * - It generates the map's HTML structure.
 * - It checks the player's level (highest wave) against the map challenges.
 * - It dynamically unlocks hexagons based on player progress.
 * - It will handle click events to launch Sonastra challenges.
 */

// --- DOM Elements for the Sonastra Setup Modal ---
let sonastraSetupModal;
let sonastraSetupContent; // For animation
let closeSonastraBtn;
let startSonastraBtn;


/**
 * Initializes the entire Sonastra Map feature.
 * This function is called once from the main script.js when the hub is loaded.
 */
function initSonastraMap() {
    console.log("Initializing Sonastra Map...");
    
    // --- Get Modal elements ---
    sonastraSetupModal = document.getElementById('sonastra-setup-modal');
    sonastraSetupContent = document.getElementById('sonastra-setup-content');
    closeSonastraBtn = document.getElementById('close-sonastra-setup-btn');
    startSonastraBtn = document.getElementById('start-sonastra-challenge-btn');

    generateHexGrid();
    updateSonastraMap();
    
    // --- Animate Out and Hide Logic ---
    const hideModal = () => {
        sonastraSetupContent.classList.add('anim-pop-out');
        sonastraSetupContent.addEventListener('animationend', () => {
            sonastraSetupModal.classList.add('hidden');
            sonastraSetupContent.classList.remove('anim-pop-out');
        }, { once: true });
    };

    // --- Add event listeners for the new modal ---
    if(closeSonastraBtn) {
        closeSonastraBtn.addEventListener('click', hideModal);
    }

    if(startSonastraBtn) {
        startSonastraBtn.addEventListener('click', () => {
            const level = sonastraSetupModal.dataset.level;
            console.log(`Confirmed: Starting Sonastra challenge for level ${level}!`);
            // TODO: Add logic here to actually start the challenge
            hideModal();
        });
    }
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

        // Add a click listener
        hexagon.addEventListener('click', () => onHexagonClick(levelToUnlock, hexagon.classList.contains('unlocked')));

        // *** THIS IS THE CORRECTED LINE ***
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
        
        // --- UPDATED LOGIC ---
        // Store the level on the modal
        sonastraSetupModal.dataset.level = level;
        
        // Show the modal and trigger the animation
        sonastraSetupModal.classList.remove('hidden');
        sonastraSetupContent.classList.remove('anim-pop-out'); // Reset animation state if it was closed before
        sonastraSetupContent.classList.add('anim-pop-in');

    } else {
        console.log(`Player clicked a locked hexagon for Level ${level}.`);
        // We could add a little shake animation or a tooltip here later!
    }
}


// --- INITIALIZATION ---
// We need to wait for the main script to be ready. A simple timeout works.
setTimeout(initSonastraMap, 100);