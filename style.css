/* --- Base Setup & Theming --- */
:root {
    --background-color: #121212;
    --glass-bg: rgba(22, 22, 22, 0.6);
    --glass-border: rgba(255, 255, 255, 0.2);
    --text-color: #EAEAEA;
    --primary-color: #03A9F4;
    --secondary-color: #FF00FF;
    --success-color: #4CAF50;
    --danger-color: #F44336;
    --persona-red: #E81224;
    --font-body: 'Roboto', sans-serif;
    --font-display: 'Orbitron', sans-serif;
    --font-title: 'Audiowide', cursive;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: var(--font-body);
    background-color: var(--background-color);
    color: var(--text-color);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

/* --- Title Screen --- */
#title-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.8s ease-out;
    opacity: 1;
}
#title-screen.hidden {
    opacity: 0;
    pointer-events: none;
}
.title-main {
    font-family: var(--font-title);
    font-size: clamp(4rem, 15vw, 10rem);
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(3px 3px 8px rgba(0,0,0,0.7));
    margin-bottom: 2rem;
}
#press-start-text {
    font-family: var(--font-display);
    font-size: clamp(1rem, 3vw, 1.5rem);
    letter-spacing: 2px;
    animation: flash 1.5s infinite ease-in-out;
}
@keyframes flash {
    0%, 100% { opacity: 1; text-shadow: 0 0 5px rgba(255,255,255,0.5); }
    50% { opacity: 0.3; text-shadow: none; }
}


/* --- Video Wall --- */
#video-wall-container {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    z-index: -1; overflow: hidden; background-color: #000;
}
#video-wall-container .overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.3);
}
#video-wall-container iframe,
#video-wall-container video {
    position: absolute; top: 50%; left: 50%;
    width: 178vh; min-width: 100vw;
    height: 56.25vw; min-height: 100vh;
    transform: translate(-50%, -50%);
    pointer-events: none;
    object-fit: cover;
}

/* --- Game Overlay & Hub --- */
#game-overlay {
    width: 100%; height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative;
}

#hub-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* --- Play Game Button (Now inside News) --- */
#hub-play-game-btn {
    font-size: 1rem;
    padding: 0.6rem 2rem;
    color: white;
    text-transform: uppercase;
    font-family: var(--font-display);
    font-weight: 900;
    border: none;
    border-radius: 25px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    box-shadow: 0 4px 15px rgba(0,0,0,0.5), 0 0 10px var(--secondary-color);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    flex-shrink: 0; /* Prevent button from shrinking */
}
#hub-play-game-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0,0,0,0.6), 0 0 20px var(--secondary-color);
}


/* --- News & Updates Container --- */
#news-container {
    background: var(--glass-bg);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    width: 90%;
    max-width: 800px;
    height: 70vh;
    max-height: 600px;
    overflow-y: auto;
    color: var(--text-color);
    padding: 1rem 2rem 2rem 2rem;
    position: relative;
    z-index: 2;
}

.news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--glass-border);
}

.news-header h2 {
    font-family: var(--font-title);
    color: var(--text-color);
    margin: 0;
}

.news-item {
    margin-bottom: 2.5rem;
}
.news-item:last-child {
    margin-bottom: 0;
}

.news-item h2 {
    font-family: var(--font-title);
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.news-item .news-date {
    font-size: 0.9rem;
    color: #aaa;
    margin-bottom: 1rem;
}

.news-item p, .news-item li {
    line-height: 1.6;
}

.news-item ul {
    list-style: none;
    padding-left: 0;
}

.news-item li {
    padding-left: 1.5em;
    position: relative;
    margin-bottom: 0.5rem;
}

.news-item li::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: var(--secondary-color);
    font-size: 0.8em;
}

/* Custom Scrollbar for News */
#news-container::-webkit-scrollbar { width: 10px; }
#news-container::-webkit-scrollbar-track { background: transparent; }
#news-container::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 20px;
    border: 3px solid transparent;
    background-clip: content-box;
}
#news-container::-webkit-scrollbar-thumb:hover { background-color: var(--secondary-color); }


/* --- Lobby Player Bar (Persona 5 Style) --- */
#lobby-player-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 80px;
    background: transparent;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    z-index: 100;
    gap: 0.5rem;
}
#player-cards-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-grow: 1;
}
.player-card {
    background: white;
    color: black;
    padding: 0.5rem 1.5rem 0.5rem 2.5rem;
    font-family: var(--font-display);
    position: relative;
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
}
.player-card:hover {
    background: #eee;
    transform: translateY(-5px);
}
.player-card::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 20px solid var(--persona-red);
}
.player-card-name { font-size: 1.2rem; font-weight: 900; }
.player-card-level { font-size: 0.9rem; color: #444; display: block; text-align: right; }
#hub-chat-input {
    background: #111;
    border: 2px solid #333;
    color: white;
    padding: 0.75rem;
    border-radius: 15px;
    margin: 0;
    text-align: center;
    font-family: var(--font-display);
    width: 250px;
}

#hub-chat-send-btn, #player-list-toggle-btn {
    color: white;
    font-family: var(--font-display);
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
}
#hub-chat-send-btn:hover, #player-list-toggle-btn:hover {
    filter: brightness(1.2);
    transform: scale(1.05);
}
#hub-chat-send-btn {
    padding: 0.75rem 1.5rem;
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
}
#player-list-toggle-btn {
    width: 60px;
    height: 45px;
    font-size: 1rem;
    border-radius: 8px;
}


