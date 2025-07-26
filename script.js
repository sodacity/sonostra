const DOMElements = {
    titleScreen: document.getElementById('title-screen'),
    connectionSetup: document.getElementById('connection-setup'),
    gameArea: document.getElementById('game-area'),
    videoUrlInput: document.getElementById('video-url-input'),
    videoWallContainer: document.getElementById('video-wall-container'),
    videoWallMuteBtn: document.getElementById('video-wall-mute-btn'),
    muteIcon: document.getElementById('mute-icon'),
    unmuteIcon: document.getElementById('unmute-icon'),
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
    chatBubbles: document.getElementById('chat-bubbles'),
    chatInputContainer: document.getElementById('chat-input-container'),
    gameOverScreen: document.getElementById('game-over-screen'),
    gameOverTitle: document.getElementById('game-over-title'),
    winnerNameDisplay: document.getElementById('winner-name-display'),
    rematchBtn: document.getElementById('rematch-btn'),
    bossArea: document.getElementById('boss-area'),
    bossName: document.getElementById('boss-name'),
    bossLevel: document.getElementById('boss-level'),
    bossHealthBar: document.getElementById('boss-health-bar'),
};

// --- Game Data ---
const BOSS_NAMES = ["Sonus", "Tremor", "Siren", "Symphony", "Echo", "Sonoris", "Noctaria", "Legion", "Echolyra", "Stellaria", "Orbisona"];
const BOSS_ELEMENTS = ["fire", "poison", "ice"];
const BOSS_ACTIONS = ["timer_burn", "blur", "stealth", "heal"];
const ATTACK_NAMES = {
    timer_burn: 'TIMER BURN',
    blur: 'DISTORTION FIELD',
    stealth: 'STEALTH SEQUENCE'
};
const ARROW_SVG = {
    'ArrowUp': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-up)" d="M50,0 L100,50 L85,65 L50,30 L15,65 L0,50 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M50,15 L80,45 L68,57 L50,39 L32,57 L20,45 Z"></path></svg>`,
    'ArrowDown': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-down)" d="M50,100 L0,50 L15,35 L50,70 L85,35 L100,50 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M50,85 L20,55 L32,43 L50,61 L68,43 L80,55 Z"></path></svg>`,
    'ArrowLeft': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-left)" d="M0,50 L50,0 L65,15 L30,50 L65,85 L50,100 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M15,50 L45,20 L57,32 L39,50 L57,68 L45,80 Z"></path></svg>`,
    'ArrowRight': `<svg class="arrow-icon" viewBox="0 0 100 100"><path class="arrow-bg" fill="url(#grad-right)" d="M100,50 L50,100 L35,85 L70,50 L35,15 L50,0 Z"></path><path class="arrow-shape" fill="rgba(255,255,255,0.8)" d="M85,50 L55,80 L43,68 L61,50 L43,32 L55,20 Z"></path></svg>`
};
const LIFE_SVG = `<svg class="life-heart" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

// --- Game State & Management ---
let peer, conn;
let localPlayer, remotePlayer;
let touchStartX = 0, touchStartY = 0;
let titleScreenActive = true;

const gameState = {
    isHost: false,
    mode: 'solo',
    bossMode: false,
    sequenceTurnCounter: 0,
    bossName: '',
    bossLevel: 1,
    bossElement: 'fire',
    bossMaxHealth: 250,
    bossCurrentHealth: 250,
    status: 'setup',
    videoUrl: '',
    videoMuted: false,
};

class Player {
    constructor(id, name, isLocal = false) {
        this.id = id;
        this.name = name;
        this.isLocal = isLocal;
        this.lives = 3;
        this.combo = 0;
        this.sequenceProgress = 0;
        this.successfulSequences = 0;
        this.timeLimit = 10000;
        this.sequenceLength = 3;
        this.currentSequence = [];
        this.timerId = null;

        this.dom = {
            playerArea: document.getElementById(`player${id}-container`),
            attackAnnouncement: document.getElementById(`attack-announcement-p${id}`),
            name: document.getElementById(`name-p${id}`),
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
        this.dom.comboCount.textContent = this.combo;
        if (this.combo > 0) {
            this.dom.comboContainer.classList.add('visible');
            this.dom.comboCount.classList.add('pop');
            setTimeout(() => this.dom.comboCount.classList.remove('pop'), 200);
        } else {
            this.dom.comboContainer.classList.remove('visible');
        }
    }

    startNewSequence(sequence = null) {
        this.dom.sequenceContainer.classList.remove('stealth');
        this.timeLimit = Math.max(4000, 10000 - (this.successfulSequences * 400));
        
        cancelAnimationFrame(this.timerId);
        this.sequenceProgress = 0;

        if (!sequence) {
            if (this.successfulSequences >= 8) this.sequenceLength = Math.floor(Math.random() * 5) + 4;
            else if (this.successfulSequences >= 3) this.sequenceLength = Math.min(8, this.successfulSequences + 1);
            else this.sequenceLength = 3;
            this.currentSequence = Array.from({ length: this.sequenceLength }, () => ARROW_KEYS[Math.floor(Math.random() * 4)]);
        } else {
            this.currentSequence = sequence;
        }

        this.displaySequence();
        this.startTimer();
    }

    displaySequence() {
        const sequenceLength = this.currentSequence.length;
        let arrowSize = 64; // Default desktop size
        let arrowGap = 16;  // Default desktop gap

        // Only apply special mobile sizing if the screen is narrow
        if (window.innerWidth <= 768) {
            if (sequenceLength >= 8) {
                arrowSize = 34; // Smallest size for the longest sequences
                arrowGap = 4;
            } else if (sequenceLength >= 6) {
                arrowSize = 42; // Medium size
                arrowGap = 6;
            } else { // 5 or fewer arrows
                arrowSize = 50; // Largest mobile size
                arrowGap = 8;
            }
        }
        
        // Apply these sizes as CSS variables.
        this.dom.sequenceContainer.style.setProperty('--arrow-size', `${arrowSize}px`);
        this.dom.sequenceContainer.style.setProperty('--arrow-gap', `${arrowGap}px`);

        // Populate the container with the arrows
        this.dom.sequenceContainer.innerHTML = '';
        this.currentSequence.forEach(arrowKey => {
            this.dom.sequenceContainer.innerHTML += ARROW_SVG[arrowKey];
        });
    }

    startTimer() {
        let startTime = Date.now();
        const update = () => {
            const elapsedTime = Date.now() - startTime;
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
    setupTitleScreenListeners();
    setupUIListeners();
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
    DOMElements.videoWallMuteBtn.addEventListener('click', () => {
         gameState.videoMuted = !gameState.videoMuted;
         updateVideoMuteState();
         if (gameState.mode === 'multi' && conn) {
            sendData({ type: 'video_mute_sync', muted: gameState.videoMuted });
        }
    });
    DOMElements.chatInput.addEventListener('keydown', handleChat);
    DOMElements.rematchBtn.addEventListener('click', () => {
        if (gameState.mode === 'multi') sendData({ type: 'rematch' });
        resetGame();
    });
    window.addEventListener('keydown', handleKeyPress);
    handleGameModeChange();
}

function handleGameModeChange() {
    const isVersus = DOMElements.gameModeToggle.checked;
    if (isVersus) {
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
    setVideoBackground();
    gameState.isHost = true;
    gameState.bossMode = DOMElements.bossModeToggle.checked;
    const playerName = DOMElements.playerNameInput.value || 'Player 1';
    
    if (gameState.mode === 'solo') {
        localPlayer = new Player(1, playerName, true);
        localPlayer.dom.playerArea.classList.add('is-local-player');
        localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
        localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
        localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);
        
        DOMElements.player2Container.style.display = 'none';
        if (gameState.bossMode) initBoss();
        
        transitionToGameArea();
        setTimeout(() => localPlayer.startNewSequence(), 1000);
    } else { // Multiplayer
        const roomName = DOMElements.roomNameInput.value;
        if (!roomName) return alert('Please enter a room name.');
        
        localPlayer = new Player(1, playerName, true);
        localPlayer.dom.playerArea.classList.add('is-local-player');
        localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
        localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
        localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);

        if (gameState.bossMode) initBoss();
        
        peer = new Peer(roomName);
        peer.on('open', id => console.log('PeerJS room created: ' + id));
        peer.on('connection', newConn => { conn = newConn; setupConnection(); });
        peer.on('error', err => alert('PeerJS Error: ' + err.type));
    }
}

function onJoinGameClick() {
    setVideoBackground();
    gameState.isHost = false;
    const playerName = DOMElements.playerNameInput.value || 'Player 2';
    const roomName = DOMElements.roomNameInput.value;
    if (!roomName) return alert('Please enter a room name to join.');

    localPlayer = new Player(2, playerName, true);
    localPlayer.dom.playerArea.classList.add('is-local-player');
    localPlayer.dom.grid.addEventListener('touchstart', handleTouchStart, false);
    localPlayer.dom.grid.addEventListener('touchmove', handleTouchMove, false);
    localPlayer.dom.grid.addEventListener('touchend', handleTouchEnd, false);

    peer = new Peer();
    peer.on('open', () => { conn = peer.connect(roomName); setupConnection(); });
    peer.on('error', err => alert('PeerJS Error: ' + err.type));
}

function setupConnection() {
    conn.on('open', () => {
        if (!gameState.isHost) {
            sendData({ type: 'player_join', name: localPlayer.name });
        }
        transitionToGameArea();
    });

    conn.on('data', data => {
        switch (data.type) {
            case 'player_join':
                if (gameState.isHost) {
                    remotePlayer = new Player(2, data.name, false);
                    remotePlayer.dom.playerArea.classList.add('is-remote-player');
                    sendData({
                        type: 'initial_state',
                        hostName: localPlayer.name,
                        videoUrl: gameState.videoUrl,
                        videoMuted: gameState.videoMuted,
                        bossState: gameState.bossMode ? {
                            name: gameState.bossName,
                            level: gameState.bossLevel,
                            element: gameState.bossElement,
                            maxHealth: gameState.bossMaxHealth,
                            currentHealth: gameState.bossCurrentHealth,
                        } : null
                    });
                    setTimeout(() => {
                        localPlayer.startNewSequence();
                        sendData({ type: 'new_sequence', sequence: localPlayer.currentSequence, combo: localPlayer.combo });
                        
                        // Always send a starting sequence to the guest in multiplayer
                        const guestSequence = Array.from({ length: 3 }, () => ARROW_KEYS[Math.floor(Math.random() * 4)]);
                        remotePlayer.startNewSequence(guestSequence);
                        sendData({ type: 'start_game', sequence: guestSequence });
                    }, 500);
                }
                break;
            case 'initial_state':
                if(data.bossState) {
                    gameState.bossMode = true;
                    initBoss(data.bossState);
                }
                remotePlayer = new Player(1, data.hostName, false);
                remotePlayer.dom.playerArea.classList.add('is-remote-player');
                gameState.videoUrl = data.videoUrl;
                gameState.videoMuted = data.videoMuted;
                setVideoBackground();
                break;
            case 'start_game':
                if (localPlayer && !gameState.isHost) {
                    localPlayer.startNewSequence(data.sequence);
                }
                break;
            case 'new_sequence':
                if (remotePlayer) {
                    remotePlayer.startNewSequence(data.sequence);
                    remotePlayer.updateCombo(data.combo);
                }
                hostCheckBossTrigger(); // Host counts guest's turns
                break;
            case 'key_press_update':
                if (remotePlayer) handleRemoteKeyPress(data.progress);
                break;
            case 'failure_update':
                 if (remotePlayer) remotePlayer.updateLives(data.lives);
                break;
            case 'boss_health_update':
                updateBossHealth(data.newHealth);
                break;
            case 'boss_action':
                if (data.action === 'heal') {
                    DOMElements.bossArea.classList.add('boss-healing');
                    setTimeout(() => DOMElements.bossArea.classList.remove('boss-healing'), 1000);
                } else {
                    const target = data.targetId === localPlayer.id ? localPlayer : remotePlayer;
                    if(target) {
                       DOMElements.bossArea.classList.add('boss-acting');
                       setTimeout(() => DOMElements.bossArea.classList.remove('boss-acting'), 1000);
                       applyBossAttack(data.action, target);
                    }
                }
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
            case 'video_mute_sync':
                gameState.videoMuted = data.muted;
                updateVideoMuteState();
                break;
        }
    });
}

// --- Boss Functions ---
function initBoss(bossState = null) {
    DOMElements.bossArea.style.display = 'block';
    if (bossState) {
        gameState.bossName = bossState.name;
        gameState.bossLevel = bossState.level;
        gameState.bossElement = bossState.element;
        gameState.bossMaxHealth = bossState.maxHealth;
        gameState.bossCurrentHealth = bossState.currentHealth;
    } else {
        gameState.bossName = BOSS_NAMES[Math.floor(Math.random() * BOSS_NAMES.length)];
        gameState.bossLevel = Math.floor(Math.random() * 10) + 1;
        gameState.bossElement = BOSS_ELEMENTS[Math.floor(Math.random() * BOSS_ELEMENTS.length)];
        gameState.bossCurrentHealth = gameState.bossMaxHealth;
    }
    DOMElements.bossName.textContent = gameState.bossName;
    DOMElements.bossLevel.textContent = `Lvl ${gameState.bossLevel}`;
    DOMElements.bossArea.className = gameState.bossElement;
    updateBossHealth(gameState.bossCurrentHealth);
}

function hostCheckBossTrigger() {
    if (!gameState.isHost || !gameState.bossMode || gameState.status !== 'playing') return;
    gameState.sequenceTurnCounter++;
    if(gameState.sequenceTurnCounter > 0 && gameState.sequenceTurnCounter % 3 === 0) {
        triggerBossAction();
    }
}

function triggerBossAction() {
    const action = BOSS_ACTIONS[Math.floor(Math.random() * BOSS_ACTIONS.length)];
    
    if (action === 'heal') {
        DOMElements.bossArea.classList.add('boss-healing');
        setTimeout(() => DOMElements.bossArea.classList.remove('boss-healing'), 1000);
        applyBossHeal();
        sendData({ type: 'boss_action', action: 'heal' });
        sendData({ type: 'boss_health_update', newHealth: gameState.bossCurrentHealth });
    } else {
        const target = gameState.mode === 'multi' ? (Math.random() < 0.5 ? localPlayer : remotePlayer) : localPlayer;
        if (!target) return;
        DOMElements.bossArea.classList.add('boss-acting');
        setTimeout(() => DOMElements.bossArea.classList.remove('boss-acting'), 1000);
        applyBossAttack(action, target);
        if(gameState.mode === 'multi') sendData({ type: 'boss_action', action: action, targetId: target.id });
    }
}

function applyBossHeal() {
    const newHealth = Math.min(gameState.bossMaxHealth, gameState.bossCurrentHealth + 10);
    updateBossHealth(newHealth);
}

function showAttackAnnouncement(attackType, player) {
    const attackName = ATTACK_NAMES[attackType];
    if (!attackName || !player) return;
    const container = player.dom.attackAnnouncement;
    container.innerHTML = '';
    attackName.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.05}s`;
        container.appendChild(span);
    });
    container.classList.add('visible');
    setTimeout(() => container.classList.remove('visible'), 2500);
}

