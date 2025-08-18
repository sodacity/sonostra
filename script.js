// --- NEW HELPER FUNCTIONS FOR PLAYER LEVEL ---
function loadPlayerData() {
    const saved = localStorage.getItem('sonostraPlayerData');
    if (saved) {
        return JSON.parse(saved);
    }
    // Return a default object with all stats
    return { 
        highestWave: 0,
        highestCombo: 0,
        totalSequences: 0,
        totalGames: 0,
        totalDamage: 0
    };
}

function savePlayerData(data) {
    localStorage.setItem('sonostraPlayerData', JSON.stringify(data));
}

function triggerLevelUpEffect() {
    const levelUpSound = new Audio('https://www.sonostra.com/levelup.mp3');
    levelUpSound.play();

    // Show the local player's specific level up text
    const announcement = localPlayer.dom.levelupText;
    announcement.classList.remove('hidden');
    setTimeout(() => {
        announcement.classList.add('hidden');
    }, 2500);
}

// --- NEW HELPER FOR COMPLEX SEQUENCES ---
function generateComplexSequence(length) {
    const sequence = [];
    for (let i = 0; i < length; i++) {
        let nextArrow;
        do {
            nextArrow = ARROW_KEYS[Math.floor(Math.random() * 4)];
        // Prevent more than two of the same arrow in a row
        } while (i > 1 && nextArrow === sequence[i - 1] && nextArrow === sequence[i - 2]);
        sequence.push(nextArrow);
    }
    return sequence;
}


