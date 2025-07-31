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
        screens[screenName].classList.add('active');
    }

    // --- Connection Setup ---
    function initializeConnection(conn) {
        dataConnection = conn;

        dataConnection.on('open', () => {
            console.log('Data connection is open!');
            navigateTo('chat');
        });

        dataConnection.on('data', (data) => {
            const message = JSON.parse(data);
            displayMessage(message.text, message.lang, 'received');
        });

        dataConnection.on('close', () => {
            console.log('Connection closed.');
            alert('The other user has disconnected.');
            navigateTo('home');
        });
    }

    // --- UI Event Listeners ---
    
    // HOST: User clicks "Host a Room"
    hostBtn.addEventListener('click', () => {
        peer = new Peer(); // Create a new peer with a random ID from the PeerJS server
        
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            hostIdText.textContent = id;
            
            // Generate QR Code with the ID string
            qrCodeContainer.innerHTML = '';
            qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
            const qr = qrcode(0, 'L');
            qr.addData(id, 'Byte'); // The QR code now just contains the ID
            qr.make();
            qrCodeContainer.innerHTML = qr.createImgTag(6, 0);

            navigateTo('idModal');
        });
        
        // Listen for an incoming connection from a guest
        peer.on('connection', (conn) => {
            initializeConnection(conn);
        });

        peer.on('error', (err) => alert('An error occurred: ' + err.message));
    });

    // GUEST: User clicks "Join a Room"
    joinBtn.addEventListener('click', () => {
        const hostId = prompt("Please enter the host's ID:");
        if (!hostId) return;

        peer = new Peer(); // Create a peer for the guest

        peer.on('open', () => {
            const conn = peer.connect(hostId); // Attempt to connect to the host
            initializeConnection(conn);
        });
        
        peer.on('error', (err) => alert('An error occurred: ' + err.message));
    });

    closeIdBtn.addEventListener('click', () => navigateTo('home'));

    sendBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = messageInput.value.trim();
            const lang = btn.dataset.lang;
            if (!text || !dataConnection) return;

            if (lang === 'en') {
                const message = { text, lang: 'en' };
                dataConnection.send(JSON.stringify(message));
                displayMessage(text, 'en', 'sent');
            } else {
                translateAndSend(text, 'en|ja');
            }
            messageInput.value = '';
        });
    });
    
    // --- Message & Translation Logic ---
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