function applyBossAttack(attackType, player) {
    if (!player) return;
    
    showAttackAnnouncement(attackType, player);
    player.dom.playerArea.classList.add('shake');
    setTimeout(() => player.dom.playerArea.classList.remove('shake'), 500);

    switch(attackType) {
        case 'timer_burn':
            const currentWidth = parseFloat(player.dom.timerBar.style.width) || 100;
            player.dom.timerBar.style.width = `${Math.max(0, currentWidth - 30)}%`;
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
    }
}

function dealDamageToBoss(damage) {
    if (gameState.status !== 'playing') return;
    const newHealth = Math.max(0, gameState.bossCurrentHealth - damage);
    updateBossHealth(newHealth);

    if (gameState.mode === 'multi') sendData({ type: 'boss_health_update', newHealth: newHealth });

    if (newHealth <= 0) {
        const winner = gameState.mode === 'multi' ? `${localPlayer.name} & ${remotePlayer.name}` : localPlayer.name;
        gameOver(`${winner} Victorious!`);
    }
}

function updateBossHealth(health) {
    gameState.bossCurrentHealth = health;
    const healthPercent = (gameState.bossCurrentHealth / gameState.bossMaxHealth) * 100;
    DOMElements.bossHealthBar.style.width = `${healthPercent}%`;
}