const DOMElements = {
    titleScreen: document.getElementById('title-screen'),
    // HUB ELEMENTS
    hubView: document.getElementById('hub-view'),
    newsContainer: document.getElementById('news-container'),
    hubPlayGameBtn: document.getElementById('hub-play-game-btn'),
    lobbyNotifications: document.getElementById('lobby-notifications'),
    lobbyPlayerBar: document.getElementById('lobby-player-bar'),
    playerCardsContainer: document.getElementById('player-cards-container'),
    playerListToggleBtn: document.getElementById('player-list-toggle-btn'),
    hubChatInput: document.getElementById('hub-chat-input'),
    hubChatSendBtn: document.getElementById('hub-chat-send-btn'),
    personaChatContainer: document.getElementById('persona-chat-container'),
    patchNotesTab: document.getElementById('patch-notes-tab'),
    statsTab: document.getElementById('stats-tab'),
    howToPlayTab: document.getElementById('how-to-play-tab'),
    patchNotesContent: document.getElementById('patch-notes-content'),
    statsContent: document.getElementById('stats-content'),
    howToPlayContent: document.getElementById('how-to-play-content'),
    closeHubBtn: document.getElementById('close-hub-btn'),
    toggleHubBtn: document.getElementById('toggle-hub-btn'),
    // MODAL AND OLD ELEMENTS
    gameSetupModal: document.getElementById('game-setup-modal'),
    closeSetupBtn: document.getElementById('close-setup-btn'),
    connectionSetup: document.getElementById('connection-setup'),
    gameArea: document.getElementById('game-area'),
    videoUrlInput: document.getElementById('video-url-input'),
    videoWallContainer: document.getElementById('video-wall-container'),
    startBtn: document.getElementById('start-btn'),
    joinBtn: document.getElementById('join-btn'),
    gameModeToggle: document.getElementById('game-mode-toggle'),
    bossModeToggle: document.getElementById('boss-mode-toggle'),
    bossModeContainer: document.getElementById('boss-mode-container'),
    player1Container: document.getElementById('player1-container'),
    player2Container: document.getElementById('player2-container'),
    playerNameInput: document.getElementById('player-name-input'),
    displayPlayerName: document.getElementById('display-player-name'),
    roomNameInput: document.getElementById('room-name-input'),
    gameOverScreen: document.getElementById('game-over-screen'),
    gameOverTitle: document.getElementById('game-over-title'),
    winnerNameDisplay: document.getElementById('winner-name-display'),
    rematchBtn: document.getElementById('rematch-btn'),
    bossArea: document.getElementById('boss-area'),
    bossSymbol: document.getElementById('boss-symbol'),
    bossName: document.getElementById('boss-name'),
    bossLevel: document.getElementById('boss-level'),
    bossHealthBar: document.getElementById('boss-health-bar'),
    bossHealthBarContainer: document.getElementById('boss-health-bar-container'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    fullscreenIcon: document.getElementById('fullscreen-icon'),
    exitFullscreenIcon: document.getElementById('exit-fullscreen-icon'),
    statsCombo: document.getElementById('stats-combo'),
    statsCleared: document.getElementById('stats-cleared'),
    statsDamage: document.getElementById('stats-damage'),
    damageStatContainer: document.getElementById('damage-stat-container'),
    nextVideoInput: document.getElementById('next-video-input'),
    changeVideoBtn: document.getElementById('change-video-btn'),
    lobbyOverlay: document.getElementById('lobby-overlay'),
    lobbyText: document.getElementById('lobby-text'),
    waveAnnouncement: document.getElementById('wave-announcement'),
    warningEncounter: document.getElementById('warning-encounter'),
    rewardAnnouncement: document.getElementById('reward-announcement'),
    settingsBtn: document.getElementById('settings-btn'),
    settingsScreen: document.getElementById('settings-screen'),
    bindUpBtn: document.getElementById('bind-up-btn'),
    bindDownBtn: document.getElementById('bind-down-btn'),
    bindLeftBtn: document.getElementById('bind-left-btn'),
    bindRightBtn: document.getElementById('bind-right-btn'),
    saveSettingsBtn: document.getElementById('save-settings-btn'),
    defaultsSettingsBtn: document.getElementById('defaults-settings-btn'),
    closeSettingsBtn: document.getElementById('close-settings-btn'),
    objectiveBar: document.getElementById('objective-bar'),
    objectiveText: document.querySelector('#objective-bar .objective-text'),
    waveModeTimer: document.getElementById('wave-mode-timer'),
    intermissionScreen: document.getElementById('intermission-screen'),
    intermissionWave: document.getElementById('intermission-wave'),
    intermissionStatusText: document.getElementById('intermission-status-text'),
    powerUpOptions: document.getElementById('power-up-options'),
    intermissionVideoInput: document.getElementById('intermission-video-input'),
    intermissionChangeVideoBtn: document.getElementById('intermission-change-video-btn'),
    readyUpBtn: document.getElementById('ready-up-btn'),
    intermissionCountdown: document.getElementById('intermission-countdown'),
    badgeP1: document.getElementById('badge-p1'),
    badgeP2: document.getElementById('badge-p2'),
    // Name Prompt Modal Elements
    namePromptModal: document.getElementById('name-prompt-modal'),
    modalPlayerNameInput: document.getElementById('modal-player-name-input'),
    modalSaveNameBtn: document.getElementById('modal-save-name-btn'),
    // Player List Modal Elements
    playerListModal: document.getElementById('player-list-modal'),
    playerListContainer: document.getElementById('player-list-container'),
    closePlayerListBtn: document.getElementById('close-player-list-btn'),
};

// --- Settings Management ---
const defaultSettings = {
    playerName: 'Rookie',
    keyBinds: { ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight' },
    colors: { up: '#2979FF', down: '#FF1744', left: '#7C4DFF', right: '#00E676', grid: '#161616' }
};
let currentSettings = JSON.parse(JSON.stringify(defaultSettings));
let chosenPowerUpEffect = null;

// --- REFACTORED LOBBY/GAME STATE ---
let peer, conn;
let localPlayer, remotePlayer;
let touchStartX = 0, touchStartY = 0;
const LOBBY_HOST_ID = 'Sonostra-Lobby-Host-9a8b7c6d';
let peerConnections = new Map(); // Stores direct connections to other players
let titleScreenActive = true;

const gameState = {
    isHost: false, // Is this player the host of the CURRENT GAME
    isLobbyHost: false, // Is this player the host of the OVERALL LOBBY
    mode: 'solo',
    bossMode: false,
    isTransitioning: false,
    pendingNextWave: false,
    currentWave: 1,
    isCrescendoWave: false,
    bossIsEnraged: false,
    sequenceTurnCounter: 0,
    bossName: '',
    bossLevel: 1,
    bossMaxHealth: 250,
    bossCurrentHealth: 250,
    status: 'setup',
    videoUrl: '',
    waveModeTimerId: null,
    waveModeTimeLeft: 355,
    localPlayerReady: false,
    remotePlayerReady: false,
    localPlayerWantsRematch: false,
    remotePlayerWantsRematch: false,
    lobbyPlayers: new Map(),

    // --- Arms Race System Properties ---
    enrageThreshold: 0.25, // Default 25%
    stumblePenalty: false,
    ambushActive: false,
    overwhelmActive: false,
    lastFailer: null,
};


function hexToRgba(hex, alpha) {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    return `rgba(${+r},${+g},${+b},${alpha})`;
}

function applySettings() {
    document.getElementById('grad-up-1').style.stopColor = currentSettings.colors.up;
    document.getElementById('grad-up-2').style.stopColor = currentSettings.colors.up;
    document.getElementById('grad-down-1').style.stopColor = currentSettings.colors.down;
    document.getElementById('grad-down-2').style.stopColor = currentSettings.colors.down;
    document.getElementById('grad-left-1').style.stopColor = currentSettings.colors.left;
    document.getElementById('grad-left-2').style.stopColor = currentSettings.colors.left;
    document.getElementById('grad-right-1').style.stopColor = currentSettings.colors.right;
    document.getElementById('grad-right-2').style.stopColor = currentSettings.colors.right;

    const gridBgRgba = hexToRgba(currentSettings.colors.grid, 0.6);
    document.querySelectorAll('.game-grid').forEach(grid => {
        grid.style.backgroundColor = gridBgRgba;
    });

    DOMElements.displayPlayerName.textContent = currentSettings.playerName;
}

function updateSettingsUI() {
    DOMElements.playerNameInput.value = currentSettings.playerName;
    DOMElements.bindUpBtn.textContent = currentSettings.keyBinds.ArrowUp;
    DOMElements.bindDownBtn.textContent = currentSettings.keyBinds.ArrowDown;
    DOMElements.bindLeftBtn.textContent = currentSettings.keyBinds.ArrowLeft;
    DOMElements.bindRightBtn.textContent = currentSettings.keyBinds.ArrowRight;
}

function saveSettings() {
    currentSettings.playerName = DOMElements.playerNameInput.value;
    localStorage.setItem('sonostraSettings', JSON.stringify(currentSettings));
    applySettings();
    const saveBtn = DOMElements.saveSettingsBtn;
    saveBtn.textContent = 'Saved!';
    setTimeout(() => { saveBtn.textContent = 'Save'; }, 1500);
}

function loadSettings() {
    const saved = localStorage.getItem('sonostraSettings');
    if (saved) {
        const savedSettings = JSON.parse(saved);
        Object.assign(currentSettings, savedSettings);
    }
    applySettings();
    updateSettingsUI();
}

function handleNameSave() {
    const name = DOMElements.modalPlayerNameInput.value.trim();
    if (name) {
        currentSettings.playerName = name;
        localStorage.setItem('sonostraSettings', JSON.stringify(currentSettings));
        applySettings();
        updateSettingsUI();
    }
    DOMElements.namePromptModal.classList.add('hidden');
}


function listenForKeybind(action, btnElement) {
    const listeningBtns = document.querySelectorAll('.listening');
    if (listeningBtns.length > 0) return;

    btnElement.textContent = 'Press any key...';
    btnElement.classList.add('listening');

    const handleKeyDown = (e) => {
        e.preventDefault();
        const newKey = e.key;

        const isKeyBound = Object.values(currentSettings.keyBinds).includes(newKey);
        if (isKeyBound && currentSettings.keyBinds[action] !== newKey) {
            alert(`Key "${newKey}" is already bound to another action.`);
            btnElement.textContent = currentSettings.keyBinds[action];
        } else {
            currentSettings.keyBinds[action] = newKey;
            btnElement.textContent = newKey;
        }

        btnElement.classList.remove('listening');
        window.removeEventListener('keydown', handleKeyDown);
    };

    window.addEventListener('keydown', handleKeyDown, { once: true });
}

// --- Game Data ---
const BOSS_NAMES = ["Sonus", "Tremor", "Siren", "Symphony", "Echo"];
const MENACING_BOSS_NAMES = ["Sonoris", "Noctaria", "Legion", "Echolyra", "Stellaria", "Orbisona"];
const BOSS_ELEMENTS = ["fire", "poison", "ice"];
const BOSS_ACTIONS = ["timer_burn", "blur", "stealth", "heal", "glyph_storm", "clockstopper"];
const ATTACK_NAMES = {
    timer_burn: 'TIMER BURN',
    blur: 'DISTORTION FIELD',
    stealth: 'STEALTH SEQUENCE',
    stagger: 'STAGGERED PULSE',
    blur_stealth: 'DISTORTED STEALTH',
    glyph_storm: 'GLYPH STORM',
    clockstopper: 'CLOCKSTOPPER'
};
const ARROW_SVG = {
    'ArrowUp': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-up)" d="M50,0 L100,50 L85,65 L50,30 L15,65 L0,50 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M50,15 L80,45 L68,57 L50,39 L32,57 L20,45 Z"></path></svg>`,
    'ArrowDown': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-down)" d="M50,100 L0,50 L15,35 L50,70 L85,35 L100,50 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M50,85 L20,55 L32,43 L50,61 L68,43 L80,55 Z"></path></svg>`,
    'ArrowLeft': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-left)" d="M0,50 L50,0 L65,15 L30,50 L65,85 L50,100 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M15,50 L45,20 L57,32 L39,50 L57,68 L45,80 Z"></path></svg>`,
    'ArrowRight': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-right)" d="M100,50 L50,100 L35,85 L70,50 L35,15 L50,0 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M85,50 L55,80 L43,68 L61,50 L43,32 L55,20 Z"></path></svg>`
};
const LIFE_SVG = `<svg class="life-heart" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

class Player {
    constructor(id, name, peerId = null, isLocal = false) {
        this.id = id;
        this.name = name;
        this.peerId = peerId;
        this.isLocal = isLocal;
        this.isIdle = true;
        this.level = 0;
        this.lives = 3;
        this.maxLives = 3;
        this.combo = 0;
        this.sequenceProgress = 0;
        this.successfulSequences = 0;
        this.timeLimit = 10000;
        this.timerId = null;
        this.timerStartTime = 0;
        this.timeBonus = 0;
        this.highestCombo = 0;
        this.damageDealt = 0;

        // --- Arms Race System Properties ---
        this.hasSequenceFlow = false;
        this.hasVulnerabilityScan = false;
        this.hasComboPlating = false;
        this.activePlates = 0;

        this.dom = {
            playerArea: document.getElementById(`player${id}-container`),
            attackAnnouncement: document.getElementById(`attack-announcement-p${id}`),
            levelupText: document.getElementById(`levelup-p${id}`),
            feverText: document.getElementById(`fever-p${id}`),
            name: document.getElementById(`name-p${id}`),
            level: document.getElementById(`level-p${id}`),
            lives: document.getElementById(`lives-p${id}`),
            grid: document.getElementById(`grid-p${id}`),
            sequenceContainer: document.getElementById(`sequence-p${id}`),
            timerBar: document.getElementById(`timer-bar-p${id}`),
            comboContainer: document.getElementById(`combo-p${id}`),
            comboCount: document.querySelector(`#combo-p${id} .combo-count`),
            timerEffectFire: document.getElementById(`timer-fire-p${id}`),
            timerEffectPoison: document.getElementById(`timer-poison-p${id}`),
            timerEffectIce: document.getElementById(`timer-ice-p${id}`),
            badge: document.getElementById(`badge-p${id}`)
        };
        this.updateName(name);
        this.updateLives(3);
        this.updateCombo(0);
        this.updateLevel(0);
    }

    updateName(name) { this.name = name; this.dom.name.textContent = name; }

    updateLives(lives) {
        this.lives = lives;
        this.dom.lives.innerHTML = '';
        for (let i = 0; i < this.lives; i++) { this.dom.lives.innerHTML += LIFE_SVG; }

        if (this.lives === 1) { this.dom.grid.classList.add('danger-state'); }
        else { this.dom.grid.classList.remove('danger-state'); }
    }

    updateCombo(combo) {
        this.combo = combo;
        this.highestCombo = Math.max(this.highestCombo, this.combo);
        this.dom.comboCount.textContent = this.combo;

        if (this.combo > 0) {
            this.dom.comboContainer.classList.add('visible');
            this.dom.comboCount.classList.add('pop');
            setTimeout(() => this.dom.comboCount.classList.remove('pop'), 200);
        } else {
            this.dom.comboContainer.classList.remove('visible');
        }

        if (this.isLocal && this.combo > 0 && this.combo % 50 === 0) {
            if (this.lives < 3) {
                this.updateLives(this.lives + 1);
                showAnnouncement(DOMElements.rewardAnnouncement, '+1 LIFE!', 1500);
            }
        }

        if (this.isLocal && this.hasComboPlating && this.combo > 0 && this.combo % 25 === 0) {
            if (this.activePlates < 1) {
                this.activePlates++;
                // Can add visual feedback for gaining a plate here
            }
        }

        const feverIsActive = this.combo >= 15;
        const wasFeverActive = this.dom.grid.classList.contains('combo-fever');

        if (feverIsActive && !wasFeverActive) {
            this.dom.grid.classList.add('combo-fever');
            this.dom.feverText.classList.remove('hidden');
        } else if (!feverIsActive && wasFeverActive) {
            this.dom.grid.classList.remove('combo-fever');
            this.dom.feverText.classList.add('hidden');
        }
    }

    updateLevel(newLevel) {
        this.level = newLevel;
        if (this.level > 0) {
            this.dom.level.textContent = `Lvl ${this.level}`;
            this.dom.level.style.display = 'block';
        } else {
            this.dom.level.style.display = 'none';
        }
    }

    startNewSequence(sequence = null) {
        this.isIdle = false;
        if (this.isLocal && gameState.mode === 'multi') {
            sendData({ type: 'player_state_update', isIdle: this.isIdle });
        }

        this.dom.sequenceContainer.classList.remove('stealth');
        this.dom.grid.classList.remove('blurred');

        let baseTime = 10000;
        if (this.hasSequenceFlow) baseTime *= 1.1; 

        let timeReduction = gameState.currentWave * 100;
        if (gameState.currentWave >= 4) timeReduction += (gameState.currentWave - 3) * 200;
        
        this.timeLimit = Math.max(3000, baseTime - timeReduction);

        if (gameState.stumblePenalty && gameState.lastFailer === this.peerId) {
            this.timeLimit *= 0.5;
            gameState.lastFailer = null;
        }

        cancelAnimationFrame(this.timerId);
        this.sequenceProgress = 0;

        if (!sequence) {
            let sequenceLength;
            if (gameState.isCrescendoWave) {
                sequenceLength = Math.floor(Math.random() * 4) + 9;
            } else {
                const baseLength = 3;
                const lengthIncrease = Math.floor(gameState.currentWave / 2);
                sequenceLength = Math.min(12, baseLength + lengthIncrease);
            }

            if (gameState.overwhelmActive && this.activePlates > 0) {
                sequenceLength++;
            }

            this.currentSequence = generateComplexSequence(sequenceLength);

        } else {
            this.currentSequence = sequence;
        }

        this.displaySequence();
        this.startTimer();

        if (this.isLocal && gameState.mode === 'multi') {
             sendData({ type: 'new_sequence', sequence: this.currentSequence });
        }
    }

    displaySequence() {
        const sequenceLength = this.currentSequence.length;
        const grid = this.dom.grid;
        const container = this.dom.sequenceContainer;
        const availableWidth = grid.offsetWidth - 40;
        const maxArrowSize = 80;
        const minArrowSize = 35;
        let idealSize = (availableWidth / sequenceLength) - 10;
        let finalArrowSize = Math.max(minArrowSize, Math.min(idealSize, maxArrowSize));
        let finalArrowGap = finalArrowSize * 0.15;
        container.style.setProperty('--arrow-size', `${finalArrowSize}px`);
        container.style.setProperty('--arrow-gap', `${finalArrowGap}px`);
        container.innerHTML = '';
        this.currentSequence.forEach((arrowKey, index) => {
            let arrowHTML = ARROW_SVG[arrowKey];
            if(this.isLocal && this.hasVulnerabilityScan && index === 0) {
                 arrowHTML = arrowHTML.replace('class="arrow-bg"', 'class="arrow-bg critical"');
            }
            container.innerHTML += arrowHTML;
        });
    }

    startTimer() {
        this.timerStartTime = Date.now();
        this.timeBonus = 0;
        const update = () => {
            const elapsedTime = Date.now() - this.timerStartTime - this.timeBonus;
            const remainingPercent = Math.max(0, 100 - (elapsedTime / this.timeLimit) * 100);
            this.dom.timerBar.style.width = `${remainingPercent}%`;

            if (elapsedTime >= this.timeLimit) {
                if (this.isLocal) handleFailure(this);
            } else {
                this.timerId = requestAnimationFrame(update);
            }
        };
        this.timerId = requestAnimationFrame(update);
    }
}