/* --- Persona 5 Chat Log Styles --- */
#persona-chat-container {
    position: fixed;
    bottom: 90px;
    left: 1rem;
    width: 450px;
    max-width: 40vw;
    height: 30vh;
    z-index: 99;
    display: flex;
    flex-direction: column-reverse;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to top, black 70%, transparent 100%);
    mask-image: linear-gradient(to top, black 70%, transparent 100%);
}
.chat-message-wrapper {
    margin-bottom: 1.2rem;
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.5));
}
@keyframes popIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}
.chat-message {
    background-color: white;
    color: black;
    padding: 0.85rem 1.5rem; /* Increased padding */
    font-family: var(--font-display);
    position: relative;
    border: 3px solid black;
    border-radius: 8px;
    display: inline-block;
    max-width: 100%;
}
.chat-message::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 20px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: black;
    transform: translateY(-2px);
}
.chat-message::before {
    content: '';
    position: absolute;
    bottom: -13px;
    left: 21px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: white;
    z-index: 1;
}
.chat-message-name {
    font-weight: 900;
    color: var(--persona-red);
    margin-right: 0.75rem; /* Increased margin */
    font-size: 1.1rem; /* Increased font size */
}
.chat-message-text {
    font-weight: 500;
    word-wrap: break-word;
    font-size: 1.1rem; /* Increased font size */
}


/* --- Lobby Notifications --- */
#lobby-notifications {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 150;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    pointer-events: none;
}
.lobby-notification {
    background: white;
    color: black;
    padding: 1rem 2rem;
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
    animation: fade-in-out-zoom 4s forwards;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}


/* --- Player List Modal --- */
#player-list-content {
    width: 90%;
    max-width: 450px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}
#player-list-content h2 {
    text-align: center;
    font-family: var(--font-title);
    margin-bottom: 1rem;
    color: var(--primary-color);
}
#player-list-container {
    overflow-y: auto;
    padding-right: 1rem; /* Space for scrollbar */
}
.player-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,0,0,0.2);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
}
.player-list-name {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
}
.player-list-level {
    font-size: 1rem;
    color: #ccc;
}
#player-list-container::-webkit-scrollbar { width: 8px; }
#player-list-container::-webkit-scrollbar-track { background: transparent; }
#player-list-container::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 20px;
}


/* --- Game Setup Modal --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    backdrop-filter: blur(5px);
}
#connection-setup {
    width: 100%; max-width: 550px; display: flex;
    flex-direction: column; gap: 1.5rem; text-align: center;
    position: relative;
}
#connection-setup h1 {
    font-family: var(--font-title);
    font-size: 4rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
}
.close-btn {
    position: absolute;
    top: 0.5rem;
    left: 1.5rem; /* MOVED TO THE LEFT with more space */
    background: none;
    border: none;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 10;
}

/* --- Objective Bar --- */
#objective-bar {
    position: absolute;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(45deg, rgba(10, 30, 80, 0.85), rgba(50, 10, 90, 0.85));
    border: 2px solid #88aaff;
    color: white;
    padding: 0.5rem 3rem;
    font-family: var(--font-display);
    text-align: center;
    z-index: 250;
    clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
    box-shadow: 0 0 15px rgba(136, 170, 255, 0.7);
    opacity: 0;
}
#objective-bar.visible {
    animation: slide-in-out 4s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
}
.objective-title {
    font-weight: 700;
    font-size: 1rem;
    color: #FFD700;
    letter-spacing: 2px;
}
.objective-text {
    font-size: 1.5rem;
    margin: 0;
    line-height: 1.2;
}
@keyframes slide-in-out {
    0% { transform: translate(-50%, -100px); opacity: 0; }
    15% { transform: translate(-50%, 0); opacity: 1; }
    85% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, -100px); opacity: 0; }
}


/* Announcement Banner Styles */
#wave-announcement, #warning-encounter, #reward-announcement {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-title);
    color: white;
    z-index: 300;
    pointer-events: none;
    opacity: 0;
}
#wave-announcement {
    font-size: clamp(3rem, 10vw, 6rem);
    text-shadow: 0 0 15px white, 0 0 30px var(--primary-color);
    animation: fade-in-out-zoom 2s ease-in-out forwards;
}
#reward-announcement {
    font-size: clamp(2rem, 8vw, 4rem);
    text-shadow: 0 0 15px var(--success-color);
    color: var(--success-color);
    animation: fade-in-out-zoom 1.5s ease-in-out forwards;
}
#warning-encounter {
    font-size: clamp(3rem, 12vw, 7rem);
    color: var(--danger-color);
    animation: pulse-warning 2.5s ease-in-out forwards;
}
.hidden {
    display: none !important;
}
@keyframes fade-in-out-zoom {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
}
@keyframes pulse-warning {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    35% { text-shadow: 0 0 30px var(--danger-color); }
    50% { text-shadow: 0 0 15px var(--danger-color); }
    65% { text-shadow: 0 0 30px var(--danger-color); }
    80%, 100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
        text-shadow: 0 0 15px var(--danger-color);
    }
}