// --- Core Game Logic ---
function sendData(data) { if (conn && conn.open) { conn.send(data); } }
function transitionToGameArea() {
    DOMElements.connectionSetup.style.display = 'none';
    DOMElements.gameArea.style.display = 'flex';
    if (gameState.mode === 'multi') {
        DOMElements.chatInputContainer.style.display = 'block';
    }
}

function handleKeyPress(e) {
    if (gameState.status === 'gameover' || titleScreenActive) return;
    const key = e.key || e; // Allow string to be passed directly
    if (!ARROW_KEYS.includes(key)) return;
    
    if (gameState.status === 'setup') gameState.status = 'playing';

    if(e.preventDefault) e.preventDefault();
    const player = localPlayer;
    if (!player || !player.currentSequence || player.currentSequence.length === 0) return;

    if (key === player.currentSequence[player.sequenceProgress]) {
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

        if (gameState.bossMode) {
            if (player.successfulSequences > 0 && player.successfulSequences % 10 === 0) {
                dealDamageToBoss(25);
            }
        }

        player.dom.grid.classList.add('success-glow');
        setTimeout(() => player.dom.grid.classList.remove('success-glow'), 500);

        setTimeout(() => {
            player.startNewSequence();
            if (gameState.mode === 'multi') {
                sendData({ type: 'new_sequence', sequence: player.currentSequence, combo: player.combo });
            } else {
                hostCheckBossTrigger(); // Call for solo player
            }
        }, 300);
    }
}