// --- Main Functions ---
function init() {
    loadSettings();
    setupTitleScreenListeners();
    setupUIListeners();
    populateHowToPlay(); // Populate the how-to-play examples on startup

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}

function populateHowToPlay() {
    const exampleArrowsContainer = document.getElementById('example-arrows-container');
    if(exampleArrowsContainer) {
        exampleArrowsContainer.innerHTML = '';
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].forEach(arrow => {
            exampleArrowsContainer.innerHTML += ARROW_SVG[arrow];
        });
    }

    const exampleSequenceContainer = document.getElementById('example-sequence-container');
    if(exampleSequenceContainer) {
        exampleSequenceContainer.innerHTML = '';
        ['ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowLeft'].forEach(arrow => {
            exampleSequenceContainer.innerHTML += ARROW_SVG[arrow];
        });
    }
}

function setupTitleScreenListeners() {
    const proceed = () => {
        if (!titleScreenActive) return;
        titleScreenActive = false;
        DOMElements.titleScreen.classList.add('hidden');

        if (!currentSettings.playerName || currentSettings.playerName === 'Rookie') {
            DOMElements.namePromptModal.classList.remove('hidden');
        } else {
            initializeHub();
        }
    };

    window.addEventListener('keydown', proceed, { once: true });
    window.addEventListener('click', proceed, { once: true });
}

function updateStatsTab() {
    const playerData = loadPlayerData();
    document.getElementById('lifetime-stats-wave').textContent = playerData.highestWave;
    document.getElementById('lifetime-stats-combo').textContent = playerData.highestCombo;
    document.getElementById('lifetime-stats-cleared').textContent = playerData.totalSequences;
    document.getElementById('lifetime-stats-damage').textContent = playerData.totalDamage;
    document.getElementById('lifetime-stats-games').textContent = playerData.totalGames;
}


function setupUIListeners() {
    // HUB LISTENERS
    DOMElements.hubPlayGameBtn.addEventListener('click', () => {
        DOMElements.newsContainer.classList.add('anim-pop-out');
        DOMElements.toggleHubBtn.classList.remove('hidden');

        setTimeout(() => {
            DOMElements.gameSetupModal.classList.remove('hidden');
            DOMElements.connectionSetup.classList.add('anim-pop-in');
        }, 150);
    });

    DOMElements.closeHubBtn.addEventListener('click', () => {
        DOMElements.newsContainer.classList.add('anim-pop-out');
        DOMElements.toggleHubBtn.classList.remove('hidden');
        DOMElements.newsContainer.addEventListener('animationend', () => {
            DOMElements.newsContainer.classList.add('hidden');
            DOMElements.newsContainer.classList.remove('anim-pop-out');
        }, { once: true });
    });

    DOMElements.toggleHubBtn.addEventListener('click', () => {
        DOMElements.newsContainer.classList.remove('hidden');
        DOMElements.newsContainer.classList.remove('anim-pop-out');
        DOMElements.newsContainer.classList.add('anim-pop-in');
        DOMElements.toggleHubBtn.classList.add('hidden');
    });

    DOMElements.closeSetupBtn.addEventListener('click', () => {
        DOMElements.gameSetupModal.classList.add('hidden');
        DOMElements.connectionSetup.classList.remove('anim-pop-in');
    });

    DOMElements.playerListToggleBtn.addEventListener('click', () => {
        populatePlayerListModal();
        DOMElements.playerListModal.classList.remove('hidden');
    });
    DOMElements.closePlayerListBtn.addEventListener('click', () => {
        DOMElements.playerListModal.classList.add('hidden');
    });

    DOMElements.hubChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendHubChatMessage();
        }
    });
    DOMElements.hubChatSendBtn.addEventListener('click', sendHubChatMessage);

    // Tab Listeners
    DOMElements.patchNotesTab.addEventListener('click', () => {
        DOMElements.patchNotesTab.classList.add('active');
        DOMElements.statsTab.classList.remove('active');
        DOMElements.howToPlayTab.classList.remove('active');
        DOMElements.patchNotesContent.classList.remove('hidden');
        DOMElements.statsContent.classList.add('hidden');
        DOMElements.howToPlayContent.classList.add('hidden');
    });
    DOMElements.statsTab.addEventListener('click', () => {
        updateStatsTab();
        DOMElements.statsTab.classList.add('active');
        DOMElements.patchNotesTab.classList.remove('active');
        DOMElements.howToPlayTab.classList.remove('active');
        DOMElements.statsContent.classList.remove('hidden');
        DOMElements.patchNotesContent.classList.add('hidden');
        DOMElements.howToPlayContent.classList.add('hidden');
    });
    DOMElements.howToPlayTab.addEventListener('click', () => {
        DOMElements.howToPlayTab.classList.add('active');
        DOMElements.patchNotesTab.classList.remove('active');
        DOMElements.statsTab.classList.remove('active');
        DOMElements.howToPlayContent.classList.remove('hidden');
        DOMElements.patchNotesContent.classList.add('hidden');
        DOMElements.statsContent.classList.add('hidden');
    });

    // GAME SETUP LISTENERS
    DOMElements.gameModeToggle.addEventListener('change', handleGameModeChange);
    DOMElements.startBtn.addEventListener('click', onStartGameClick);
    DOMElements.joinBtn.addEventListener('click', onJoinGameClick);
    DOMElements.videoUrlInput.addEventListener('input', () => {
        gameState.videoUrl = DOMElements.videoUrlInput.value.trim();
    });
    DOMElements.rematchBtn.addEventListener('click', onRematchClick);
    DOMElements.fullscreenBtn.addEventListener('click', toggleFullScreen);
    DOMElements.changeVideoBtn.addEventListener('click', () => {
        const newUrl = DOMElements.nextVideoInput.value.trim();
        if (newUrl) {
            gameState.videoUrl = newUrl;
            DOMElements.videoUrlInput.value = newUrl;
            setVideoBackground();
            DOMElements.nextVideoInput.value = '';
             if (gameState.mode === 'multi') {
                sendData({ type: 'video_change', url: newUrl });
            }
        }
    });

    DOMElements.intermissionChangeVideoBtn.addEventListener('click', () => {
        const newUrl = DOMElements.intermissionVideoInput.value.trim();
        if (newUrl) {
            gameState.videoUrl = newUrl;
            DOMElements.videoUrlInput.value = newUrl;
            setVideoBackground();
            DOMElements.intermissionVideoInput.value = '';
        }
    });
    DOMElements.readyUpBtn.addEventListener('click', handleReadyUp);


    // Settings screen listeners
    DOMElements.settingsBtn.addEventListener('click', () => {
        updateSettingsUI();
        DOMElements.settingsScreen.classList.remove('hidden');
    });
    DOMElements.closeSettingsBtn.addEventListener('click', () => {
        DOMElements.settingsScreen.classList.add('hidden');
    });
    DOMElements.saveSettingsBtn.addEventListener('click', saveSettings);
    DOMElements.defaultsSettingsBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to load default settings? Any unsaved changes will be lost.')) {
            let playerName = currentSettings.playerName;
            currentSettings = JSON.parse(JSON.stringify(defaultSettings));
            currentSettings.playerName = playerName;
            applySettings();
            updateSettingsUI();
        }
    });

    DOMElements.bindUpBtn.addEventListener('click', () => listenForKeybind('ArrowUp', DOMElements.bindUpBtn));
    DOMElements.bindDownBtn.addEventListener('click', () => listenForKeybind('ArrowDown', DOMElements.bindDownBtn));
    DOMElements.bindLeftBtn.addEventListener('click', () => listenForKeybind('ArrowLeft', DOMElements.bindLeftBtn));
    DOMElements.bindRightBtn.addEventListener('click', () => listenForKeybind('ArrowRight', DOMElements.bindRightBtn));

    // Modal Listeners
    DOMElements.modalSaveNameBtn.addEventListener('click', handleNameSaveAndInitHub);
    DOMElements.modalPlayerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleNameSaveAndInitHub();
    });

    document.addEventListener('fullscreenchange', updateFullscreenIcons);
    window.addEventListener('keydown', handleKeyPress);
    handleGameModeChange();
}

function showLobbyNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'lobby-notification';
    notification.textContent = message;
    DOMElements.lobbyNotifications.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3800);
}

function renderPlayerCards() {
    const container = DOMElements.playerCardsContainer;
    container.innerHTML = ''; // Clear existing cards
    gameState.lobbyPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.dataset.peerId = player.peerId;
        card.innerHTML = `
            <div class="player-card-name">${player.name}</div>
            <div class="player-card-level">Lvl ${player.level}</div>
        `;
        container.appendChild(card);
    });
}

function populatePlayerListModal() {
    const container = DOMElements.playerListContainer;
    container.innerHTML = ''; // Clear previous list

    if (gameState.lobbyPlayers.size === 0) {
        container.innerHTML = '<p>You are the only one here.</p>';
        return;
    }

    gameState.lobbyPlayers.forEach(player => {
        const item = document.createElement('div');
        item.className = 'player-list-item';
        item.innerHTML = `
            <span class="player-list-name">${player.name}</span>
            <span class="player-list-level">Lvl ${player.level}</span>
        `;
        container.appendChild(item);
    });
}


// --- LOBBY CONNECTION LOGIC ---

function initializeHub() {
    DOMElements.hubView.classList.remove('hidden');
    DOMElements.newsContainer.classList.remove('anim-pop-out');
    DOMElements.newsContainer.classList.add('anim-pop-in');
    DOMElements.lobbyPlayerBar.style.display = 'flex';
    connectToLobby();
}

function handleNameSaveAndInitHub() {
    handleNameSave();
    if (DOMElements.namePromptModal.classList.contains('hidden')) {
        initializeHub();
    }
}

function connectToLobby() {
    if (peer && !peer.destroyed) peer.destroy();
    peer = new Peer();

    peer.on('open', (id) => {
        console.log('My lobby peer ID is: ' + id);
        
        peer.on('connection', (newConn) => {
            setupDirectLobbyConnection(newConn);
        });

        const hostConn = peer.connect(LOBBY_HOST_ID);
        
        hostConn.on('open', () => {
            console.log("Connection to Lobby Host opened.");
            gameState.isLobbyHost = false;
            peerConnections.set(LOBBY_HOST_ID, hostConn);
            setupDirectLobbyConnection(hostConn);
            
            const playerData = loadPlayerData();
            const selfData = { peerId: peer.id, name: currentSettings.playerName, level: playerData.highestWave };
            hostConn.send({ type: 'request_join_lobby', player: selfData });
        });
         hostConn.on('error', (err) => {
             console.log('Host connection error, becoming host.', err);
             if (peer && !peer.destroyed) peer.destroy();
             becomeLobbyHost();
         });
    });

    peer.on('error', (err) => {
        if (err.type === 'peer-unavailable' && !gameState.isLobbyHost) {
            console.log('Lobby Host not found. Attempting to become the host...');
            if (peer && !peer.destroyed) peer.destroy();
            becomeLobbyHost();
        }
    });
}

function becomeLobbyHost() {
    if (peer && !peer.destroyed) peer.destroy();
    peer = new Peer(LOBBY_HOST_ID);
    
    peer.on('open', (id) => {
        console.log("Successfully became the Lobby Host with ID:", id);
        gameState.isLobbyHost = true;
        
        const playerData = loadPlayerData();
        const selfData = { peerId: peer.id, name: currentSettings.playerName, level: playerData.highestWave };
        gameState.lobbyPlayers.set(peer.id, selfData);
        renderPlayerCards();
        
        peer.on('connection', (newConn) => {
            setupDirectLobbyConnection(newConn);
        });
    });

    peer.on('error', (err) => {
        console.error("Failed to become host:", err);
    });
}

function setupDirectLobbyConnection(newConn) {
    peerConnections.set(newConn.peer, newConn);
    console.log(`Setting up lobby connection with ${newConn.peer}`);
    newConn.on('data', (data) => handleLobbyData(data, newConn.peer));
    newConn.on('close', () => {
        console.log(`Lobby connection closed with ${newConn.peer}`);
        peerConnections.delete(newConn.peer);
        if (gameState.isLobbyHost) {
            const disconnectedPlayer = gameState.lobbyPlayers.get(newConn.peer);
            if (disconnectedPlayer) {
                gameState.lobbyPlayers.delete(newConn.peer);
                broadcastToLobby({ type: 'player_left_lobby', peerId: newConn.peer });
                renderPlayerCards();
                showLobbyNotification(`${disconnectedPlayer.name} has left.`);
            }
        }
    });
}

function handleLobbyData(data, senderId) {
    if (gameState.isLobbyHost) {
        if (data.type === 'request_join_lobby') {
            const newPlayer = data.player;
            const newConn = peerConnections.get(senderId);

            newConn.send({
                type: 'lobby_state',
                players: Array.from(gameState.lobbyPlayers.values())
            });
            
            gameState.lobbyPlayers.set(newPlayer.peerId, newPlayer);
            broadcastToLobby({ type: 'new_player_joined', player: newPlayer }, newPlayer.peerId);
            renderPlayerCards();
            showLobbyNotification(`${newPlayer.name} has joined.`);

        } else if (data.type === 'lobby_chat') {
            broadcastToLobby(data, senderId); // Relay chat to others
        }
    }

    switch(data.type) {
        case 'lobby_state':
            data.players.forEach(p => gameState.lobbyPlayers.set(p.peerId, p));
            const selfData = { peerId: peer.id, name: currentSettings.playerName, level: loadPlayerData().highestWave };
            gameState.lobbyPlayers.set(peer.id, selfData);
            renderPlayerCards();
            break;
        case 'new_player_joined':
            if (!gameState.lobbyPlayers.has(data.player.peerId)) {
                gameState.lobbyPlayers.set(data.player.peerId, data.player);
                showLobbyNotification(`${data.player.name} has joined.`);
                renderPlayerCards();
            }
            break;
        case 'player_left_lobby':
            if (gameState.lobbyPlayers.has(data.peerId)) {
                const leftPlayer = gameState.lobbyPlayers.get(data.peerId);
                showLobbyNotification(`${leftPlayer.name} has left.`);
                gameState.lobbyPlayers.delete(data.peerId);
                renderPlayerCards();
            }
            break;
        case 'lobby_chat':
            addPersonaChatMessage(data.senderName, data.message);
            break;
    }
}

function broadcastToLobby(data, excludeId = null) {
    if (gameState.isLobbyHost) {
        peerConnections.forEach((connection, peerId) => {
            if (peerId !== excludeId && connection.open) {
                connection.send(data);
            }
        });
    } else {
        const hostConn = peerConnections.get(LOBBY_HOST_ID);
        if (hostConn && hostConn.open) {
            hostConn.send(data);
        }
    }
}


function sendHubChatMessage() {
    const input = DOMElements.hubChatInput;
    const message = input.value.trim();
    if (message === '' || !peer || !peer.id) return;

    addPersonaChatMessage(currentSettings.playerName, message); 
    
    broadcastToLobby({ 
        type: 'lobby_chat', 
        message: message,
        senderName: currentSettings.playerName 
    });
    
    input.value = '';
}

function addPersonaChatMessage(name, message) {
    const chatContainer = DOMElements.personaChatContainer;
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'chat-message-wrapper';
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'chat-message-name';
    nameSpan.textContent = name;
    const textSpan = document.createElement('span');
    textSpan.className = 'chat-message-text';
    textSpan.textContent = message;
    messageEl.appendChild(nameSpan);
    messageEl.appendChild(textSpan);
    messageWrapper.appendChild(messageEl);
    chatContainer.prepend(messageWrapper);
    while (chatContainer.children.length > 10) {
        chatContainer.lastChild.remove();
    }
}

