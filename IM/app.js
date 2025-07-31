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
            // Reset peer object to allow for new connections
            if (peer) peer.destroy();
            navigateTo('home');
        });
    }

    // --- Automatically Join if URL has hostId ---
    // NEW: Check for a hostId in the URL when the page loads
    const urlParams = new URLSearchParams(window.location.search);
    const hostIdFromUrl = urlParams.get('hostId');

    if (hostIdFromUrl) {
        // If a hostId is found, this user is a guest, so connect automatically
        // Hide the home screen immediately
        screens.home.classList.remove('active');
        
        peer = new Peer(); // Create a peer for the guest
        peer.on('open', () => {
            const conn = peer.connect(hostIdFromUrl); // Attempt to connect to the host
            initializeConnection(conn);
        });
        peer.on('error', (err) => alert('An error occurred: ' + err.message));
    } else {
        // No hostId, show the regular home screen
        navigateTo('home');
    }


    // --- UI Event Listeners ---
    
    // HOST: User clicks "Host a Room"
    hostBtn.addEventListener('click', () => {
        if (peer) peer.destroy(); // Destroy any old peer object
        peer = new Peer(); // Create a new peer with a random ID
        
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            
            // MODIFIED: Create a full URL for the QR code
            const cleanUrl = `${window.location.origin}${window.location.pathname}`;
            const joinUrl = `${cleanUrl}?hostId=${id}`;

            hostIdText.textContent = id;
            qrCodeContainer.innerHTML = '';
            qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
            const qr = qrcode(0, 'L');
            qr.addData(joinUrl, 'Byte'); // The QR code now contains the full URL
            qr.make();
            qrCodeContainer.innerHTML = qr.createImgTag(6, 0);

            navigateTo('idModal');
        });
        
        peer.on('connection', (conn) => {
            initializeConnection(conn);
        });
        peer.on('error', (err) => alert('An error occurred: ' + err.message));
    });

    // GUEST (Manual Join): User clicks "Join a Room"
    joinBtn.addEventListener('click', () => {
        const manualHostId = prompt("Please enter the host's ID:");
        if (!manualHostId) return;
        
        if (peer) peer.destroy();
        peer = new Peer(); // Create a peer for the guest
        peer.on('open', () => {
            const conn = peer.connect(manualHostId); // Attempt to connect
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
    
    // --- Message & Translation Logic (Unchanged) ---
    async function translateAndSend(text, langPair) {
        try