function handleFailure(player) {
    player.lives--;
    player.updateLives(player.lives);
    player.updateCombo(0);

    player.dom.grid.classList.add('fail-flash');
    setTimeout(() => player.dom.grid.classList.remove('fail-flash'), 300);

    if (gameState.mode === 'multi') {
        sendData({ type: 'failure_update', lives: player.lives });
    }

    if (player.lives <= 0) {
        let winnerName;
        if (gameState.bossMode) {
            winnerName = `${gameState.bossName} Wins!`;
        } else {
            winnerName = gameState.mode === 'solo' ? null : (remotePlayer ? remotePlayer.name : 'Opponent');
        }
        gameOver(winnerName);
        if(gameState.mode === 'multi' && !gameState.bossMode) sendData({ type: 'game_over', winnerName: remotePlayer.name });
        if(gameState.mode === 'multi' && gameState.bossMode) sendData({ type: 'game_over', winnerName: `${gameState.bossName} Wins!` });

    } else {
        setTimeout(() => {
            player.startNewSequence();
            if (gameState.mode === 'multi') {
                sendData({ type: 'new_sequence', sequence: player.currentSequence, combo: player.combo });
            } else {
                hostCheckBossTrigger(); // Call for solo player
            }
        }, 300);
    }
}

function handleRemoteKeyPress(progress) {
    if (!remotePlayer) return;
    remotePlayer.sequenceProgress = progress;
    const arrowEl = remotePlayer.dom.sequenceContainer.children[progress - 1];
    if (arrowEl) arrowEl.classList.add('correct');
    const offset = (progress * -74) + 'px';
    remotePlayer.dom.sequenceContainer.style.transform = `translate(calc(-50% + ${offset}), -50%)`;
}