// --- GAME START LOGIC (from Modal) ---
function handleGameModeChange() {
    const isMultiplayer = DOMElements.gameModeToggle.checked;
    if (isMultiplayer) {
        gameState.mode = 'multi';
        DOMElements.joinBtn.style.display = 'block';
        DOMElements.roomNameInput.style.display = 'block';
        DOMElements.startBtn.textContent = 'Create Game';
    } else {
        gameState.mode = 'solo';
        DOMElements.joinBtn.style.display = 'none';
        DOMElements.roomNameInput.style.display = 'none';
        DOMElements.startBtn.textContent = 'Start Game';
    }
}

function onStartGameClick() {
    gameState.bossMode = DOMElements.bossModeToggle.checked;
    gameState.videoUrl = DOMElements.videoUrlInput.value.trim();
    gameState.isHost = true; // Set player as host for ALL game modes they initiate.
    
    if (gameState.mode === 'solo') {
        localPlayer = new Player(1, currentSettings.playerName, null, true);
        const playerData = loadPlayerData();
        localPlayer.updateLevel(playerData.highestWave);
        localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
        localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
        localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);
        DOMElements.player2Container.style.display = 'none';
        transitionToGameArea();
        startCountdown();

    } else { // Multiplayer - Create Game
        const roomName = DOMElements.roomNameInput.value.trim();
        if (!roomName) {
            alert("Please enter a room name to create a multiplayer game.");
            return;
        }
        
        if (peer) peer.destroy(); // Disconnect from lobby
        peer = new Peer(roomName);

        peer.on('open', (id) => {
            console.log('Game room created with ID:', id);
            DOMElements.lobbyText.textContent = `Waiting for player... \n Room: ${id}`;
            DOMElements.lobbyOverlay.classList.remove('hidden');
            
            localPlayer = new Player(1, currentSettings.playerName, peer.id, true);
            const playerData = loadPlayerData();
            localPlayer.updateLevel(playerData.highestWave);
            localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
            localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
            localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);

            peer.on('connection', (newConn) => {
                conn = newConn;
                conn.on('open', () => {
                    const remoteData = conn.metadata;
                    remotePlayer = new Player(2, remoteData.name, conn.peer, false);
                    remotePlayer.updateLevel(remoteData.level);
                    conn.send({
                        type: 'connection_success',
                        hostData: { name: localPlayer.name, level: localPlayer.level },
                        gameState: { bossMode: gameState.bossMode, videoUrl: gameState.videoUrl }
                    });
                    DOMElements.player2Container.style.display = 'flex';
                    setupInGameConnection();
                    transitionToGameArea();
                    startCountdown();
                });
            });
        });
        peer.on('error', (err) => {
            alert('Error creating game. The room name might be taken or invalid. Please try another name.');
            connectToLobby(); // Reconnect to lobby on error
        });
    }
}

function onJoinGameClick() {
    const roomName = DOMElements.roomNameInput.value.trim();
    if (!roomName) {
        alert("Please enter a room name to join.");
        return;
    }

    gameState.isHost = false;
    if (peer) peer.destroy(); // Disconnect from lobby
    peer = new Peer();

    peer.on('open', (id) => {
        console.log('My peer ID for joining is:', id);
        const playerData = loadPlayerData();
        
        conn = peer.connect(roomName, {
            metadata: { name: currentSettings.playerName, level: playerData.highestWave }
        });

        conn.on('open', () => {
            console.log("Connected to host!");
            localPlayer = new Player(2, currentSettings.playerName, id, true);
            localPlayer.updateLevel(playerData.highestWave);
            localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
            localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
            localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);
            DOMElements.player1Container.style.display = 'flex';
            DOMElements.player2Container.style.display = 'flex';
            setupInGameConnection();
            transitionToGameArea();
        });
        conn.on('error', (err) => {
            alert('Could not connect to room. Check the room name and try again.');
            connectToLobby(); // Reconnect to lobby
        });
    });
}

function setupInGameConnection() {
    conn.on('data', (data) => {
        // This is for IN-GAME communication only
        switch(data.type) {
             case 'connection_success': // Only client receives this
                gameState.bossMode = data.gameState.bossMode;
                gameState.videoUrl = data.gameState.videoUrl;
                remotePlayer = new Player(1, data.hostData.name, conn.peer, false);
                remotePlayer.updateLevel(data.hostData.level);
                startCountdown();
                break;
            case 'rematch_request':
                gameState.remotePlayerWantsRematch = true;
                showLobbyNotification(`${remotePlayer.name} wants a rematch!`);
                if (gameState.localPlayerWantsRematch) {
                     if (gameState.isHost) {
                        restartMatch();
                        sendData({ type: 'start_rematch' });
                    }
                }
                break;
            case 'start_rematch':
                restartMatch();
                break;
            case 'key_press_update':
                handleRemoteKeyPress(data.progress);
                break;
            case 'failure_update':
                if (remotePlayer) {
                    remotePlayer.updateLives(data.lives);
                    gameState.lastFailer = data.peerId;
                }
                break;
            case 'game_over':
                gameOver(data.winnerName);
                break;
            case 'video_change':
                gameState.videoUrl = data.url;
                DOMElements.videoUrlInput.value = data.url;
                setVideoBackground();
                break;
            case 'new_sequence':
                 if (remotePlayer) remotePlayer.startNewSequence(data.sequence);
                break;
            case 'player_state_update':
                 if (remotePlayer) remotePlayer.isIdle = data.isIdle;
                break;
            case 'boss_health_update':
                if (!gameState.isHost) updateBossHealth(data.health);
                break;
            case 'boss_attack':
                applyBossAttack(data.attackType, localPlayer);
                break;
            case 'damage_boss':
                if(gameState.isHost) dealDamageToBoss(data.damageType === 'heavy' ? 25 : 5, remotePlayer, data.damageType === 'heavy');
                break;
        }
    });
    conn.on('close', () => {
        alert('Opponent has disconnected.');
        resetGameToHub();
    });
}


function sendData(data) {
    if (conn && conn.open) {
        conn.send(data);
    }
}

function onRematchClick() {
    DOMElements.rematchBtn.textContent = "Waiting for Opponent...";
    DOMElements.rematchBtn.disabled = true;
    gameState.localPlayerWantsRematch = true;
    
    if (gameState.mode === 'multi') {
        sendData({ type: 'rematch_request' });
        if (gameState.remotePlayerWantsRematch) {
            if (gameState.isHost) {
                restartMatch();
                sendData({ type: 'start_rematch' });
            }
        }
    } else { // Solo mode
        restartMatch();
    }
}

function restartMatch() {
    DOMElements.gameOverScreen.classList.remove('visible');
    
    // Reset game state variables
    gameState.status = 'setup';
    gameState.isTransitioning = false;
    gameState.pendingNextWave = false;
    gameState.sequenceTurnCounter = 0;
    gameState.bossIsEnraged = false;
    gameState.currentWave = 1;
    gameState.isCrescendoWave = false;
    gameState.localPlayerWantsRematch = false;
    gameState.remotePlayerWantsRematch = false;
    
    // --- Reset Arms Race effects ---
    gameState.enrageThreshold = 0.25;
    gameState.stumblePenalty = false;
    gameState.ambushActive = false;
    gameState.overwhelmActive = false;
    
    [localPlayer, remotePlayer].forEach(p => {
        if (p) {
            p.maxLives = 3; // Reset max lives to default
            p.updateLives(3); // Heal to the default of 3
            p.updateCombo(0);
            p.successfulSequences = 0;
            p.highestCombo = 0;
            p.damageDealt = 0;
            p.isIdle = true;
            p.hasSequenceFlow = false;
            p.hasVulnerabilityScan = false;
            p.hasComboPlating = false;
            p.activePlates = 0;
            if (p.dom.badge) p.dom.badge.textContent = '';
        }
    });

    DOMElements.rematchBtn.textContent = "Try Again";
    DOMElements.rematchBtn.disabled = false;
    
    startCountdown();
}

function showObjective(text) {
    const objectiveSound = new Audio('https://www.sonostra.com/objective.mp3');
    objectiveSound.play();
    DOMElements.objectiveText.textContent = text;
    DOMElements.objectiveBar.classList.remove('hidden');
    DOMElements.objectiveBar.classList.add('visible');

    setTimeout(() => {
        DOMElements.objectiveBar.classList.remove('visible');
        DOMElements.objectiveBar.classList.add('hidden');
    }, 4000);
}

function showAnnouncement(element, text, duration) {
    element.textContent = text;
    element.classList.remove('hidden');
    return new Promise(resolve => {
        setTimeout(() => {
            element.classList.add('hidden');
            setTimeout(resolve, 300);
        }, duration);
    });
}