#fullscreen-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
    z-index: 100;
}
#fullscreen-btn svg {
    width: 100%;
    height: 100%;
    fill: white;
}
#fullscreen-btn .hidden {
    display: none;
}


.glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    padding: 2rem;
}

#settings-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 35px;
    height: 35px;
    background: rgba(0,0,0,0.2);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.2s;
}
#settings-btn:hover {
    background: rgba(0,0,0,0.4);
    transform: rotate(45deg);
}

.input-group { display: flex; flex-direction: column; gap: 1rem; }
.input-row { display: flex; gap: 1rem; align-items: center; }
.input-group input[type="text"] {
    width: 100%; padding: 1rem 1.25rem; background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--glass-border); border-radius: 8px;
    color: var(--text-color); font-size: 1.1rem; text-align: center;
    transition: box-shadow 0.3s, border-color 0.3s;
}
.input-group input[type="text"]:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(3, 169, 244, 0.5);
}
.toggle-group {
    display: flex; justify-content: space-around; align-items: center;
    background: rgba(0, 0, 0, 0.2); padding: 0.5rem; border-radius: 8px;
}
.toggle-switch { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
.toggle-switch span { transition: color 0.3s; }
.toggle-switch input { display: none; }
.toggle-switch .slider {
    position: relative; width: 40px; height: 20px;
    background-color: #333; border-radius: 10px; transition: background-color 0.3s;
}
.toggle-switch .slider:before {
    content: ''; position: absolute; width: 16px; height: 16px;
    border-radius: 50%; background-color: white; top: 2px; left: 2px;
    transition: transform 0.3s;
}
.toggle-switch input:checked + .slider { background-color: var(--primary-color); }
.toggle-switch input:checked + .slider:before { transform: translateX(20px); }
.button-group { display: flex; gap: 1rem; justify-content: center; }
.btn {
    padding: 0.85rem 2rem; border: none; border-radius: 8px;
    font-size: 1.1rem; font-weight: 700; cursor: pointer;
    transition: all 0.2s ease; text-transform: uppercase;
    transform: scale(1);
}
.btn:hover {
    transform: scale(1.05);
}
.btn-primary { background: var(--primary-color); color: white; box-shadow: 0 0 10px var(--primary-color), 0 4px 15px rgba(3, 169, 244, 0.3); }
.btn-primary:hover { background: #0398dc; box-shadow: 0 0 20px var(--primary-color), 0 4px 20px rgba(3, 169, 244, 0.4); }
.btn-secondary { background: #444; color: #ccc; }
.btn-secondary:hover { background: #555; }

/* --- Settings Screen --- */
#settings-screen {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 600px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
#settings-screen.hidden { display: none; }
#settings-screen h1 {
    font-family: var(--font-title);
    text-align: center;
    font-size: 3rem;
}
.settings-section {
    padding: 1rem;
    background: rgba(0,0,0,0.2);
    border-radius: 12px;
}
.settings-section h2 {
    font-family: var(--font-display);
    margin-bottom: 1rem;
    text-align: center;
    color: var(--primary-color);
}
.control-grid, .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
.control-item, .color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}
.control-item label, .color-item label {
    font-weight: 500;
    color: #ccc;
}
.control-item input[type="text"] {
    width: 100%;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 1rem;
    text-align: center;
}
.control-item button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 700;
    font-family: var(--font-display);
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s;
}
.control-item button:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}
.control-item button.listening {
    border-color: var(--danger-color);
    color: var(--danger-color);
    animation: pulse-red 1s infinite;
}

input[type="color"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 40px;
    background-color: transparent;
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    cursor: pointer;
}
input[type="color"]::-webkit-color-swatch {
    border-radius: 6px;
    border: none;
}
input[type="color"]::-moz-color-swatch {
    border-radius: 6px;
    border: none;
}


/* --- Lobby Overlay --- */
#lobby-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 150;
    transition: opacity 0.5s;
}
#lobby-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}
#lobby-text {
    font-family: var(--font-display);
    font-size: 3rem;
    text-align: center;
    text-shadow: 0 0 10px white;
}
#lobby-text.countdown-pop {
    animation: pop-in 1s;
}


/* --- Game Area --- */
#game-area {
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
#wave-mode-timer {
    font-family: var(--font-display);
    font-size: 3rem;
    text-shadow: 0 0 10px white, 0 0 20px var(--primary-color);
    margin-bottom: 0.5rem;
}
#wave-mode-timer.danger {
    color: var(--danger-color);
    animation: pulse-red-text 1.2s infinite;
}
@keyframes pulse-red-text {
    50% { text-shadow: 0 0 15px var(--danger-color), 0 0 25px var(--danger-color); }
}
#game-container { display: flex; gap: 2rem; width: 100%; max-width: 1400px; align-items: flex-start; justify-content: center; }
.player-area { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; position: relative; width: 100%; }
.player-area.shake { animation: screen-shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
.player-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 1rem; }
.player-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.player-name-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.player-name { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; }
.player-badge {
    font-size: 1.2rem;
    line-height: 1;
}
.player-level {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 500;
    color: #ccc;
    margin-bottom: 0.25rem;
}
.player-lives { display: flex; gap: 0.5rem; }
.life-heart { width: 24px; height: 24px; color: var(--danger-color); filter: drop-shadow(0 0 5px var(--danger-color)); }

