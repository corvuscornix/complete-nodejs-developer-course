const socket = io();

const inputField = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const sendLocationButton = document.getElementById('send-location');
const messageForm = document.getElementById('message-form');
const messages = document.getElementById('messages');
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationTemplate = document.getElementById('location-template').innerHTML;
const sideBarTemplate = document.getElementById('sidebar-template').innerHTML;

// Options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () => {
    const lastMessage = messages.lastElementChild;

    // Height of the last message
    const lastMessageStyles = getComputedStyle(lastMessage);
    const lastMessageMargin = parseInt(lastMessageStyles.marginBottom);
    const lastMessageHeight = lastMessage.offsetHeight + lastMessageMargin;

    // Visible height
    const visibleHeight = messages.offsetHeight;

    // Height of messages container
    const containerHeight = messages.scrollHeight;

    // How far have I scrolled?
    const scrollOffset = messages.scrollTop + visibleHeight;

    if (containerHeight - lastMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight;
    }
}

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});


socket.on('roomData', ({ users, room }) => {
    const html = Mustache.render(sideBarTemplate, {
        users,
        room
    });
    document.getElementById('sidebar').innerHTML = html;
});

function sendMessage () {
    const message = inputField.value;
    if (!message) return;

    inputField.setAttribute('disabled', true);
    sendButton.setAttribute('disabled', true);
    inputField.value = '';
    socket.emit('message', message, (error) => {
        if (error) {
            alert(error);
        }

        inputField.removeAttribute('disabled');
        sendButton.removeAttribute('disabled');
        inputField.focus();
    });
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

inputField.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        sendMessage();
    }
});

sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported');
    }

    inputField.setAttribute('disabled', true);
    sendButton.setAttribute('disabled', true);

    navigator.geolocation.getCurrentPosition(({ coords }) => {
        const {latitude, longitude} = coords;
        socket.emit('sendLocation', {latitude, longitude}, () => {
            console.log('Location shared!');

            inputField.removeAttribute('disabled');
            sendButton.removeAttribute('disabled');
        });
    });
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});