function resetGame() {
    if (!localPlayer) return;
    DOMElements.gameOverScreen.classList.remove('visible');
    DOMElements.player1Container.classList.remove('is-local-player', 'is-remote-player');
    DOMElements.player2Container.classList.remove('is-local-player', 'is-remote-player');


    gameState.status = 'playing';
    gameState.sequenceTurnCounter = 0;
    if(gameState.bossMode) {
        initBoss(); // Re-randomize boss for the rematch
    }

    localPlayer.updateLives(3);
    localPlayer.updateCombo(0);
    localPlayer.successfulSequences = 0;
    if (remotePlayer) {
        remotePlayer.updateLives(3);
        remotePlayer.updateCombo(0);
        remotePlayer.successfulSequences = 0;
    }

    if (gameState.mode === 'solo') {
        localPlayer.startNewSequence();
    } else if (gameState.isHost) {
        localPlayer.startNewSequence();
        sendData({ type: 'new_sequence', sequence: localPlayer.currentSequence, combo: player.combo });
        
        const guestSequence = Array.from({ length: 3 }, () => ARROW_KEYS[Math.floor(Math.random() * 4)]);
        remotePlayer.startNewSequence(guestSequence);
        sendData({ type: 'start_game', sequence: guestSequence });
    }
}

function gameOver(winnerName) {
    gameState.status = 'gameover';
    [localPlayer, remotePlayer].forEach(p => { if(p) cancelAnimationFrame(p.timerId) });

    const titleEl = DOMElements.gameOverTitle;
    const titleText = 'GAME OVER';
    titleEl.innerHTML = ''; // Clear previous title

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
    
    DOMElements.gameOverScreen.classList.add('visible');
}