async function startWave(waveNumber) {
    if (waveNumber === 1 && gameState.bossMode) {
        startWaveModeTimer();
    }
    gameState.status = 'playing';

    const completedWave = waveNumber - 1;
    if (completedWave > 0 && localPlayer.isLocal) {
        const playerData = loadPlayerData();
        if (completedWave > playerData.highestWave) {
            playerData.highestWave = completedWave;
            savePlayerData(playerData);
            localPlayer.updateLevel(playerData.highestWave);
            triggerLevelUpEffect();
            if (gameState.mode === 'multi') {
                sendData({ type: 'level_update', level: localPlayer.level });
            }
        }
    }

    gameState.currentWave = waveNumber;
    gameState.isCrescendoWave = gameState.currentWave % 3 === 0;
    DOMElements.bossArea.classList.remove('crescendo-intro');

    initBoss(gameState.isCrescendoWave);

    if (gameState.isCrescendoWave) {
        await showAnnouncement(DOMElements.warningEncounter, 'WARNING!!!', 2500);
        showObjective(`Defeat ${gameState.bossName}!`);
    } else {
        if (waveNumber > 1) {
             await showAnnouncement(DOMElements.waveAnnouncement, `WAVE ${gameState.currentWave}`, 2000);
        } else { // Wave 1
            if (gameState.bossMode) {
                 showObjective("Defeat as many enemies as you can in the time limit.");
            }
        }
    }
    
    localPlayer.startNewSequence();
    if (remotePlayer && gameState.isHost) {
        remotePlayer.startNewSequence(localPlayer.currentSequence);
    }


    if (gameState.isHost && gameState.mode === 'multi') {
        sendData({ type: 'wave_change', wave: waveNumber });
    }
    
    gameState.isTransitioning = false;
}

function startCountdown() {
    DOMElements.lobbyOverlay.classList.remove('hidden');
    let count = 3;
    const updateText = (text) => {
        DOMElements.lobbyText.textContent = text;
        DOMElements.lobbyText.classList.remove('countdown-pop');
        void DOMElements.lobbyText.offsetWidth;
        DOMElements.lobbyText.classList.add('countdown-pop');
    };

    updateText(count);
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            updateText(count);
        } else {
            clearInterval(interval);
            updateText('START!');
            setTimeout(() => {
                DOMElements.lobbyOverlay.classList.add('hidden');
                setVideoBackground();
                gameState.status = 'playing'; // FIX: Set game status to playing
                
                if (gameState.bossMode) {
                    DOMElements.waveModeTimer.classList.remove('hidden');
                    startWave(1);
                } else {
                    DOMElements.waveModeTimer.classList.add('hidden');
                    localPlayer.startNewSequence();
                    if (remotePlayer && gameState.isHost) {
                        remotePlayer.startNewSequence(localPlayer.currentSequence);
                    }
                }
            }, 1000);
        }
    }, 1000);
}

function startWaveModeTimer() {
    clearInterval(gameState.waveModeTimerId);
    gameState.waveModeTimeLeft = 355; 
    updateWaveModeTimerDisplay(); 
    gameState.waveModeTimerId = setInterval(updateWaveModeTimer, 1000);
}

function updateWaveModeTimer() {
    gameState.waveModeTimeLeft--;
    updateWaveModeTimerDisplay();

    if (gameState.waveModeTimeLeft <= 0) {
        clearInterval(gameState.waveModeTimerId);
        gameOver("Time's Up!");
        if (gameState.mode === 'multi') sendData({ type: 'game_over', winnerName: "Time's Up!" });
    }
}

function updateWaveModeTimerDisplay() {
    const minutes = Math.floor(gameState.waveModeTimeLeft / 60).toString().padStart(2, '0');
    const seconds = (gameState.waveModeTimeLeft % 60).toString().padStart(2, '0');
    DOMElements.waveModeTimer.textContent = `${minutes}:${seconds}`;

    if (gameState.waveModeTimeLeft <= 30) {
        DOMElements.waveModeTimer.classList.add('danger');
    } else {
        DOMElements.waveModeTimer.classList.remove('danger');
    }
}

function initBoss(isCrescendo) {
    DOMElements.bossArea.style.display = 'block';
    DOMElements.bossArea.classList.remove('enraged', 'boss-active', 'crescendo-intro');
    gameState.bossIsEnraged = false;
    gameState.sequenceTurnCounter = 0;

    if (isCrescendo) {
        DOMElements.bossSymbol.textContent = '💀';
        DOMElements.bossSymbol.classList.remove('hidden');
        DOMElements.bossArea.classList.add('boss-active', 'crescendo-intro');
    } else {
        DOMElements.bossSymbol.classList.add('hidden');
    }

    const bossLevel = gameState.currentWave;
    const bossNameList = isCrescendo ? MENACING_BOSS_NAMES : BOSS_NAMES;
    
    gameState.bossName = bossNameList[Math.floor(Math.random() * bossNameList.length)];
    gameState.bossLevel = bossLevel;
    gameState.bossElement = BOSS_ELEMENTS[Math.floor(Math.random() * BOSS_ELEMENTS.length)];
    
    const baseHealth = isCrescendo ? 300 : 150;
    gameState.bossMaxHealth = baseHealth + (bossLevel * 25);
    gameState.bossCurrentHealth = gameState.bossMaxHealth;
    
    DOMElements.bossName.textContent = gameState.bossName;
    DOMElements.bossLevel.textContent = `Lvl ${gameState.bossLevel}`;
    DOMElements.bossArea.classList.add(gameState.bossElement);

    updateBossHealth(gameState.bossCurrentHealth);
}

function hostCheckBossTrigger() {
    if (gameState.status !== 'playing' || !gameState.bossMode || gameState.isTransitioning) return;
    
    gameState.sequenceTurnCounter++;
    const triggerInterval = gameState.bossIsEnraged ? 2 : 3;
    if(gameState.sequenceTurnCounter > 0 && gameState.sequenceTurnCounter % triggerInterval === 0) {
        triggerBossAction();
    }
}

function triggerBossAction() {
    let availableActions = ["timer_burn", "blur", "stealth", "heal", "glyph_storm", "clockstopper"];
    if (gameState.currentWave >= 4) {
        availableActions.push('stagger');
        if (gameState.isCrescendoWave) {
            availableActions.push('blur_stealth');
        }
    }
    if (gameState.bossCurrentHealth === gameState.bossMaxHealth) {
        availableActions = availableActions.filter(action => action !== 'heal');
    }

    const action = availableActions[Math.floor(Math.random() * availableActions.length)];
    
    if (action === 'heal') {
        DOMElements.bossArea.classList.add('boss-healing');
        setTimeout(() => DOMElements.bossArea.classList.remove('boss-healing'), 1000);
        const newHealth = Math.min(gameState.bossMaxHealth, gameState.bossCurrentHealth + 10);
        updateBossHealth(newHealth);
    } else {
        let target = localPlayer;
        if (remotePlayer && Math.random() < 0.5) {
            target = remotePlayer;
        }

        DOMElements.bossArea.classList.add('boss-acting');
        setTimeout(() => DOMElements.bossArea.classList.remove('boss-acting'), 1000);
        
        if (target.isLocal) {
            applyBossAttack(action, target);
        } else {
            sendData({ type: 'boss_attack', attackType: action });
        }
    }
}

