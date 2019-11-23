const socket = io();

const inputField = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const sendLocationButton = document.getElementById('send-location');
const messageForm = document.getElementById('message-form');
const messages = document.getElementById('messages');
const messageTemplate = document.getElementById('message-template').innerHTML;

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {message});
    messages.insertAdjacentHTML('beforeend', html);
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