// --- NEW HELPER FUNCTIONS FOR PLAYER LEVEL ---
function loadPlayerData() {
    const saved = localStorage.getItem('sonostraPlayerData');
    if (saved) {
        return JSON.parse(saved);
    }
    return { highestWave: 0 }; // Default data if none is saved
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
    roomNameInput: document.getElementById('room-name-input'),
    chatContainer: document.getElementById('popup-chat-container'),
    chatInput: document.getElementById('chat-input'),
    chatSendBtn: document.getElementById('chat-send-btn'),
    chatBubbles: document.getElementById('chat-bubbles'),
    chatInputContainer: document.getElementById('chat-input-container'),
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
    colorUpInput: document.getElementById('color-up-input'),
    colorDownInput: document.getElementById('color-down-input'),
    colorLeftInput: document.getElementById('color-left-input'),
    colorRightInput: document.getElementById('color-right-input'),
    colorGridInput: document.getElementById('color-grid-input'),
    saveSettingsBtn: document.getElementById('save-settings-btn'),
    defaultsSettingsBtn: document.getElementById('defaults-settings-btn'),
    closeSettingsBtn: document.getElementById('close-settings-btn'),
    objectiveBar: document.getElementById('objective-bar'),
    objectiveText: document.querySelector('#objective-bar .objective-text'),
    waveModeTimer: document.getElementById('wave-mode-timer'),
    intermissionScreen: document.getElementById('intermission-screen'),
    intermissionWave: document.getElementById('intermission-wave'),
    powerUpOptions: document.getElementById('power-up-options'),
    intermissionVideoInput: document.getElementById('intermission-video-input'),
    intermissionChangeVideoBtn: document.getElementById('intermission-change-video-btn'),
    continueRunBtn: document.getElementById('continue-run-btn'),
    endRunBtn: document.getElementById('end-run-btn'),
};

// --- Settings Management ---
const defaultSettings = {
    playerName: '',
    keyBinds: { ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight' },
    colors: { up: '#2979FF', down: '#FF1744', left: '#7C4DFF', right: '#00E676', grid: '#161616' }
};
let currentSettings = JSON.parse(JSON.stringify(defaultSettings));
let chosenPowerUpEffect = null;

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

    DOMElements.playerNameInput.value = currentSettings.playerName;
}

function updateSettingsUI() {
    DOMElements.playerNameInput.value = currentSettings.playerName;
    
    DOMElements.bindUpBtn.textContent = currentSettings.keyBinds.ArrowUp;
    DOMElements.bindDownBtn.textContent = currentSettings.keyBinds.ArrowDown;
    DOMElements.bindLeftBtn.textContent = currentSettings.keyBinds.ArrowLeft;
    DOMElements.bindRightBtn.textContent = currentSettings.keyBinds.ArrowRight;
    
    DOMElements.colorUpInput.value = currentSettings.colors.up;
    DOMElements.colorDownInput.value = currentSettings.colors.down;
    DOMElements.colorLeftInput.value = currentSettings.colors.left;
    DOMElements.colorRightInput.value = currentSettings.colors.right;
    DOMElements.colorGridInput.value = currentSettings.colors.grid;
}

function saveSettings() {
    currentSettings.playerName = DOMElements.playerNameInput.value;
    currentSettings.colors.up = DOMElements.colorUpInput.value;
    currentSettings.colors.down = DOMElements.colorDownInput.value;
    currentSettings.colors.left = DOMElements.colorLeftInput.value;
    currentSettings.colors.right = DOMElements.colorRightInput.value;
    currentSettings.colors.grid = DOMElements.colorGridInput.value;

    localStorage.setItem('sonostraSettings', JSON.stringify(currentSettings));

    const saveBtn = DOMElements.saveSettingsBtn;
    saveBtn.textContent = 'Saved!';
    setTimeout(() => { saveBtn.textContent = 'Save'; }, 1500);
}