function showAttackAnnouncement(attackType, player, isDramatic = false) {
    if (!player || !player.dom || !player.dom.attackAnnouncement) return;
    const attackName = ATTACK_NAMES[attackType];
    if (!attackName) return;
    const container = player.dom.attackAnnouncement;

    if (isDramatic) { container.classList.add('dramatic'); }

    container.innerHTML = '';
    attackName.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.05}s`;
        container.appendChild(span);
    });
    container.classList.add('visible');
    setTimeout(() => {
        container.classList.remove('visible');
        if (isDramatic) { container.classList.remove('dramatic'); }
    }, 2500);
}

function createGlyphStorm(player) {
    const grid = player.dom.grid;
    const stormContainer = document.createElement('div');
    stormContainer.className = 'glyph-storm-container';

    const glyphs = ['✧', '✦', '✡', '✢', '✜', '✥', '✳'];
    for(let i = 0; i < 15; i++) {
        const glyph = document.createElement('div');
        glyph.className = 'drifting-glyph';
        glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        glyph.style.left = `${Math.random() * 100}%`;
        glyph.style.top = `${Math.random() * 100}%`;
        glyph.style.animationDuration = `${(Math.random() * 2) + 3}s`;
        glyph.style.animationDelay = `${Math.random() * 2}s`;
        stormContainer.appendChild(glyph);
    }
    grid.appendChild(stormContainer);
    setTimeout(() => {
        stormContainer.remove();
    }, 5000); // Remove after the longest animation finishes
}

function applyBossAttack(attackType, player) {
    if (!player) return;
    
    showAttackAnnouncement(attackType, player);
    player.dom.playerArea.classList.add('shake');
    setTimeout(() => player.dom.playerArea.classList.remove('shake'), 500);

    switch(attackType) {
        case 'timer_burn':
            const burnAmount = gameState.bossIsEnraged ? 45 : 30;
            const currentWidth = parseFloat(player.dom.timerBar.style.width) || 100;
            player.dom.timerBar.style.width = `${Math.max(0, currentWidth - burnAmount)}%`;
            const effectEl = player.dom[`timerEffect${gameState.bossElement.charAt(0).toUpperCase() + gameState.bossElement.slice(1)}`];
            if(effectEl) {
                effectEl.classList.add('visible');
                setTimeout(() => effectEl.classList.remove('visible'), 1000);
            }
            break;
        case 'blur':
            player.dom.grid.classList.add('blurred');
            setTimeout(() => player.dom.grid.classList.remove('blurred'), 3000);
            break;
        case 'stealth':
            player.dom.sequenceContainer.classList.add('stealth');
            break;
        case 'stagger':
            displaySequenceStaggered(player);
            break;
        case 'blur_stealth':
            player.dom.grid.classList.add('blurred');
            setTimeout(() => {
                player.dom.sequenceContainer.classList.add('stealth');
            }, 1000);
            break;
        case 'glyph_storm':
            createGlyphStorm(player);
            break;
        case 'clockstopper':
            const timerContainer = player.dom.timerBar.parentElement;
            timerContainer.classList.add('timer-hidden');
            setTimeout(() => {
                timerContainer.classList.remove('timer-hidden');
            }, 5000); // Hides for 5 seconds
            break;
    }
}

function displaySequenceStaggered(player) {
    const container = player.dom.sequenceContainer;
    container.innerHTML = ''; 
    const sequence = player.currentSequence;
    const revealDelay = 300;

    sequence.forEach((arrowKey, index) => {
        setTimeout(() => {
            container.innerHTML += ARROW_SVG[arrowKey];
        }, index * revealDelay);
    });

    setTimeout(() => {
        container.classList.add('stealth');
    }, sequence.length * revealDelay + 500);
}


function playDeathAnimation(isCrescendo) {
    return new Promise(resolve => {
        const duration = isCrescendo ? 1500 : 1000;
        const container = DOMElements.bossHealthBarContainer;
        const mainBar = DOMElements.bossHealthBar;
        const shards = container.querySelectorAll('.health-bar-shard');

        const mainBarStyle = getComputedStyle(mainBar).background;
        shards.forEach(shard => {
            shard.style.background = mainBarStyle;
        });

        container.classList.add(isCrescendo ? 'crescendo-defeated' : 'defeated');

        setTimeout(() => {
            container.classList.remove('crescendo-defeated', 'defeated');
            shards.forEach(shard => shard.style.background = ''); 
            resolve();
        }, duration);
    });
}

async function dealDamageToBoss(damage, player, isHeavyAttack = false) {
    if (gameState.status !== 'playing' || gameState.isTransitioning) return;
    
    // Apply Vulnerability Scan bonus damage
    if (player.hasVulnerabilityScan) {
        damage *= 1.25; // 25% bonus damage
    }

    player.damageDealt += Math.round(damage);
    player.dom.grid.classList.add('attack-launch');
    setTimeout(() => player.dom.grid.classList.remove('attack-launch'), 400);

    const newHealth = Math.max(0, gameState.bossCurrentHealth - damage);
    updateBossHealth(newHealth, isHeavyAttack);

    if (newHealth <= 0) {
        gameState.isTransitioning = true;
        cancelAnimationFrame(localPlayer.timerId); 
        if(remotePlayer) cancelAnimationFrame(remotePlayer.timerId);

        await playDeathAnimation(gameState.isCrescendoWave);
        
        if (remotePlayer && !remotePlayer.isIdle) {
            gameState.pendingNextWave = true;
            return;
        }

        if (gameState.isCrescendoWave) {
            clearInterval(gameState.waveModeTimerId);
            showIntermissionScreen();
            if(gameState.isHost && gameState.mode === 'multi') sendData({type: 'show_intermission'});
        } else {
            startWave(gameState.currentWave + 1);
        }
    } else if (player.isLocal) {
        player.startNewSequence();
    }
}

function updateBossHealth(health, isHeavy = false) {
    gameState.bossCurrentHealth = health;
    const healthPercent = (gameState.bossCurrentHealth / gameState.bossMaxHealth) * 100;
    DOMElements.bossHealthBar.style.width = `${healthPercent}%`;

    if (healthPercent <= (gameState.enrageThreshold * 100) && !gameState.bossIsEnraged) {
        gameState.bossIsEnraged = true;
        DOMElements.bossArea.classList.add('enraged');
    }

    if (isHeavy) {
        DOMElements.bossHealthBarContainer.classList.add('heavy-shake');
        const crack = document.createElement('div');
        crack.className = 'health-crack-effect';
        DOMElements.bossHealthBarContainer.appendChild(crack);
        setTimeout(() => {
            DOMElements.bossHealthBarContainer.classList.remove('heavy-shake');
            crack.remove();
        }, 500);
    } else {
        DOMElements.bossHealthBarContainer.classList.add('jiggle');
        setTimeout(() => DOMElements.bossHealthBarContainer.classList.remove('jiggle'), 300);
    }

    if (gameState.isHost && gameState.mode === 'multi') {
        sendData({ type: 'boss_health_update', health: gameState.bossCurrentHealth });
    }
}

function showIntermissionScreen() {
    gameState.status = 'intermission';
    gameState.isTransitioning = false;
    gameState.localPlayerReady = false;
    gameState.remotePlayerReady = false;

    DOMElements.badgeP1.textContent = '';
    DOMElements.badgeP2.textContent = '';
    DOMElements.intermissionStatusText.textContent = '';
    DOMElements.intermissionCountdown.classList.add('hidden');
    DOMElements.readyUpBtn.textContent = 'Select a Power-up';
    DOMElements.readyUpBtn.disabled = true;

    DOMElements.intermissionWave.textContent = gameState.currentWave;
    generatePowerUps();
    DOMElements.intermissionScreen.classList.remove('hidden');
    DOMElements.intermissionScreen.classList.add('visible');
}

function generatePowerUps() {
    const allPowerUps = [
        { 
            title: 'Reinforce', 
            desc: 'YOU: Max lives +1. <br>THEY: Boss enrages sooner.',
            badge: '❤️‍🔥',
            effect: () => {
                localPlayer.maxLives += 1;
                localPlayer.updateLives(localPlayer.maxLives);
                gameState.enrageThreshold = Math.min(0.75, gameState.enrageThreshold + 0.15); // Cap at 75%
            }
        },
        { 
            title: 'Sequence Flow', 
            desc: 'YOU: Gain more time per sequence. <br>THEY: Failing a sequence is more punishing.',
            badge: '🌊',
            effect: () => { 
                localPlayer.hasSequenceFlow = true;
                gameState.stumblePenalty = true;
            }
        },
        { 
            title: 'Vulnerability Scan', 
            desc: 'YOU: Deal 25% bonus damage. <br>THEY: Boss may attack mid-sequence.',
            badge: '🎯',
            effect: () => {
                localPlayer.hasVulnerabilityScan = true;
                gameState.ambushActive = true;
            }
        },
        {
            title: 'Combo Plating',
            desc: 'YOU: Gain an armor plate every 25 combos. <br>THEY: Sequences are longer while you have armor.',
            badge: '⚙️',
            effect: () => {
                localPlayer.hasComboPlating = true;
                gameState.overwhelmActive = true;
            }
        }
    ];

    let currentIndex = allPowerUps.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [allPowerUps[currentIndex], allPowerUps[randomIndex]] = [allPowerUps[randomIndex], allPowerUps[currentIndex]];
    }

    const chosenPowerUps = allPowerUps.slice(0, 3);

    DOMElements.powerUpOptions.innerHTML = '';
    chosenPowerUps.forEach(powerup => {
        const card = document.createElement('div');
        card.className = 'power-up-card';
        card.innerHTML = `<div class="power-up-title">${powerup.badge} ${powerup.title}</div><div class="power-up-desc">${powerup.desc}</div>`;
        card.addEventListener('click', () => {
            document.querySelectorAll('.power-up-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            chosenPowerUpEffect = powerup;
            DOMElements.readyUpBtn.disabled = false;
            DOMElements.readyUpBtn.textContent = 'Ready Up';
        });
        DOMElements.powerUpOptions.appendChild(card);
    });
}

function handleReadyUp() {
    if (!chosenPowerUpEffect) return;
    gameState.localPlayerReady = true;
    updateBadge(localPlayer.id, chosenPowerUpEffect.badge);
    DOMElements.readyUpBtn.textContent = "Waiting for Opponent...";
    DOMElements.readyUpBtn.disabled = true;

    if (gameState.mode === 'multi') {
        sendData({ type: 'player_ready', badge: chosenPowerUpEffect.badge });
        if (gameState.isHost) {
            checkReadyStateAndStartCountdown();
        }
    } else { // Solo mode
        startIntermissionCountdown();
    }
}

function checkReadyStateAndStartCountdown() {
    if (gameState.localPlayerReady && gameState.remotePlayerReady) {
        startIntermissionCountdown();
        sendData({ type: 'start_intermission_countdown' });
    }
}

function startIntermissionCountdown() {
    DOMElements.intermissionStatusText.classList.add('hidden');
    DOMElements.powerUpOptions.classList.add('hidden');
    DOMElements.readyUpBtn.classList.add('hidden');
    DOMElements.intermissionCountdown.classList.remove('hidden');

    let count = 3;
    DOMElements.intermissionCountdown.textContent = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            DOMElements.intermissionCountdown.textContent = count;
        } else {
            clearInterval(interval);
            continueRun();
        }
    }, 1000);
}

function continueRun() {
    DOMElements.intermissionScreen.classList.remove('visible');
    DOMElements.intermissionScreen.classList.add('hidden');
    DOMElements.intermissionStatusText.classList.remove('hidden');
    DOMElements.powerUpOptions.classList.remove('hidden');
    DOMElements.readyUpBtn.classList.remove('hidden');
    
    if (chosenPowerUpEffect && chosenPowerUpEffect.effect) {
        chosenPowerUpEffect.effect();
    }
    
    startWaveModeTimer();
    startWave(gameState.currentWave + 1);
    
    chosenPowerUpEffect = null;
}

function updateBadge(playerId, badge) {
    const badgeEl = playerId === 1 ? DOMElements.badgeP1 : DOMElements.badgeP2;
    if (badgeEl) {
        badgeEl.textContent = badge;
    }
}


// --- Core Game Logic ---
function transitionToGameArea() {
    DOMElements.hubView.classList.add('hidden');
    DOMElements.gameSetupModal.classList.add('hidden');
    DOMElements.lobbyPlayerBar.style.display = 'none';
    DOMElements.gameArea.classList.remove('hidden');
    DOMElements.gameArea.style.display = 'flex';
}

function handleKeyPress(e) {
    if (gameState.status !== 'playing' || titleScreenActive) return;

    if (document.activeElement === DOMElements.hubChatInput || document.activeElement === DOMElements.roomNameInput) return;

    const pressedKey = e.key;
    const action = Object.keys(currentSettings.keyBinds).find(act => currentSettings.keyBinds[act] === pressedKey);

    if (!action) return;
    
    e.preventDefault();
    const player = localPlayer;
    if (!player || !player.currentSequence || player.currentSequence.length === 0) return;

    if (action === player.currentSequence[player.sequenceProgress]) {
        handleCorrectKeyPress(player);
    } else {
        handleFailure(player);
    }
}

function handleCorrectKeyPress(player) {
    const arrowEl = player.dom.sequenceContainer.children[player.sequenceProgress];
    if (arrowEl) arrowEl.classList.add('correct');
    
    if (gameState.ambushActive && player.isLocal && gameState.isHost && player.sequenceProgress > 0 && Math.random() < 0.1) { 
        triggerBossAction();
    }
    
    player.sequenceProgress++;

    if (gameState.mode === 'multi') {
        sendData({ type: 'key_press_update', progress: player.sequenceProgress });
    }

    if (player.sequenceProgress === player.currentSequence.length) {
        player.successfulSequences++;
        player.updateCombo(player.combo + 1);
        player.dom.grid.classList.add('success-glow');
        setTimeout(() => player.dom.grid.classList.remove('success-glow'), 500);
        
        player.isIdle = true;
        if(player.isLocal && gameState.mode === 'multi') {
            sendData({ type: 'player_state_update', isIdle: player.isIdle });
        }

        if (gameState.bossMode) {
            cancelAnimationFrame(player.timerId);
            const damageType = 'regular';
            if (gameState.isHost) {
                dealDamageToBoss(10, player, false);
                hostCheckBossTrigger();
            } else {
                 sendData({ type: 'damage_boss', damageType: damageType });
                if (!gameState.pendingNextWave) {
                    player.startNewSequence();
                }
            }
        } else {
            setTimeout(() => player.startNewSequence(), 300);
        }
    }
}

function handleFailure(player) {
    if (player.isLocal && player.activePlates > 0) {
        player.activePlates--;
        player.dom.grid.classList.add('success-glow'); 
        setTimeout(() => player.dom.grid.classList.remove('success-glow'), 500);
        player.startNewSequence();
        return;
    }

    gameState.lastFailer = player.peerId; 
    player.lives--;
    player.updateLives(player.lives);
    player.updateCombo(0);
    
    player.isIdle = true;
    if(player.isLocal && gameState.mode === 'multi') {
        sendData({ type: 'player_state_update', isIdle: player.isIdle });
    }

    player.dom.grid.classList.add('fail-flash');
    setTimeout(() => player.dom.grid.classList.remove('fail-flash'), 300);

    if (gameState.mode === 'multi') {
        sendData({ type: 'failure_update', lives: player.lives, peerId: player.peerId });
    }

    if (player.lives <= 0) {
        let winnerName = gameState.mode === 'multi' ? (remotePlayer ? remotePlayer.name : 'Opponent') : null;
        if (gameState.bossMode) {
            winnerName = `Survived to Wave ${gameState.currentWave}`;
        }
        gameOver(winnerName);
        if(gameState.mode === 'multi') sendData({ type: 'game_over', winnerName: remotePlayer.name });

    } else {
        setTimeout(() => {
            if (!gameState.pendingNextWave) {
                player.startNewSequence();
            }
        }, 300);
    }
}

function handleRemoteKeyPress(progress) {
    if (!remotePlayer) return;
    remotePlayer.sequenceProgress = progress;
    const arrowEl = remotePlayer.dom.sequenceContainer.children[progress - 1];
    if (arrowEl) arrowEl.classList.add('correct');
}

function resetGameToHub() {
    DOMElements.gameOverScreen.classList.remove('visible');
    DOMElements.intermissionScreen.classList.remove('visible');

    DOMElements.gameArea.classList.add('hidden');
    DOMElements.hubView.classList.remove('hidden');
    DOMElements.lobbyPlayerBar.style.display = 'flex';
    
    if (conn) conn.close();
    if (peer) peer.destroy();
    
    localPlayer = null;
    remotePlayer = null;
    
    connectToLobby();
}

function gameOver(winnerName) {
    if (gameState.status === 'gameover') return;
    gameState.status = 'gameover';
    
    clearInterval(gameState.waveModeTimerId);

    const playerData = loadPlayerData();
    playerData.highestCombo = Math.max(playerData.highestCombo || 0, localPlayer.highestCombo);
    playerData.totalSequences = (playerData.totalSequences || 0) + localPlayer.successfulSequences;
    playerData.totalGames = (playerData.totalGames || 0) + 1;
    playerData.totalDamage = (playerData.totalDamage || 0) + localPlayer.damageDealt;
    playerData.highestWave = Math.max(playerData.highestWave || 0, gameState.currentWave -1);
    savePlayerData(playerData);

    [localPlayer, remotePlayer].forEach(p => { 
        if(p) cancelAnimationFrame(p.timerId);
    });

    const titleEl = DOMElements.gameOverTitle;
    titleEl.innerHTML = '';
    
    const titleText = gameState.bossMode ? 'RUN COMPLETE' : 'GAME OVER';

    titleText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.07}s`;
        titleEl.appendChild(span);
    });

    if (winnerName) {
        DOMElements.winnerNameDisplay.textContent = winnerName;
        DOMElements.winnerNameDisplay.style.display = 'block';
    } else {
        DOMElements.winnerNameDisplay.style.display = 'none';
    }
    
    DOMElements.statsCombo.textContent = localPlayer.highestCombo;
    DOMElements.statsCleared.textContent = localPlayer.successfulSequences;
    if (gameState.bossMode) {
        DOMElements.damageStatContainer.style.display = 'block';
        DOMElements.statsDamage.textContent = localPlayer.damageDealt;
    } else {
        DOMElements.damageStatContainer.style.display = 'none';
    }
    
    DOMElements.gameOverScreen.classList.add('visible');
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function updateFullscreenIcons() {
    if (document.fullscreenElement) {
        DOMElements.fullscreenIcon.classList.add('hidden');
        DOMElements.exitFullscreenIcon.classList.remove('hidden');
    } else {
        DOMElements.fullscreenIcon.classList.remove('hidden');
        DOMElements.exitFullscreenIcon.classList.add('hidden');
    }
}

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    touchStartX = firstTouch.pageX;
    touchStartY = firstTouch.pageY;
}

