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
        { id: 'grid_light_shadow', name: 'Light Shadow', unlockLevel: 5 },
        { id: 'grid_inset', name: 'Inset', unlockLevel: 10 },
        { id: 'grid_inverted', name: 'Inverted', unlockLevel: 15 },
    ],
    arrowSkins: [
        { id: 'arrow_default', name: 'Default', unlockLevel: 0 },
        { id: 'arrow_light_shadow', name: 'Light Shadow', unlockLevel: 5 },
        { id: 'arrow_inset', name: 'Inset', unlockLevel: 10 },
        { id: 'arrow_inverted', name: 'Inverted', unlockLevel: 15 },
    ],
    // --- NEW CATEGORY FOR PARTICLE EFFECTS ---
    particleEffects: [
        { id: 'particle_default', name: 'Default', unlockLevel: 0 },
        { id: 'particle_burst', name: 'Energy Burst', unlockLevel: 15 },
        { id: 'particle_shards', name: 'Glass Shards', unlockLevel: 20 },
    ]
};

/**
 * Initializes the Gear/Armory feature.
 */
function initGearSystem() {
    console.log("Initializing Gear System...");
    
    // Populate all the gear grids
    populateGearGrid('gridSkins', document.getElementById('grid-skins-container'));
    populateGearGrid('arrowSkins', document.getElementById('arrow-skins-container'));
    populateGearGrid('particleEffects', document.getElementById('particle-effects-container'));
    
    // Add event listeners
    const gearModal = document.getElementById('gear-modal');
    const closeGearBtn = document.getElementById('close-gear-btn');
    const toggleGearBtn = document.getElementById('toggle-gear-btn'); // The button in the top-left

    // Create and append the Save button
    const gearContent = document.getElementById('gear-content');
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-gear-btn';
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = 'Save & Equip';
    gearContent.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
        // Particles are applied dynamically, so we just need to save the setting.
        // The applySettings() function from script.js handles visual skins.
        if (typeof applySettings === 'function') {
            applySettings(); 
        }
        const saveBtn = document.getElementById('save-gear-btn');
        saveBtn.textContent = 'Equipped!';
        setTimeout(() => { saveBtn.textContent = 'Save & Equip'; }, 1500);
    });


    if (toggleGearBtn) {
        toggleGearBtn.addEventListener('click', () => {
            updateGearModal(); // Update visuals every time it's opened
            gearModal.classList.remove('hidden');
            gearContent.classList.remove('anim-pop-out');
            gearContent.classList.add('anim-pop-in');
        });
    }

    if (closeGearBtn) {
        closeGearBtn.addEventListener('click', () => {
            gearContent.classList.add('anim-pop-out');
            gearContent.addEventListener('animationend', () => {
                gearModal.classList.add('hidden');
                gearContent.classList.remove('anim-pop-out');
            }, { once: true });
        });
    }
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
    
    // Get current settings to see what's equipped
    const settings = JSON.parse(localStorage.getItem('sonostraSettings')) || defaultSettings;
    const equippedGrid = settings.gridSkin || 'grid_default';
    const equippedArrows = settings.arrowSkin || 'arrow_default';
    const equippedParticles = settings.particleEffect || 'particle_default';

    document.querySelectorAll('.gear-item').forEach(item => {
        const gearId = item.dataset.gearId;
        
        let category = '';
        if (item.parentElement.id.includes('grid')) category = 'gridSkins';
        else if (item.parentElement.id.includes('arrow')) category = 'arrowSkins';
        else if (item.parentElement.id.includes('particle')) category = 'particleEffects';

        if (!category) return;
        
        const gearData = ALL_GEAR[category].find(g => g.id === gearId);

        if (!gearData) return;

        // Check if unlocked
        if (playerLevel >= gearData.unlockLevel) {
            item.classList.remove('locked');
            item.classList.add('unlocked');
        } else {
            item.classList.add('locked');
            item.classList.remove('unlocked');
        }

        // Check if equipped
        if (gearId === equippedGrid || gearId === equippedArrows || gearId === equippedParticles) {
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

    console.log(`Selecting ${itemData.name}`);
    
    // Update settings in localStorage
    let settings = JSON.parse(localStorage.getItem('sonostraSettings')) || defaultSettings;
    if (category === 'gridSkins') {
        settings.gridSkin = itemData.id;
    } else if (category === 'arrowSkins') {
        settings.arrowSkin = itemData.id;
    } else if (category === 'particleEffects') {
        settings.particleEffect = itemData.id;
    }
    localStorage.setItem('sonostraSettings', JSON.stringify(settings));

    // Update the visuals of the modal immediately to show the new selection
    updateGearModal();
}


// --- INITIALIZATION ---
// Must be called after the main script has defined its functions.
setTimeout(initGearSystem, 150);