.levelup-text {
    position: absolute;
    top: 60px;
    left: 1rem;
    font-family: var(--font-title);
    font-size: 1.5rem;
    color: #FFD700;
    text-shadow: 0 0 8px #FFD700;
    animation: fade-in-out-local 2.5s ease-in-out forwards;
}
@keyframes fade-in-out-local {
    0% { opacity: 0; transform: translateY(10px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
}

.game-grid { width: 100%; height: 200px; position: relative; overflow: hidden; transition: box-shadow 0.3s, filter 0.2s, transform 0.3s ease-out, background-color 0.3s; -webkit-tap-highlight-color: transparent; }
.sequence-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: var(--arrow-gap, 1rem);
    transition: transform 0.2s ease-in-out, gap 0.3s ease-in-out, filter 0.3s ease-in-out;
    pointer-events: none;
}

.arrow-icon {
    width: var(--arrow-size, 64px);
    height: var(--arrow-size, 64px);
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s, width 0.3s ease-in-out, height 0.3s ease-in-out;
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
    pointer-events: none;
}
.arrow-icon .arrow-bg { transition: fill 0.2s; }
.arrow-icon .arrow-shape { transition: fill 0.2s; }
.arrow-icon.correct { opacity: 0; transform: scale(0.8); }
.arrow-icon.correct .arrow-bg { fill: url(#grad-success) !important; }

/* --- Grid State Animations --- */
.game-grid.fail-flash { animation: flash-red 0.3s ease; }
@keyframes flash-red { 0%, 100% { background: var(--glass-bg); } 50% { background: rgba(244, 67, 54, 0.5); } }

.game-grid.success-glow { animation: glow-green 0.5s ease; }
@keyframes glow-green {
    0% { box-shadow: 0 0 5px rgba(76, 175, 80, 0), 0 0 5px rgba(76, 175, 80, 0) inset; }
    50% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.8), 0 0 15px rgba(76, 175, 80, 0.7) inset; }
    100% { box-shadow: 0 0 5px rgba(76, 175, 80, 0), 0 0 5px rgba(76, 175, 80, 0) inset; }
}

.game-grid.danger-state { animation: pulse-red 1.5s infinite; }
@keyframes pulse-red {
    0% { box-shadow: 0 0 10px rgba(244, 67, 54, 0.5); }
    50% { box-shadow: 0 0 25px rgba(244, 67, 54, 1); }
    100% { box-shadow: 0 0 10px rgba(244, 67, 54, 0.5); }
}

/* --- COMBO FEVER SYSTEM & NEW RAINBOW PULSE --- */
.game-grid.combo-fever {
    --glow-color: var(--primary-color);
    --glow-size: 25px;
    animation: pulse-glow 1.5s infinite ease-in-out;
}
@keyframes pulse-glow {
    50% {
        box-shadow: 0 0 var(--glow-size) var(--glow-color), 0 0 calc(var(--glow-size) / 2) var(--glow-color) inset;
    }
}

@keyframes rainbow-glow-pulse {
    0% { filter: drop-shadow(0 0 5px #ff0000); }
    17% { filter: drop-shadow(0 0 8px #ff7f00); }
    34% { filter: drop-shadow(0 0 12px #ffff00); }
    51% { filter: drop-shadow(0 0 8px #00ff00); }
    68% { filter: drop-shadow(0 0 12px #0000ff); }
    85% { filter: drop-shadow(0 0 8px #9400d3); }
    100% { filter: drop-shadow(0 0 5px #ff0000); }
}

.game-grid.combo-fever .arrow-icon {
    animation: rainbow-glow-pulse 2s infinite linear;
}

.game-grid.attack-launch { animation: attack-launch 0.4s ease-out; }
@keyframes attack-launch {
    50% { box-shadow: 0 0 25px var(--primary-color), 0 0 20px var(--primary-color) inset; }
}

.game-grid.grid-tilting { animation: grid-tilt 0.5s ease-in-out; }
@keyframes grid-tilt {
    0%, 100% { transform: rotate(0) translateX(0); }
    50% { transform: rotate(7deg) translateX(20px); }
}


.timer-bar-container { width: 100%; height: 10px; background: rgba(0, 0, 0, 0.3); border-radius: 5px; overflow: hidden; position: relative; }
.timer-bar {
    width: 100%; height: 100%;
    background: linear-gradient(90deg, var(--success-color), #FFEB3B, var(--danger-color));
    border-radius: 5px; transition: width 0.1s linear;
}

.timer-bar-container.decay-active .timer-bar {
    animation: pulse-red-timer 0.5s infinite;
}
@keyframes pulse-red-timer {
    50% { box-shadow: 0 0 15px var(--danger-color); }
}


/* --- Combo Counter --- */
.combo-counter-container {
    font-family: var(--font-display);
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s, transform 0.3s;
}
.combo-counter-container.visible {
    opacity: 1;
    transform: translateY(0);
}
.combo-count {
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1;
    display: inline-block;
    color: #FFEB3B;
    text-shadow: 0 0 8px #FFEB3B;
}
.combo-label {
    font-size: 1rem;
    font-weight: 700;
    display: block;
    color: var(--text-color);
}
.combo-count.pop {
    animation: pop-in 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}


.fever-text {
    font-family: var(--font-title);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 3px;
    height: 1.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbow-shift 2s ease-in-out infinite;
}

@keyframes rainbow-shift {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}


/* --- Game Over Screen --- */
#game-over-screen {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom, rgba(18, 18, 18, 0.9) 0%, rgba(18, 18, 18, 0) 70%);
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10vh;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
}
#game-over-screen.visible {
    opacity: 1;
    pointer-events: all;
}
#game-over-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
}
#game-over-title {
    font-family: var(--font-title);
    font-size: 5rem;
    line-height: 1;
    text-transform: uppercase;
    color: var(--danger-color);
    text-shadow: 0 0 15px var(--danger-color);
    margin-bottom: 0;
}
#game-over-title .char {
    display: inline-block;
    opacity: 0;
    transform: translateY(-100px);
    animation-fill-mode: forwards;
}
#game-over-screen.visible .char {
    animation: fall-in 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}
#winner-name-display {
    font-family: var(--font-display);
    font-size: 2rem;
    opacity: 0;
    animation-fill-mode: forwards;
    margin-bottom: 1rem;
}
#game-over-screen.visible #winner-name-display {
    opacity: 1;
    animation: glimmer 2.5s infinite;
    animation-delay: 1s;
}
#game-over-content .btn {
    opacity: 0;
    animation-fill-mode: forwards;
}
#game-over-screen.visible #game-over-content .btn {
    pointer-events: all;
}
#game-over-screen.visible .btn {
    animation: fade-in 1s ease forwards;
    animation-delay: 1.2s;
}
#post-game-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
    background: rgba(0,0,0,0.2);
    padding: 1rem 2rem;
    border-radius: 12px;
}
.stat-item {
    text-align: center;
    min-width: 120px;
}
.stat-label {
    font-size: 0.9rem;
    color: #aaa;
    display: block;
    text-transform: uppercase;
}
.stat-value {
    font-size: 2rem;
    font-family: var(--font-display);
    line-height: 1.2;
}
#next-video-section {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 450px;
    align-items: center;
}
#next-video-input {
    flex-grow: 1;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 0.9rem;
    text-align: center;
}
#change-video-btn {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
}


@keyframes fall-in {
    to { opacity: 1; transform: translateY(0); }
}
@keyframes glimmer {
    0% { color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.7); }
    50% { color: #FFEB3B; text-shadow: 0 0 20px #FFEB3B, 0 0 30px #FFC107; }
    100% { color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.7); }
}
@keyframes fade-in {
    to { opacity: 1; }
}