// --- Touch Input Functions ---
function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    touchStartX = firstTouch.pageX;
    touchStartY = firstTouch.pageY;
}

function handleTouchMove(evt) {
    evt.preventDefault(); // Prevent scrolling while swiping
}

function handleTouchEnd(evt) {
    if (!touchStartX || !touchStartY) return;
    const touchEndX = evt.changedTouches[0].pageX;
    const touchEndY = evt.changedTouches[0].pageY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    let swipeDirection = '';
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (Math.abs(diffX) > 30) { // Minimum swipe distance
            swipeDirection = diffX > 0 ? 'ArrowRight' : 'ArrowLeft';
        }
    } else {
        // Vertical swipe
        if (Math.abs(diffY) > 30) { // Minimum swipe distance
            swipeDirection = diffY > 0 ? 'ArrowDown' : 'ArrowUp';
        }
    }

    if (swipeDirection) {
        handleKeyPress(swipeDirection);
    }

    // Reset values
    touchStartX = 0;
    touchStartY = 0;
}

// --- Video Wall Functions ---
function setVideoBackground() {
    const url = gameState.videoUrl;
    DOMElements.videoWallContainer.innerHTML = '';
    if (!url) {
        DOMElements.videoWallMuteBtn.classList.add('hidden');
        return;
    }

    const youtubeIdMatch = url.match(/(?:v=|youtu\.be\/|embed\/|watch\?v=|&v=)([^&?#]+)/);

    if (youtubeIdMatch && youtubeIdMatch[1]) {
        const videoId = youtubeIdMatch[1];
        const muteParam = gameState.videoMuted ? 1 : 0;
        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${muteParam}&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3`;
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media;');
        DOMElements.videoWallContainer.appendChild(iframe);
    } else if (url.toLowerCase().endsWith('.mp4')) {
        const videoEl = document.createElement('video');
        videoEl.src = url;
        videoEl.autoplay = true;
        videoEl.muted = gameState.videoMuted;
        videoEl.loop = true;
        videoEl.playsInline = true;
        if(!gameState.videoMuted) videoEl.volume = 1.0;
        DOMElements.videoWallContainer.appendChild(videoEl);
    }

    DOMElements.videoWallContainer.insertAdjacentHTML('beforeend', '<div class="overlay"></div>');
    DOMElements.videoWallMuteBtn.classList.remove('hidden');
    updateVideoMuteState();
}

function updateVideoMuteState() {
    if (gameState.videoMuted) {
        DOMElements.muteIcon.classList.remove('hidden');
        DOMElements.unmuteIcon.classList.add('hidden');
    } else {
        DOMElements.muteIcon.classList.add('hidden');
        DOMElements.unmuteIcon.classList.remove('hidden');
    }
    if(gameState.status !== 'setup') {
        setVideoBackground();
    }
}

function handleChat(e) {
    if (e.key === 'Enter' && DOMElements.chatInput.value.trim() !== '') {
        const message = DOMElements.chatInput.value.trim();
        addChatMessage(message, 'mine');
        sendData({ type: 'chat', message: message });
        DOMElements.chatInput.value = '';
    }
}

function addChatMessage(message, type) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', type);
    bubble.textContent = message;
    DOMElements.chatBubbles.appendChild(bubble);
    setTimeout(() => bubble.remove(), 5000);
}

init();
