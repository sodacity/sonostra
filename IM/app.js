// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements & State ---
    const screens = {
        home: document.getElementById('home-screen'),
        chat: document.getElementById('chat-screen'),
        qrModal: document.getElementById('qr-modal'),
    };
    const hostBtn = document.getElementById('host-btn');
    const closeQrBtn = document.getElementById('close-qr-btn');
    const messageInput = document.getElementById('message-input');
    const sendBtns = document.querySelectorAll('.send-btn');
    const messagesContainer = document.getElementById('messages-container');
    const qrCodeContainer = document.getElementById('qrcode');

    let roomId = null;
    let peerConnection;
    let dataChannel;
    let isPolite; // To avoid WebRTC glare/race conditions

    const socket = io();

    // --- Navigation ---
    function navigateTo(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // --- WebRTC Core Logic ---
    async function createPeerConnection() {
        peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Public STUN server
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('signal', { to: roomId, signal: { candidate: event.candidate } });
            }
        };

        // This is triggered on the "impolite" peer's side when the polite peer adds a data channel
        peerConnection.ondatachannel = (event) => {
            dataChannel = event.channel;
            setupDataChannel();
        };
    }

    function setupDataChannel() {
        dataChannel.onopen = () => {
            console.log('Data channel is open!');
            navigateTo('chat');
        };
        dataChannel.onmessage = (event) => {
            const message = JSON.parse(event.data);
            displayMessage(message.text, message.lang, 'received');
        };
        dataChannel.onclose = () => {
            console.log('Data channel is closed.');
        };
    }
    
    // --- Signaling via Socket.IO ---
    socket.on('connect', () => {
        console.log('Connected to signaling server with ID:', socket.id);
        const urlParams = new URLSearchParams(window.location.search);
        const joinRoomId = urlParams.get('room');
        if (joinRoomId) {
            // This user is joining via a QR code link
            isPolite = false;
            roomId = joinRoomId;
            socket.emit('join-room', roomId);
            createPeerConnection();
        }
    });

    socket.on('peer-joined', async (peerId) => {
        // The host (polite peer) gets this message when a peer joins
        console.log('Peer joined:', peerId);
        roomId = peerId; // The "room" is now the other peer's ID
        isPolite = true;
        createPeerConnection();

        // The polite peer creates the data channel and the offer
        dataChannel = peerConnection.createDataChannel('chat');
        setupDataChannel();

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('signal', { to: roomId, signal: { sdp: peerConnection.localDescription } });
    });

    socket.on('signal', async ({ from, signal }) => {
        if (!peerConnection) createPeerConnection();

        if (signal.sdp) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp));
            if (signal.sdp.type === 'offer') {
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socket.emit('signal', { to: from, signal: { sdp: peerConnection.localDescription } });
            }
        } else if (signal.candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
    });

    // --- UI Event Listeners ---
    hostBtn.addEventListener('click', () => {
        roomId = socket.id; // The host's room ID is their own socket ID
        const joinUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
        
        qrCodeContainer.innerHTML = '';
        qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
        const qr = qrcode(0, 'L');
        qr.addData(joinUrl, 'Byte');
        qr.make();
        qrCodeContainer.innerHTML = qr.createImgTag(6, 0);

        navigateTo('qrModal');
    });

    closeQrBtn.addEventListener('click', () => navigateTo('home'));

    sendBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = messageInput.value.trim();
            const lang = btn.dataset.lang;
            if (!text || !dataChannel || dataChannel.readyState !== 'open') return;

            if (lang === 'en') {
                const message = { text, lang: 'en' };
                dataChannel.send(JSON.stringify(message));
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
            dataChannel.send(JSON.stringify(message));
            displayMessage(translatedText, 'ja', 'sent');
        } catch (error) {
            console.error('Translation error:', error);
            displayMessage('Translation Error', 'en', 'sent'); // Send error as a message
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