/* --- Intermission Screen --- */
#intermission-screen {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(18, 18, 18, 0.8);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
}
#intermission-screen.visible {
    opacity: 1;
    pointer-events: all;
}
#intermission-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    width: 90%;
    max-width: 700px;
}
#intermission-content h2 {
    font-family: var(--font-title);
    font-size: 3.5rem;
    color: var(--success-color);
    text-shadow: 0 0 15px var(--success-color);
}
#intermission-content h3 {
    font-family: var(--font-display);
    color: var(--primary-color);
    margin-top: 1rem;
}
#power-up-options {
    display: flex;
    gap: 1rem;
    justify-content: center;
    width: 100%;
}
.power-up-card {
    flex: 1;
    padding: 1rem;
    border: 2px solid var(--glass-border);
    border-radius: 12px;
    background: rgba(0,0,0,0.3);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
.power-up-card:hover {
    transform: scale(1.05);
    border-color: var(--primary-color);
}
.power-up-card.selected {
    border-color: var(--success-color);
    box-shadow: 0 0 15px var(--success-color);
    transform: scale(1.05);
}
.power-up-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
.power-up-desc {
    font-size: 0.9rem;
    color: #ccc;
}
.intermission-video-section {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 450px;
    align-items: center;
    margin-top: 1rem;
}
.intermission-video-section input {
    flex-grow: 1;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 0.9rem;
    text-align: center;
}
.intermission-video-section button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
}
#intermission-status-text {
    font-family: var(--font-display);
    font-size: 1.2rem;
    height: 1.5rem;
    margin-top: 0.5rem;
}
#intermission-countdown {
    font-family: var(--font-title);
    font-size: 5rem;
    color: #FFD700;
    text-shadow: 0 0 15px #FFD700;
    animation: pop-in 1s;
}

/* --- Boss Area --- */
#boss-area {
    width: 100%;
    max-width: 800px;
    margin-bottom: 2rem;
    text-align: center;
    font-family: var(--font-display);
    transition: transform 0.2s, filter 0.5s;
    position: relative;
}
#boss-area.crescendo-intro {
    animation: crescendo-intro-anim 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}
#boss-area.boss-acting { animation: boss-lunge-attack 1s; }
#boss-area.boss-healing { animation: boss-lunge-heal 1s; }
#boss-area.enraged {
    animation: pulse-enraged 1.2s infinite ease-in-out;
}
@keyframes crescendo-intro-anim {
    0% { transform: translateY(-150%); opacity: 0; }
    70% { transform: translateY(10%); opacity: 1; }
    100% { transform: translateY(0); opacity: 1; }
}
@keyframes pulse-enraged {
    50% { filter: drop-shadow(0 0 25px var(--danger-color)); transform: scale(1.02); box-shadow: inset 0 0 20px rgba(244, 67, 54, 0.5); }
}

