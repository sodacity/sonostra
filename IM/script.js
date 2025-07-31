document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const screens = { home: document.getElementById('home-screen'), chat: document.getElementById('chat-screen'), idModal: document.getElementById('id-modal'), };
    const hostBtn = document.getElementById('host-btn');
    const joinBtn = document.getElementById('join-btn');
    const closeIdBtn = document.getElementById('close-id-btn');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');
    const qrCodeContainer = document.getElementById('qrcode');
    const hostIdText = document.getElementById('host-id-text');
    // MODIFIED: New button IDs
    const sendAsIsBtn = document.getElementById('send-asis-btn');
    const translateBtn = document.getElementById('translate-btn');

    let peer;
    let dataConnection;

    // --- Navigation & UI ---
    function navigateTo(screenName) { Object.values(screens).forEach(s => s.classList.remove('active')); if (screens[screenName]) { screens[screenName].classList.add('active'); } }
    function resetButtons() { hostBtn.disabled = false; hostBtn.textContent = 'Host a Room'; joinBtn.disabled = false; joinBtn.textContent = 'Join a Room'; }

    // --- Connection Setup ---
    function initializeConnection(conn) {
        dataConnection = conn;
        dataConnection.on('open', () => navigateTo('chat'));
        dataConnection.on('data', (data) => { const message = JSON.parse(data); displayMessage(message.text, message.lang, 'received'); });
        dataConnection.on('close', () => { alert('The other user has disconnected.'); if (peer) peer.destroy(); navigateTo('home'); });
    }

    // --- Auto Join Logic ---
    const urlParams = new URLSearchParams(window.location.search);
    const hostIdFromUrl = urlParams.get('hostId');
    if (hostIdFromUrl) {
        screens.home.classList.remove('active');
        if (peer) peer.destroy();
        peer = new Peer();
        peer.on('open', () => { const conn = peer.connect(hostIdFromUrl); initializeConnection(conn); });
        peer.on('error', (err) => { alert('Failed to connect: ' + err.message); window.location.search = ''; });
    } else {
        navigateTo('home');
    }

    // --- Button Event Listeners ---
    hostBtn.addEventListener('click', () => {
        hostBtn.disabled = true; hostBtn.textContent = 'Initializing...'; joinBtn.disabled = true;
        if (peer) peer.destroy();
        peer = new Peer();
        peer.on('open', (id) => {
            resetButtons();
            const joinUrl = `${window.location.origin}${window.location.pathname}?hostId=${id}`;
            hostIdText.textContent = id;
            qrCodeContainer.innerHTML = '';
            qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
            const qr = qrcode(0, 'L'); qr.addData(joinUrl, 'Byte'); qr.make();
            qrCodeContainer.innerHTML = qr.createImgTag(6, 0);
            navigateTo('idModal');
        });
        peer.on('connection', (conn) => initializeConnection(conn));
        peer.on('error', (err) => { alert('An error occurred: ' + err.message); resetButtons(); });
    });

    joinBtn.addEventListener('click', () => {
        const manualHostId = prompt("Please enter the host's ID:");
        if (!manualHostId) return;
        joinBtn.disabled = true; joinBtn.textContent = 'Connecting...'; hostBtn.disabled = true;
        if (peer) peer.destroy();
        peer = new Peer();
        peer.on('open', () => { const conn = peer.connect(manualHostId); conn.on('error', (err) => { alert('Connection failed: ' + err.message); resetButtons(); }); initializeConnection(conn); });
        peer.on('error', (err) => { alert('An error occurred: ' + err.message); resetButtons(); });
    });

    closeIdBtn.addEventListener('click', () => { if (peer) peer.destroy(); navigateTo('home'); });

    // --- FIXED: New Send/Translate Logic ---
    const japaneseRegex = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\u3400-\u4DBF]/;

    sendAsIsBtn.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (!text || !dataConnection) return;
        
        const lang = japaneseRegex.test(text) ? 'ja' : 'en'; // Detect language to tag message correctly
        const message = { text, lang };

        dataConnection.send(JSON.stringify(message));
        displayMessage(text, lang, 'sent');
        messageInput.value = '';
    });

    translateBtn.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (!text || !dataConnection) return;
        
        const isJapanese = japaneseRegex.test(text);
        const langPair = isJapanese ? 'ja|en' : 'en|ja';
        const targetLang = isJapanese ? 'en' : 'ja';

        translateAndSend(text, langPair, targetLang);
        messageInput.value = '';
    });

    // --- Message & Translation Logic ---
    async function translateAndSend(text, langPair, targetLang) {
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`);
            const data = await response.json();
            const translatedText = data.responseData.translatedText;
            const message = { text: translatedText, lang: targetLang };
            
            dataConnection.send(JSON.stringify(message));
            displayMessage(translatedText, targetLang, 'sent');
        } catch (error) {
            console.error('Translation error:', error);
            displayMessage('Translation Error', 'en', 'sent'); // Show error in your own chat
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