function handleTouchMove(evt) {
    evt.preventDefault();
}

function handleTouchEnd(evt) {
    if (!touchStartX || !touchStartY) return;
    const touchEndX = evt.changedTouches[0].pageX;
    const touchEndY = evt.changedTouches[0].pageY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    let swipeDirection = '';
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 30) {
            swipeDirection = diffX > 0 ? 'ArrowRight' : 'ArrowLeft';
        }
    } else {
        if (Math.abs(diffY) > 30) {
            swipeDirection = diffY > 0 ? 'ArrowDown' : 'ArrowUp';
        }
    }

    if (swipeDirection) {
        handleKeyPress({key: currentSettings.keyBinds[swipeDirection] || swipeDirection, preventDefault: () => {}});
    }

    touchStartX = 0;
    touchStartY = 0;
}

function setVideoBackground() {
    const url = gameState.videoUrl;
    DOMElements.videoWallContainer.innerHTML = '';
    if (!url) {
        return;
    }

    const youtubeIdMatch = url.match(/(?:v=|youtu\.be\/|embed\/|watch?v=|&v=)([^&?#]+)/);

    if (youtubeIdMatch && youtubeIdMatch[1]) {
        const videoId = youtubeIdMatch[1];
        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3`;
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media;');
        DOMElements.videoWallContainer.appendChild(iframe);
    } else if (url.toLowerCase().endsWith('.mp4')) {
        const videoEl = document.createElement('video');
        videoEl.src = url;
        videoEl.autoplay = true;
        videoEl.muted = false;
        videoEl.loop = true;
        videoEl.playsInline = true;
        videoEl.volume = 1.0;
        DOMElements.videoWallContainer.appendChild(videoEl);
    }

    DOMElements.videoWallContainer.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
}

init();