#boss-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
}
#boss-symbol {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    color: var(--danger-color);
    text-shadow: 0 0 10px var(--danger-color);
}
#boss-name {
    font-size: 2rem;
    font-weight: 700;
}
#boss-area.fire #boss-name { color: #ff8c00; text-shadow: 0 0 10px #ff4800; }
#boss-area.poison #boss-name { color: #76ff03; text-shadow: 0 0 10px #76ff03; }
#boss-area.ice #boss-name { color: #40c4ff; text-shadow: 0 0 10px #40c4ff; }
#boss-level {
    font-size: 1rem;
    font-weight: 700;
    color: #ccc;
}
#boss-health-bar-container {
    width: 100%;
    height: 30px;
    background: rgba(0,0,0,0.5);
    border: 2px solid var(--glass-border);
    border-radius: 15px;
    padding: 4px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease-out, height 0.3s ease-out;
}
#boss-area.boss-active #boss-health-bar-container {
    transform: scale(1.1);
    height: 40px;
}
#boss-health-bar {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, var(--danger-color), var(--secondary-color));
    border-radius: 10px;
    transition: width 0.5s ease-out, background 0.3s ease-out;
}
#boss-area.boss-active #boss-health-bar {
    background: linear-gradient(90deg, #FFC107, #F44336);
}

.health-bar-shard {
    position: absolute;
    top: 0; bottom: 0;
    opacity: 0;
    border-radius: 10px;
}
#boss-health-bar-container.defeated #boss-health-bar,
#boss-health-bar-container.crescendo-defeated #boss-health-bar {
    opacity: 0;
}
#boss-health-bar-container.defeated #shard1 {
    left: 0; right: 50%;
    opacity: 1;
    animation: break-and-fall-left 1s forwards;
}
#boss-health-bar-container.defeated #shard2 {
    left: 50%; right: 0;
    opacity: 1;
    animation: break-and-fall-right 1s forwards;
}
@keyframes break-and-fall-left {
    to { transform: rotate(-10deg) translate(-50px, 100px); opacity: 0; }
}
@keyframes break-and-fall-right {
    to { transform: rotate(10deg) translate(50px, 100px); opacity: 0; }
}
#boss-health-bar-container.crescendo-defeated .health-bar-shard {
    opacity: 1;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
}
#boss-health-bar-container.crescendo-defeated #shard1 { left: 0; width: 20%; animation-name: crescendo-shatter1; }
#boss-health-bar-container.crescendo-defeated #shard2 { left: 20%; width: 20%; animation-name: crescendo-shatter2; }
#boss-health-bar-container.crescendo-defeated #shard3 { left: 40%; width: 20%; animation-name: crescendo-shatter3; }
#boss-health-bar-container.crescendo-defeated #shard4 { left: 60%; width: 20%; animation-name: crescendo-shatter4; }
#boss-health-bar-container.crescendo-defeated #shard5 { left: 80%; width: 20%; animation-name: crescendo-shatter5; }

@keyframes crescendo-shatter1 { to { transform: translate(-150px, 100px) rotate(-35deg); opacity: 0; } }
@keyframes crescendo-shatter2 { to { transform: translate(-50px, 200px) rotate(-15deg); opacity: 0; } }
@keyframes crescendo-shatter3 { to { transform: translate(0, 250px) rotate(0deg); opacity: 0; } }
@keyframes crescendo-shatter4 { to { transform: translate(50px, 200px) rotate(15deg); opacity: 0; } }
@keyframes crescendo-shatter5 { to { transform: translate(150px, 100px) rotate(35deg); opacity: 0; } }



@keyframes boss-lunge-attack {
    25% { transform: translateY(-10px) scale(1.03); filter: drop-shadow(0 0 15px var(--danger-color)); }
    50% { transform: translateY(0) scale(1); }
    75% { transform: translateY(-10px) scale(1.03); filter: drop-shadow(0 0 15px var(--danger-color)); }
}
@keyframes boss-lunge-heal {
    25% { transform: translateY(-10px) scale(1.03); filter: drop-shadow(0 0 15px var(--success-color)); }
    50% { transform: translateY(0) scale(1); }
    75% { transform: translateY(-10px) scale(1.03); filter: drop-shadow(0 0 15px var(--success-color)); }
}

#boss-health-bar-container.jiggle { animation: jiggle 0.3s; }
@keyframes jiggle {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
}
#boss-health-bar-container.heavy-shake { animation: heavy-shake 0.5s; }
@keyframes heavy-shake {
  0%, 100% { transform: translate(0, 0) rotate(0); }
  10%, 90% { transform: translate(-8px, 0) rotate(-2deg); }
  20%, 80% { transform: translate(8px, -4px) rotate(2deg); }
  30%, 50%, 70% { transform: translate(-8px, 4px) rotate(-1deg); }
  40%, 60% { transform: translate(8px, 0) rotate(1deg); }
}
.health-crack-effect {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: linear-gradient(115deg, transparent 48%, rgba(255,255,255,0.7) 50%, transparent 52%);
    animation: crack-fade 0.4s;
    opacity: 0;
}
@keyframes crack-fade { 50% { opacity: 1; } }


