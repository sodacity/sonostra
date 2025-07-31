document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const screens = {
        home: document.getElementById('home-screen'),
        chat: document.getElementById('chat-screen'),
        idModal: document.getElementById('id-modal'),
    };
    const hostBtn = document.getElementById('host-btn');
    const joinBtn = document.getElementById('join-btn');
    const closeIdBtn = document.getElementById('close-id-btn');
    const messageInput = document.getElementById('message-input');
    const sendBtns = document.querySelectorAll('.send-btn');
    const messagesContainer = document.getElementById('messages-container');
    const qrCodeContainer = document.getElementById('qrcode');
    const hostIdText = document.getElementById('host-id-text');

    let peer;
    let dataConnection;

    // --- Navigation ---
    function navigateTo(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        if (screens[screenName]) {
            screens[screenName].classList.add('active');
        }
    }

    // --- Connection Setup ---
    function initializeConnection(conn) {
        dataConnection = conn;
        dataConnection.on('open', () => {
            navigateTo('chat');
        });
        dataConnection.on('data', (data) => {
            const message = JSON.parse(data);
            displayMessage(message.text, message.lang, 'received');
        });
        dataConnection.on('close', () => {
            alert('The other user has disconnected.');
            if (peer) peer.destroy();
            navigateTo('home');
        });
    }

    // --- Reset UI state ---
    function resetButtons() {
        hostBtn.disabled = false;
        hostBtn.textContent = 'Host a Room';
        joinBtn.disabled = false;
        joinBtn.textContent = 'Join a Room';
    }

    // --- Automatically Join if URL has hostId ---
    const urlParams = new URLSearchParams(window.location.search);
    const hostIdFromUrl = urlParams.get('hostId');

    if (hostIdFromUrl) {
        screens.home.classList.remove('active');
        if (peer) peer.destroy();
        peer = new Peer();
        peer.on('open', () => {
            const conn = peer.connect(hostIdFromUrl);
            initializeConnection(conn);
        });
        peer.on('error', (err) => {
            alert('Failed to connect: ' + err.message);
            window.location.search = ''; // Clear params and reload
        });
    } else {
        navigateTo('home');
    }

    // --- UI Event Listeners ---
    
    // HOST: User clicks "Host a Room"
    hostBtn.addEventListener('click', () => {
        // FIXED: Provide immediate feedback and handle state
        hostBtn.disabled = true;
        hostBtn.textContent = 'Initializing...';
        joinBtn.disabled = true;

        if (peer) peer.destroy();
        peer = new Peer();

        peer.on('open', (id) => {
            resetButtons();
            const cleanUrl = `${window.location.origin}${window.location.pathname}`;
            const joinUrl = `${cleanUrl}?hostId=${id}`;

            hostIdText.textContent = id;
            qrCodeContainer.innerHTML = '';
            qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
            const qr = qrcode(0, 'L');
            qr.addData(joinUrl, 'Byte');
            qr.make();
            qrCodeContainer.innerHTML = qr.createImgTag(6, 0);

            navigateTo('idModal');
        });

        peer.on('connection', (conn) => {
            initializeConnection(conn);
        });

        peer.on('error', (err) => {
            alert('An error occurred: ' + err.message);
            resetButtons();
        });
    });

    // GUEST (Manual Join): User clicks "Join a Room"
    joinBtn.addEventListener('click', () => {
        const manualHostId = prompt("Please enter the host's ID:");
        if (!manualHostId) return;
        
        // FIXED: Provide immediate feedback and handle state
        joinBtn.disabled = true;
        joinBtn.textContent = 'Connecting...';
        hostBtn.disabled = true;

        if (peer) peer.destroy();
        peer = new Peer();
        peer.on('open', () => {
            const conn = peer.connect(manualHostId);
            conn.on('error', (err) => { // Handle connection-specific errors
                alert('Connection failed: ' + err.message);
                resetButtons();
            });
            initializeConnection(conn);
        });
        peer.on('error', (err) => {
            alert('An error occurred: ' + err.message);
            resetButtons();
        });
    });

    closeIdBtn.addEventListener('click', () => {
        if (peer) peer.destroy(); // End the peer connection when host closes modal
        navigateTo('home');
    });

    // --- Message & Translation Logic (Unchanged) ---
    async function translateAndSend(text, langPair) {
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`);
            const data = await response.json();
            const translatedText = data.responseData.translatedText;
            const message = { text: translatedText, lang: 'ja' };
            dataConnection.send(JSON.stringify(message));
            displayMessage(translatedText, 'ja', 'sent');
        } catch (error) {
            console.error('Translation error:', error);
            displayMessage('Translation Error', 'en', 'sent');
        }
    }

    function displayMessage(message, lang, type) {
        const bubble = document.createElement('div');
        bubble.className = `bubble ${type}`;
        bubble.dataset.lang = lang;
        const parts = (lang === 'ja') ? message.split('') : message.split(/(\s+)/);
        parts.forEach((part, index) => {
            if (part.trim() !== '' || (lang === 'ja' && part.trim() === '')) {
                const span = document.createElement('span');
                span.textContent = part;
                span.style.animationDelay = `${index * 0.05}s`;
                bubble.appendChild(span);
            } else {
                bubble.appendChild(document.createTextNode(part));
            }
        });
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
