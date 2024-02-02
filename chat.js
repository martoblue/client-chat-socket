const socket = io('http://localhost:3000');

// Obtener las referencias
const messageContainer = document.querySelector('#message-container');
const newMessageTextArea = document.querySelector('#new-message');
const sendButton = document.querySelector('#send-button');
const userNameInput = document.querySelector('#user-name');


sendButton.addEventListener('click', () => {
    const message = newMessageTextArea.value;
    const userName = userNameInput.value || 'Anónimo';

    socket.emit('chat message', { userName, message });

    // Limpiar el campo de texto para el prox message
    newMessageTextArea = '';
});

socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    console.log(data);
    messageElement.innerText = `${data.userName} dice: ${data.message}`;
    messageContainer.appendChild(messageElement);
})