/* --- Boss Attack Effects --- */
.attack-announcement {
    position: absolute; top: 25%; left: 50%; transform: translateX(-50%);
    z-index: 50;
    font-family: var(--font-title);
    font-size: 2.5rem;
    color: var(--danger-color);
    text-shadow: 0 0 10px var(--danger-color);
    opacity: 0;
    pointer-events: none;
}
.attack-announcement.dramatic { font-size: 5rem; color: var(--danger-color); text-shadow: 0 0 20px var(--danger-color); }
.attack-announcement.visible { opacity: 1; }
.attack-announcement .char {
    display: inline-block;
    opacity: 0;
    transform: translateY(-50px);
    animation-fill-mode: forwards;
}
.attack-announcement.visible .char {
     animation-name: fall-in, fade-out-announcement;
     animation-duration: 0.6s, 1s;
     animation-delay: 0s, 1.5s;
     animation-fill-mode: forwards;
}
@keyframes fade-out-announcement { to { opacity: 0; transform: translateY(50px); } }

.game-grid.blurred { filter: blur(12px); }
.sequence-container.stealth .arrow-icon { animation: fade-out-stealth 3s forwards 1s; }
@keyframes fade-out-stealth { to { opacity: 0; } }

.sequence-container.color-scramble {
    animation: color-scramble-anim 5s linear;
}
@keyframes color-scramble-anim {
    0% { filter: hue-rotate(0deg) saturate(1); }
    25% { filter: hue-rotate(120deg) saturate(1.5); }
    50% { filter: hue-rotate(240deg) saturate(1); }
    75% { filter: hue-rotate(60deg) saturate(2); }
    100% { filter: hue-rotate(0deg) saturate(1); }
}

@keyframes screen-shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
}
.player-area.shake { animation: screen-shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }


.timer-effect {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
}
.timer-effect.visible { animation: effect-fade-out 0.5s 0.5s forwards; opacity: 1; }
.timer-fire-effect { background: linear-gradient(to top, #ff4800, transparent); animation-name: flicker; animation-duration: 0.1s; animation-iteration-count: 5; }
.timer-poison-effect { background: radial-gradient(circle, #76ff03 10%, transparent 70%); animation-name: bubble; animation-duration: 0.5s; animation-iteration-count: 1; }
.timer-ice-effect { box-shadow: inset 0 0 10px #40c4ff; border: 1px solid #40c4ff; animation-name: ice-crack; animation-duration: 0.5s; animation-iteration-count: 1;}

@keyframes effect-fade-out { to { opacity: 0; } }
@keyframes flicker { 50% { opacity: 0.7; transform: scaleX(1.05); } }
@keyframes bubble { 0% { transform: scale(0); } 100% { transform: scale(1.5); } }
@keyframes ice-crack { 50% { backdrop-filter: blur(2px); } }

/* --- In-Game Chat Styles --- */
#in-game-chat-bar {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 90%;
    max-width: 800px;
    gap: 0.5rem;
    z-index: 201; /* Above game over screen */
}
#in-game-chat-input {
    flex-grow: 1;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 1rem;
}
#in-game-chat-send-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
}
.chat-bubble-container {
    position: absolute;
    bottom: calc(100% + 50px); /* Position above player header and timer bar */
    left: 0;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
    pointer-events: none;
    z-index: 50;
}
.chat-bubble {
    font-family: var(--font-display);
    padding: 1rem 1.75rem;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    opacity: 0;
    max-width: 90%;
    word-wrap: break-word;
    font-size: 1.5rem; /* Increased font size */
    animation: bubble-fade 5s ease-in-out forwards;
    text-align: center;
}
@keyframes bubble-fade {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
}
.chat-bubble.local {
    background: var(--primary-color);
    color: white;
}
.chat-bubble.remote {
    background: var(--secondary-color);
    color: white;
}


/* --- Mobile Responsive Styles --- */
@media (max-width: 768px) {
    #news-container {
        height: 80vh; /* Allow more height for scrolling on mobile */
        max-height: 90vh;
    }
    .news-header {
        flex-direction: column;
        gap: 1rem;
    }
    #game-container { flex-direction: column; justify-content: flex-start; gap: 1rem; padding-top: 1rem; }
    #boss-area { margin-bottom: 0.5rem; width: 100%; }
    #boss-name { font-size: 1.5rem; }
    #boss-symbol { font-size: 1.2rem; }
    #connection-setup h1 { font-size: 2.5rem; }
    .attack-announcement.dramatic { font-size: 3.5rem; }
    .game-grid.blurred { filter: blur(5px); }
    .game-grid { display: flex; align-items: center; justify-content: center; }
    .sequence-container { position: relative; top: auto; left: auto; transform: none; max-width: 100%; justify-content: center; }
    .player-area.is-remote-player { order: 2; flex: 0; padding: 0.5rem; border: 1px solid var(--glass-border); border-radius: 12px; background: rgba(0,0,0,0.2); }
    .player-area.is-local-player { order: 1; }
    .is-remote-player .game-grid, .is-remote-player .timer-bar-container, .is-remote-player .combo-counter-container, .is-remote-player .attack-announcement { display: none; }
    .is-remote-player .player-header { padding: 0;}
    .is-remote-player .player-name { font-size: 1.2rem; }
    .is-remote-player .life-heart { width: 20px; height: 20px; }
    #lobby-player-bar {
        flex-wrap: wrap;
        padding: 0.5rem;
        min-height: 60px;
    }
    #player-cards-container {
        flex-basis: 100%;
        justify-content: center;
        margin-bottom: 0.5rem;
    }
    .player-card-name { font-size: 1rem; }
    #hub-chat-input { flex-grow: 1; margin: 0; }
    #player-list-toggle-btn { margin-left: 0; flex-shrink: 0; }
    #hub-chat-send-btn { flex-shrink: 0; }
    #game-over-screen { padding-top: 5vh; }
    #game-over-title { font-size: 3.5rem; }
    #winner-name-display { font-size: 1.5rem; }
    #post-game-stats { gap: 1rem; padding: 0.75rem 1rem; }
    .stat-value { font-size: 1.5rem; }
    #power-up-options { flex-direction: column; }
    #persona-chat-container {
        width: 90%;
        max-width: 90vw;
        bottom: 130px;
    }
}

