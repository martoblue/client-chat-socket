const socket = io('http://localhost:3000');

// Obtener las referencias
const messageContainer = document.querySelector('#message-container');
const newMessageTextArea = document.querySelector('#new-message');
const sendButton = document.querySelector('#send-button');
const userNameInput = document.querySelector('#user-name');

const roomNameInput = document.querySelector('#room-name');
const joinRoomButton = document.querySelector('#join-room-button');
const joinGeneralButton = document.querySelector('#join-general-button');

let currentRoom = 'general'; // Variable para almacenar la sala actual

// Unirse a la sala general al cargar
socket.emit('join general');

joinRoomButton.addEventListener('click', () => {
  currentRoom = roomNameInput.value;
  socket.emit('join room', currentRoom);
  messageContainer.innerHTML = ''; // Limpiar el contenedor de mensajes
});

joinGeneralButton.addEventListener('click', () => {
  currentRoom = 'general';
  socket.emit('join general');
  messageContainer.innerHTML = ''; // Limpiar el contenedor de mensajes
});


sendButton.addEventListener('click', () => {
  const message = newMessageTextArea.value;
  const userName = userNameInput.value || 'Anónimo';

  socket.emit('chat message', { room: currentRoom, userName, message });

  // Limpiar el campo de texto para el prox message
  newMessageTextArea.value = '';
});

socket.on('chat message', (data) => {
  const messageElement = document.createElement('div');
  // <div></div>
  messageElement.innerText = `${data.userName} tell: ${data.message}`;
  messageContainer.appendChild(messageElement);
})