function loadSettings() {
    const saved = localStorage.getItem('sonostraSettings');
    if (saved) {
        const savedSettings = JSON.parse(saved);
        Object.assign(currentSettings.keyBinds, savedSettings.keyBinds);
        Object.assign(currentSettings.colors, savedSettings.colors);
        currentSettings.playerName = savedSettings.playerName || '';
    }
    applySettings();
    updateSettingsUI();
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
const BOSS_NAMES = ["Sonus", "Tremor", "Siren", "Symphony", "Echo"]; // Echoes
const MENACING_BOSS_NAMES = ["Sonoris", "Noctaria", "Legion", "Echolyra", "Stellaria", "Orbisona"]; // Crescendos
const BOSS_ELEMENTS = ["fire", "poison", "ice"];
const BOSS_ACTIONS = ["timer_burn", "blur", "stealth", "heal", "seismic_shift", "rhythm_shift"];
const ATTACK_NAMES = {
    timer_burn: 'TIMER BURN',
    blur: 'DISTORTION FIELD',
    stealth: 'STEALTH SEQUENCE',
    seismic_shift: 'SEISMIC SHIFT',
    rhythm_shift: 'DECAY',
    stagger: 'STAGGERED PULSE',
    blur_stealth: 'DISTORTED STEALTH'
};
const ARROW_SVG = {
    'ArrowUp': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-up)" d="M50,0 L100,50 L85,65 L50,30 L15,65 L0,50 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M50,15 L80,45 L68,57 L50,39 L32,57 L20,45 Z"></path></svg>`,
    'ArrowDown': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-down)" d="M50,100 L0,50 L15,35 L50,70 L85,35 L100,50 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M50,85 L20,55 L32,43 L50,61 L68,43 L80,55 Z"></path></svg>`,
    'ArrowLeft': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-left)" d="M0,50 L50,0 L65,15 L30,50 L65,85 L50,100 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M15,50 L45,20 L57,32 L39,50 L57,68 L45,80 Z"></path></svg>`,
    'ArrowRight': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-right)" d="M100,50 L50,100 L35,85 L70,50 L35,15 L50,0 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M85,50 L55,80 L43,68 L61,50 L43,32 L55,20 Z"></path></svg>`
};
const LIFE_SVG = `<svg class="life-heart" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const COMBO_COLORS = ['#03A9F4', '#FF00FF', '#FFFF00', '#00E676', '#7C4DFF'];

// --- Game State & Management ---
let peer, conn;
let localPlayer, remotePlayer;
let touchStartX = 0, touchStartY = 0;
let titleScreenActive = true;

const gameState = {
    isHost: false,
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
    waveModeTimeLeft: 355, // 5 minutes 55 seconds
};

class Player {
    constructor(id, name, isLocal = false) {
        this.id = id;
        this.name = name;
        this.isLocal = isLocal;
        this.isIdle = true;
        this.level = 0;
        this.lives = 3;
        this.combo = 0;
        this.sequenceProgress = 0;
        this.successfulSequences = 0;
        this.timeLimit = 10000;
        this.timerId = null;
        this.timerStartTime = 0;
        this.timeBonus = 0;
        this.hyperspeedActive = false;
        this.decayActive = false;
        this.highestCombo = 0;
        this.damageDealt = 0;
        this.hasComboShield = false;

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

        const feverIsActive = this.combo >= 15;
        const wasFeverActive = this.dom.grid.classList.contains('combo-fever');

        if (feverIsActive && !wasFeverActive) {
            this.dom.grid.classList.add('combo-fever');
            this.dom.feverText.classList.remove('hidden');
        } else if (!feverIsActive && wasFeverActive) {
            this.dom.grid.classList.remove('combo-fever');
            this.dom.feverText.classList.add('hidden');
        }

        this.hyperspeedActive = this.combo >= 30;
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
        if(this.isLocal && gameState.mode === 'multi' && conn) {
            sendData({ type: 'player_state_update', isIdle: this.isIdle });
        }

        this.dom.sequenceContainer.classList.remove('stealth');
        this.dom.grid.classList.remove('blurred');
        
        const baseTime = 10000;
        let timeReduction = gameState.currentWave * 100;
        if (gameState.currentWave >= 4) {
            timeReduction += (gameState.currentWave - 3) * 200;
        }
        this.timeLimit = Math.max(3000, baseTime - timeReduction);

        if (this.hyperspeedActive) {
            this.timeLimit *= 0.75;
        }
        
        cancelAnimationFrame(this.timerId);
        this.sequenceProgress = 0;

        if (!sequence) {
            if (gameState.isCrescendoWave) {
                this.sequenceLength = Math.floor(Math.random() * 4) + 9;
            } else {
                const baseLength = 3;
                const lengthIncrease = Math.floor(gameState.currentWave / 2);
                this.sequenceLength = Math.min(12, baseLength + lengthIncrease);

                if (this.combo > 0 && this.combo % 9 === 0) {
                    this.sequenceLength = 12;
                }
            }
            if (gameState.currentWave >= 4) {
                this.currentSequence = generateComplexSequence(this.sequenceLength);
            } else {
                this.currentSequence = Array.from({ length: this.sequenceLength }, () => ARROW_KEYS[Math.floor(Math.random() * 4)]);
            }

        } else {
            this.currentSequence = sequence;
        }

        this.displaySequence();
        this.startTimer();

        if (this.isLocal && gameState.mode === 'multi' && conn) {
            sendData({ type: 'new_sequence', sequence: this.currentSequence, combo: this.combo });
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
        this.currentSequence.forEach(arrowKey => {
            container.innerHTML += ARROW_SVG[arrowKey];
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

function setupTitleScreenListeners() {
    const proceed = () => {
        if (!titleScreenActive) return;
        titleScreenActive = false;

        DOMElements.titleScreen.classList.add('hidden');
        DOMElements.connectionSetup.classList.add('visible');

        window.removeEventListener('keydown', proceed);
        window.removeEventListener('click', proceed);
    };

    window.addEventListener('keydown', proceed);
    window.addEventListener('click', proceed);
}


function setupUIListeners() {
    DOMElements.gameModeToggle.addEventListener('change', handleGameModeChange);
    DOMElements.startBtn.addEventListener('click', onStartGameClick);
    DOMElements.joinBtn.addEventListener('click', onJoinGameClick);
    DOMElements.videoUrlInput.addEventListener('input', () => {
        gameState.videoUrl = DOMElements.videoUrlInput.value.trim();
    });
    DOMElements.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    DOMElements.chatSendBtn.addEventListener('click', sendChatMessage);
    DOMElements.rematchBtn.addEventListener('click', () => {
        if (gameState.mode === 'multi') sendData({ type: 'rematch' });
        resetGame();
    });
    DOMElements.fullscreenBtn.addEventListener('click', toggleFullScreen);
    DOMElements.changeVideoBtn.addEventListener('click', () => {
        const newUrl = DOMElements.nextVideoInput.value.trim();
        if (newUrl) {
            gameState.videoUrl = newUrl;
            DOMElements.videoUrlInput.value = newUrl;
            setVideoBackground();
            DOMElements.nextVideoInput.value = '';
            if (gameState.mode === 'multi' && conn) {
                sendData({ type: 'video_change', url: newUrl });
            }
        }
    });

    DOMElements.intermissionChangeVideoBtn.addEventListener('click', () => {
        const newUrl = DOMElements.intermissionVideoInput.value.trim();
        if (newUrl) {
            gameState.videoUrl = newUrl;
            DOMElements.videoUrlInput.value = newUrl; // Keep them in sync
            setVideoBackground();
            DOMElements.intermissionVideoInput.value = '';
        }
    });
    DOMElements.continueRunBtn.addEventListener('click', continueRun);
    DOMElements.endRunBtn.addEventListener('click', () => window.location.reload());


    // Settings screen listeners
    DOMElements.settingsBtn.addEventListener('click', () => {
        updateSettingsUI();
        DOMElements.settingsScreen.classList.remove('hidden');
    });
    DOMElements.closeSettingsBtn.addEventListener('click', () => {
        loadSettings();
        DOMElements.settingsScreen.classList.add('hidden');
    });
    DOMElements.saveSettingsBtn.addEventListener('click', saveSettings);
    DOMElements.defaultsSettingsBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to load default settings? Any unsaved changes will be lost.')) {
            currentSettings = JSON.parse(JSON.stringify(defaultSettings));
            applySettings();
            updateSettingsUI();
        }
    });

    DOMElements.bindUpBtn.addEventListener('click', () => listenForKeybind('ArrowUp', DOMElements.bindUpBtn));
    DOMElements.bindDownBtn.addEventListener('click', () => listenForKeybind('ArrowDown', DOMElements.bindDownBtn));
    DOMElements.bindLeftBtn.addEventListener('click', () => listenForKeybind('ArrowLeft', DOMElements.bindLeftBtn));
    DOMElements.bindRightBtn.addEventListener('click', () => listenForKeybind('ArrowRight', DOMElements.bindRightBtn));

    DOMElements.colorUpInput.addEventListener('input', () => { currentSettings.colors.up = DOMElements.colorUpInput.value; applySettings(); });
    DOMElements.colorDownInput.addEventListener('input', () => { currentSettings.colors.down = DOMElements.colorDownInput.value; applySettings(); });
    DOMElements.colorLeftInput.addEventListener('input', () => { currentSettings.colors.left = DOMElements.colorLeftInput.value; applySettings(); });
    DOMElements.colorRightInput.addEventListener('input', () => { currentSettings.colors.right = DOMElements.colorRightInput.value; applySettings(); });
    DOMElements.colorGridInput.addEventListener('input', () => { currentSettings.colors.grid = DOMElements.colorGridInput.value; applySettings(); });


    document.addEventListener('fullscreenchange', updateFullscreenIcons);
    window.addEventListener('keydown', handleKeyPress);
    handleGameModeChange();
}

function handleGameModeChange() {
    const isMultiplayer = DOMElements.gameModeToggle.checked;
    if (isMultiplayer) {
        gameState.mode = 'multi';
        DOMElements.joinBtn.style.display = 'block';
        DOMElements.roomNameInput.style.display = 'block';
        DOMElements.startBtn.textContent = 'Create Game';
        DOMElements.bossModeContainer.style.display = 'flex';
    } else {
        gameState.mode = 'solo';
        DOMElements.joinBtn.style.display = 'none';
        DOMElements.roomNameInput.style.display = 'none';
        DOMElements.startBtn.textContent = 'Start Game';
        DOMElements.bossModeContainer.style.display = 'flex';
    }
}

function onStartGameClick() {
    gameState.isHost = true;
    gameState.bossMode = DOMElements.bossModeToggle.checked;
    const playerName = DOMElements.playerNameInput.value || 'Player 1';
    
    if (gameState.mode === 'solo') {
        localPlayer = new Player(1, playerName, true);
        const playerData = loadPlayerData();
        localPlayer.updateLevel(playerData.highestWave);
        localPlayer.dom.playerArea.classList.add('is-local-player');
        localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
        localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
        localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);
        
        DOMElements.player2Container.style.display = 'none';
        
        transitionToGameArea();
        setVideoBackground();
        
        if (gameState.bossMode) {
            DOMElements.waveModeTimer.classList.remove('hidden');
            startWave(1);
        } else {
            DOMElements.waveModeTimer.classList.add('hidden');
            localPlayer.startNewSequence();
        }

    } else { // Multiplayer
        const roomName = DOMElements.roomNameInput.value;
        if (!roomName) return alert('Please enter a room name.');
        
        localPlayer = new Player(1, playerName, true);
        const playerData = loadPlayerData();
        localPlayer.updateLevel(playerData.highestWave);
        localPlayer.dom.playerArea.classList.add('is-local-player');
        localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
        localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
        localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);
        
        peer = new Peer(roomName);
        peer.on('open', id => {
            transitionToGameArea();
            DOMElements.lobbyOverlay.classList.remove('hidden');
            DOMElements.lobbyText.textContent = `Waiting for opponent...\nRoom: ${id}`;
        });
        peer.on('connection', newConn => { conn = newConn; setupConnection(); });
        peer.on('error', err => alert('PeerJS Error: ' + err.type));
    }
}

function onJoinGameClick() {
    gameState.isHost = false;
    const playerName = DOMElements.playerNameInput.value || 'Player 2';
    const roomName = DOMElements.roomNameInput.value;
    if (!roomName) return alert('Please enter a room name to join.');

    localPlayer = new Player(2, playerName, true);
    const playerData = loadPlayerData();
    localPlayer.updateLevel(playerData.highestWave);
    localPlayer.dom.playerArea.classList.add('is-local-player');
    localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
    localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
    localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);

    peer = new Peer();
    peer.on('open', () => {
        conn = peer.connect(roomName); 
        setupConnection();
        transitionToGameArea();
        DOMElements.lobbyOverlay.classList.remove('hidden');
        DOMElements.lobbyText.textContent = 'Connecting...';
    });
    peer.on('error', err => alert('PeerJS Error: ' + err.type));
}

function setupConnection() {
    conn.on('open', () => {
        if (!gameState.isHost) {
            DOMElements.lobbyText.textContent = 'Connected! Waiting for host...';
            sendData({ type: 'player_join', name: localPlayer.name, level: localPlayer.level });
        }
    });

    conn.on('data', data => {
        switch (data.type) {
            case 'player_join':
                if (gameState.isHost) {
                    remotePlayer = new Player(2, data.name, false);
                    remotePlayer.updateLevel(data.level);
                    remotePlayer.dom.playerArea.classList.add('is-remote-player');
                    sendData({
                        type: 'initial_state',
                        hostName: localPlayer.name,
                        level: localPlayer.level,
                        videoUrl: gameState.videoUrl,
                        bossMode: gameState.bossMode,
                    });
                    
                    startCountdown();
                    sendData({ type: 'start_countdown' });
                }
                break;
            case 'start_countdown':
                if (!gameState.isHost) startCountdown();
                break;
            case 'video_change':
                gameState.videoUrl = data.url;
                DOMElements.videoUrlInput.value = data.url;
                DOMElements.nextVideoInput.value = data.url;
                setVideoBackground();
                break;
            case 'initial_state':
                remotePlayer = new Player(1, data.hostName, false);
                remotePlayer.updateLevel(data.level);
                remotePlayer.dom.playerArea.classList.add('is-remote-player');
                gameState.videoUrl = data.videoUrl;
                gameState.bossMode = data.bossMode;
                if(gameState.bossMode && !gameState.isHost) DOMElements.waveModeTimer.classList.remove('hidden');
                break;
            case 'new_sequence':
                if (remotePlayer) {
                    remotePlayer.startNewSequence(data.sequence);
                    remotePlayer.updateCombo(data.combo);
                }
                break;
            case 'key_press_update':
                if (remotePlayer) handleRemoteKeyPress(data.progress);
                break;
            case 'failure_update':
                 if (remotePlayer) remotePlayer.updateLives(data.lives);
                break;
            case 'game_over':
                gameOver(data.winnerName);
                break;
            case 'rematch':
                resetGame();
                break;
            case 'chat':
                addChatMessage(data.message, 'theirs');
                break;
            case 'damage_boss':
                if (gameState.isHost && remotePlayer) {
                    const damage = data.damageType === 'heavy' ? 25 : 5;
                    dealDamageToBoss(damage, remotePlayer, data.damageType === 'heavy');
                }
                break;
            case 'boss_health_update':
                if (!gameState.isHost) {
                    updateBossHealth(data.health);
                }
                break;
            case 'wave_change':
                if (!gameState.isHost) {
                    startWave(data.wave);
                }
                break;
            case 'level_update':
                if (remotePlayer) {
                    remotePlayer.updateLevel(data.level);
                }
                break;
            case 'boss_attack':
                if (!gameState.isHost) {
                    applyBossAttack(data.attackType, localPlayer);
                }
                break;
            case 'player_state_update':
                if (remotePlayer) {
                    remotePlayer.isIdle = data.isIdle;
                    if (gameState.isHost && remotePlayer.isIdle && gameState.pendingNextWave) {
                        gameState.pendingNextWave = false;
                        startWave(gameState.currentWave + 1);
                    }
                }
                break;
        }
    });
}

function showObjective(text) {
    DOMElements.objectiveText.textContent = text;
    DOMElements.objectiveBar.classList.remove('hidden');
    DOMElements.objectiveBar.classList.add('visible');

    setTimeout(() => {
        DOMElements.objectiveBar.classList.remove('visible');
        DOMElements.objectiveBar.classList.add('hidden');
    }, 4000);
}

// --- Announcement and Wave Logic ---
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
            if (gameState.mode === 'multi' && conn) {
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
            showObjective("Defeat as many enemies as you can in the time limit.");
        }
    }
    
    localPlayer.startNewSequence();

    if (gameState.isHost && gameState.mode === 'multi' && conn) {
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
                
                if (gameState.bossMode) {
                    if (gameState.isHost) {
                        DOMElements.waveModeTimer.classList.remove('hidden');
                        startWave(1);
                    }
                } else {
                    DOMElements.waveModeTimer.classList.add('hidden');
                    localPlayer.startNewSequence();
                }
            }, 1000);
        }
    }, 1000);
}

// --- Timer Functions ---
function startWaveModeTimer() {
    clearInterval(gameState.waveModeTimerId);
    gameState.waveModeTimeLeft = 355; // Always reset to full time
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


// --- Boss Functions ---
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
    let availableActions = ["timer_burn", "blur", "stealth", "heal", "seismic_shift", "rhythm_shift"];
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

function applyBossAttack(attackType, player) {
    if (!player) return;
    
    showAttackAnnouncement(attackType, player, attackType === 'rhythm_shift');
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
        case 'seismic_shift':
            player.dom.grid.classList.add('grid-tilting');
            setTimeout(() => player.dom.grid.classList.remove('grid-tilting'), 3000);
            break;
        case 'rhythm_shift':
            player.decayActive = true;
            return;
        case 'stagger':
            displaySequenceStaggered(player);
            break;
        case 'blur_stealth':
            player.dom.grid.classList.add('blurred');
            setTimeout(() => {
                player.dom.sequenceContainer.classList.add('stealth');
            }, 1000);
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

    player.damageDealt += damage;
    player.dom.grid.classList.add('attack-launch');
    setTimeout(() => player.dom.grid.classList.remove('attack-launch'), 400);

    const newHealth = Math.max(0, gameState.bossCurrentHealth - damage);
    updateBossHealth(newHealth, isHeavyAttack);

    if (newHealth <= 0) {
        gameState.isTransitioning = true;
        cancelAnimationFrame(player.timerId); 
        await playDeathAnimation(gameState.isCrescendoWave);
        
        if (remotePlayer && !remotePlayer.isIdle) {
            gameState.pendingNextWave = true;
            return;
        }

        if (gameState.isCrescendoWave) {
            clearInterval(gameState.waveModeTimerId);
            showIntermissionScreen();
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

    if (healthPercent <= 25 && !gameState.bossIsEnraged) {
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

    if (gameState.isHost && gameState.mode === 'multi' && conn) {
        sendData({ type: 'boss_health_update', health: gameState.bossCurrentHealth });
    }
}

// --- Intermission & Power-ups ---
function showIntermissionScreen() {
    gameState.status = 'intermission';
    gameState.isTransitioning = false; // The transition is over.
    DOMElements.intermissionWave.textContent = gameState.currentWave;
    generatePowerUps();
    DOMElements.intermissionScreen.classList.add('visible');
}

function generatePowerUps() {
    const allPowerUps = [
        { 
            title: '❤️‍🩹 Second Wind', 
            desc: 'Restore one lost life. (If at full health, gain a temporary extra life)',
            effect: () => {
                if (localPlayer.lives < 4) localPlayer.updateLives(localPlayer.lives + 1);
            }
        },
        { 
            title: '🛡️ Combo Shield', 
            desc: 'Your combo will not reset on your next single mistake.',
            effect: () => { localPlayer.hasComboShield = true; }
        },
        { 
            title: '⏳ Overclock', 
            desc: 'Adds 60 seconds to the timer for the next stage.',
            effect: () => { gameState.waveModeTimeLeft += 60; }
        },
        {
            title: '⚡ Hyperspeed Start',
            desc: 'Begin the next stage with a 15-count combo.',
            effect: () => { localPlayer.updateCombo(15); }
        }
    ];

    // Shuffle and pick 3
    const chosenPowerUps = allPowerUps.sort(() => 0.5 - Math.random()).slice(0, 3);

    DOMElements.powerUpOptions.innerHTML = '';
    chosenPowerUps.forEach(powerup => {
        const card = document.createElement('div');
        card.className = 'power-up-card';
        card.innerHTML = `<div class="power-up-title">${powerup.title}</div><div class="power-up-desc">${powerup.desc}</div>`;
        card.addEventListener('click', () => {
            document.querySelectorAll('.power-up-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            chosenPowerUpEffect = powerup.effect;
            DOMElements.continueRunBtn.disabled = false;
        });
        DOMElements.powerUpOptions.appendChild(card);
    });
}

function continueRun() {
    DOMElements.intermissionScreen.classList.remove('visible');
    DOMElements.continueRunBtn.disabled = true;

    // Apply power-up effect first to potentially modify the upcoming timer
    if (chosenPowerUpEffect) {
        chosenPowerUpEffect();
        chosenPowerUpEffect = null; // Reset for next time
    }
    
    startWaveModeTimer(); // This will reset time to 355 AND start the interval
    startWave(gameState.currentWave + 1);
}


// --- Core Game Logic ---
function sendData(data) { if (conn && conn.open) { conn.send(data); } }
function transitionToGameArea() {
    DOMElements.connectionSetup.style.display = 'none';
    DOMElements.gameArea.style.display = 'flex';
    if (gameState.mode === 'multi') {
        DOMElements.chatInputContainer.style.display = 'flex';
    }
}

function handleKeyPress(e) {
    if (gameState.status === 'gameover' || gameState.status === 'intermission' || titleScreenActive) return;

    const pressedKey = e.key;
    const action = Object.keys(currentSettings.keyBinds).find(act => currentSettings.keyBinds[act] === pressedKey);

    if (!action) return;
    
    if (gameState.status === 'setup') gameState.status = 'playing';

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
    player.sequenceProgress++;

    if (gameState.mode === 'multi') {
        sendData({ type: 'key_press_update', progress: player.sequenceProgress });
    }

    if (player.sequenceProgress === player.currentSequence.length) {
        player.successfulSequences++;
        player.updateCombo(player.combo + 1);
        player.dom.grid.classList.add('success-glow');
        setTimeout(() => player.dom.grid.classList.remove('success-glow'), 500);
        
        if (player.hyperspeedActive) {
            player.timeBonus += 500;
        }
        
        player.isIdle = true;
        if(player.isLocal && gameState.mode === 'multi' && conn) {
            sendData({ type: 'player_state_update', isIdle: player.isIdle });
        }

        if (gameState.bossMode) {
            cancelAnimationFrame(player.timerId);
            const damageType = (player.combo > 0 && player.combo % 10 === 0) ? 'heavy' : 'regular';
            if (gameState.isHost) {
                dealDamageToBoss(damageType === 'heavy' ? 25 : 5, player, damageType === 'heavy');
            } else {
                sendData({ type: 'damage_boss', damageType: damageType });
                if (!gameState.pendingNextWave) {
                    player.startNewSequence();
                }
            }
        } else {
            setTimeout(() => player.startNewSequence(), 300);
        }
        
        if (gameState.isHost) {
            hostCheckBossTrigger();
        }
    }
}

function handleFailure(player) {
    if (player.hasComboShield) {
        player.hasComboShield = false;
        // Maybe add a visual/sound effect for the shield breaking
        player.dom.grid.classList.add('success-glow'); // Re-use an effect for now
        setTimeout(() => player.dom.grid.classList.remove('success-glow'), 500);
        player.startNewSequence(); // Restart the same sequence
        return;
    }

    player.lives--;
    player.updateLives(player.lives);
    player.updateCombo(0);
    
    player.isIdle = true;
    if(player.isLocal && gameState.mode === 'multi' && conn) {
        sendData({ type: 'player_state_update', isIdle: player.isIdle });
    }

    player.dom.grid.classList.add('fail-flash');
    setTimeout(() => player.dom.grid.classList.remove('fail-flash'), 300);

    if (gameState.mode === 'multi') {
        sendData({ type: 'failure_update', lives: player.lives });
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

function resetGame() {
    if (!localPlayer) return;
    DOMElements.gameOverScreen.classList.remove('visible');
    DOMElements.intermissionScreen.classList.remove('visible');

    clearInterval(gameState.waveModeTimerId);
    DOMElements.waveModeTimer.classList.add('hidden');
    DOMElements.waveModeTimer.classList.remove('danger');


    gameState.status = 'setup'; // Reset to setup, will become 'playing' on first keypress
    gameState.isTransitioning = false;
    gameState.pendingNextWave = false;
    gameState.sequenceTurnCounter = 0;
    gameState.bossIsEnraged = false;
    gameState.currentWave = 1;
    gameState.isCrescendoWave = false;
    
    touchStartX = 0;
    touchStartY = 0;

    [localPlayer, remotePlayer].forEach(p => {
        if (p) {
            p.updateLives(3);
            p.updateCombo(0);
            p.successfulSequences = 0;
            p.highestCombo = 0;
            p.damageDealt = 0;
            p.isIdle = true;
            p.hasComboShield = false;
        }
    });
    
    const playerData = loadPlayerData();
    localPlayer.updateLevel(playerData.highestWave);

    if (gameState.mode === 'solo') {
        if (gameState.bossMode) {
            DOMElements.waveModeTimer.classList.remove('hidden');
            startWave(1);
        } else {
            DOMElements.waveModeTimer.classList.add('hidden');
            localPlayer.startNewSequence();
        }
    } else if (gameState.isHost) {
        startCountdown();
        sendData({type: 'start_countdown'});
    }
}

function gameOver(winnerName) {
    if (gameState.status === 'gameover') return;
    gameState.status = 'gameover';
    
    clearInterval(gameState.waveModeTimerId);

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

function sendChatMessage() {
    if (DOMElements.chatInput.value.trim() !== '') {
        const message = DOMElements.chatInput.value.trim();
        addChatMessage(message, 'mine');
        sendData({ type: 'chat', message: message });
        DOMElements.chatInput.value = '';
    }
}

// --- Touch Input Functions ---
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
        handleKeyPress({key: swipeDirection, preventDefault: () => {}}); //Simulate key press
    }

    touchStartX = 0;
    touchStartY = 0;
}

// --- Video Wall Functions ---
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

function addChatMessage(message, type) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', type);
    bubble.textContent = message;
    DOMElements.chatBubbles.appendChild(bubble);
    setTimeout(() => bubble.remove(), 5000);
}

init();