/* --- Name Prompt Modal --- */
.modal-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    width: 90%;
    max-width: 400px;
}
.modal-content h2 {
    font-family: var(--font-title);
    font-size: 2rem;
    color: var(--primary-color);
}
.modal-content p {
    margin-bottom: 0.5rem;
}
.modal-content input[type="text"] {
    width: 100%;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 1rem;
    text-align: center;
}
.modal-content .btn {
    margin-top: 1rem;
}

/* --- Hub Tab Styles --- */
.hub-tabs {
    display: flex;
    border-bottom: 1px solid var(--glass-border);
    margin-bottom: 1.5rem;
}
.hub-tab-btn {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    color: var(--text-color);
    font-family: var(--font-display);
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    border-bottom: 3px solid transparent;
}
.hub-tab-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
.hub-tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

/* --- Stats Content Styles --- */
#stats-content {
    padding: 1rem 0;
}
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}
#stats-content .stat-item {
    text-align: center;
    background: rgba(0,0,0,0.2);
    padding: 1rem;
    border-radius: 12px;
}
#stats-content .stat-label {
    font-size: 1rem;
    color: #ccc;
}
#stats-content .stat-value {
    font-size: 2.5rem;
    font-family: var(--font-display);
    color: var(--primary-color);
    line-height: 1.2;
}

/* --- New Animation Keyframes --- */
@keyframes pop-in {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes pop-out {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to { opacity: 0; transform: scale(0.95) translateY(10px); }
}

/* --- New Animation Utility Classes --- */
.anim-pop-in {
    animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
.anim-pop-out {
    animation: pop-out 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}


/* --- New Button Styles --- */
#news-container {
    position: relative; /* Needed for positioning the close button */
}

#close-hub-btn {
    position: absolute;
    top: 0.5rem;
    left: 1.5rem; /* MOVED TO THE LEFT with more space */
    z-index: 10;
}

.hub-toggle-btn {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 998;
    padding: 0.5rem 1rem;
    font-family: var(--font-display);
    font-weight: 700;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s;
}
.hub-toggle-btn:hover {
    background: var(--glass-bg);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.mute-btn {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    z-index: 10;
    background: none;
    border: none;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 4px;
}
.mute-btn svg {
    width: 100%;
    height: 100%;
    fill: white;
    filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.7));
}

/* --- New Hub Clock Styles --- */
.hub-clock {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 998;
    padding: 0.5rem 1rem;
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--text-color);
    text-align: right;
    text-shadow: 0 2px 5px rgba(0,0,0,0.5);
}
.hub-clock .time {
    font-size: 1.5rem;
}
.hub-clock .day {
    font-size: 1rem;
    opacity: 0.8;
}

/* --- Hub Background Glyphs --- */
#hub-background-glyphs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.hub-glyph {
    position: absolute;
    opacity: 0;
    animation-name: float-glyph;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.hub-glyph svg {
    width: 100%;
    height: 100%;
    opacity: 0.1;
    filter: drop-shadow(0 0 8px var(--primary-color));
}

.hub-glyph svg .arrow-bg {
    /* Fill is now set dynamically via JavaScript */
}

@keyframes float-glyph {
    0% {
        transform: translateY(105vh) rotate(0deg);
        opacity: 0;
    }
    10%, 90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-10vh) rotate(360deg);
        opacity: 0;
    }
}


/* --- New Boss Attack Effect Styles --- */
.glyph-storm-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.drifting-glyph {
    position: absolute;
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
    text-shadow: 0 0 10px var(--secondary-color);
    animation-name: drift-across;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

@keyframes drift-across {
    from {
        transform: translateX(-20px) rotate(0deg);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    80% {
        opacity: 1;
    }
    to {
        transform: translateX(calc(100vw / 2)) rotate(180deg);
        opacity: 0;
    }
}

.static-veil-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.25), rgba(255,255,255,0.25) 1px, transparent 1px, transparent 2px);
    background-size: 100% 3px;
    animation: static-flicker 0.1s infinite;
    pointer-events: none;
}

@keyframes static-flicker {
    0% { opacity: 0.3; }
    20% { opacity: 0.5; }
    40% { opacity: 0.4; }
    60% { opacity: 0.7; }
    80% { opacity: 0.3; }
    100% { opacity: 0.6; }
}
