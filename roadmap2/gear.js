/*
 * GEAR/ARMORY SCRIPT
 * This file handles all logic for the player customization screen.
 * - Defines available gear and their unlock conditions.
 * - Renders the gear items in the modal.
 * - Handles equipping and saving gear choices.
 */

// --- DATA: Define all available gear here ---
const ALL_GEAR = {
    gridSkins: [
        { id: 'grid_default', name: 'Default', unlockLevel: 0 },
        { id: 'grid_level_5', name: 'Vector', unlockLevel: 5 },
        { id: 'grid_level_10', name: 'Circuit', unlockLevel: 10 },
        // ... Add all 20 grid skins here
    ],
    arrowSkins: [
        { id: 'arrow_default', name: 'Default', unlockLevel: 0 },
        { id: 'arrow_level_5', name: 'Blades', unlockLevel: 5 },
        { id: 'arrow_level_10', name: 'Glyphs', unlockLevel: 10 },
        // ... Add all 20 arrow skins here
    ]
};

/**
 * Initializes the Gear/Armory feature.
 */
function initGearSystem() {
    console.log("Initializing Gear System...");
    
    // Populate the gear grids
    populateGearGrid('gridSkins', document.getElementById('grid-skins-container'));
    populateGearGrid('arrowSkins', document.getElementById('arrow-skins-container'));
    
    // Add event listeners
    const gearBtn = document.getElementById('hub-gear-btn');
    const gearModal = document.getElementById('gear-modal');
    const closeGearBtn = document.getElementById('close-gear-btn');

    gearBtn.addEventListener('click', () => {
        updateGearModal(); // Update visuals every time it's opened
        gearModal.classList.remove('hidden');
    });

    closeGearBtn.addEventListener('click', () => {
        gearModal.classList.add('hidden');
    });
}

/**
 * Creates the HTML for a specific category of gear.
 * @param {string} category - The key in the ALL_GEAR object (e.g., 'gridSkins').
 * @param {HTMLElement} container - The container element to populate.
 */
function populateGearGrid(category, container) {
    if (!container) return;
    container.innerHTML = ''; // Clear existing items

    ALL_GEAR[category].forEach(item => {
        const gearElement = document.createElement('div');
        gearElement.className = 'gear-item locked'; // Start as locked
        gearElement.dataset.gearId = item.id;
        
        gearElement.innerHTML = `
            <span class="gear-item-name">${item.name}</span>
            <span class="gear-item-unlock">Lvl ${item.unlockLevel}</span>
        `;
        
        gearElement.addEventListener('click', () => onGearItemClick(category, item, gearElement));
        container.appendChild(gearElement);
    });
}

/**
 * Updates the visual state (locked/unlocked/equipped) of all gear items.
 */
function updateGearModal() {
    const playerData = loadPlayerData();
    const playerLevel = playerData.highestWave || 0;
    const unlockedSonastras = playerData.unlockedSonastras || []; // We'll need to save this data later
    
    // Get current settings to see what's equipped
    const settings = JSON.parse(localStorage.getItem('sonostraSettings')) || defaultSettings;
    const equippedGrid = settings.gridSkin || 'grid_default';
    const equippedArrows = settings.arrowSkin || 'arrow_default';

    document.querySelectorAll('.gear-item').forEach(item => {
        const gearId = item.dataset.gearId;
        const category = item.parentElement.id.includes('grid') ? 'gridSkins' : 'arrowSkins';
        const gearData = ALL_GEAR[category].find(g => g.id === gearId);

        if (!gearData) return;

        // Check if unlocked
        // For now, we'll base it on player level. Later, we can base it on defeated Sonastras.
        if (playerLevel >= gearData.unlockLevel) {
            item.classList.remove('locked');
            item.classList.add('unlocked');
        } else {
            item.classList.add('locked');
            item.classList.remove('unlocked');
        }

        // Check if equipped
        if (gearId === equippedGrid || gearId === equippedArrows) {
            item.classList.add('equipped');
        } else {
            item.classList.remove('equipped');
        }
    });
}

/**
 * Handles the click event on a gear item.
 * @param {string} category - The category of the clicked item.
 * @param {object} itemData - The data object for the clicked item.
 * @param {HTMLElement} element - The clicked DOM element.
 */
function onGearItemClick(category, itemData, element) {
    if (element.classList.contains('locked')) {
        console.log(`Cannot equip locked item: ${itemData.name}`);
        return;
    }

    console.log(`Equipping ${itemData.name}`);
    
    // Update settings
    let settings = JSON.parse(localStorage.getItem('sonostraSettings')) || defaultSettings;
    if (category === 'gridSkins') {
        settings.gridSkin = itemData.id;
    } else if (category === 'arrowSkins') {
        settings.arrowSkin = itemData.id;
    }
    localStorage.setItem('sonostraSettings', JSON.stringify(settings));

    // Update the visuals of the modal immediately
    updateGearModal();

    // Apply the new settings to the game (we'll need to expand this part later)
    // For now, it might just be a visual confirmation.
    // applySettings(); 
}


// --- INITIALIZATION ---
// Must be called after the main script has defined its functions.
setTimeout(initGearSystem, 150);
