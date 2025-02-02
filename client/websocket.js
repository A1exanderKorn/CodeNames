const serverIP = "192.168.0.195";
const socket = io(`http://${serverIP}:3000`);
// const socket = io("ws://localhost:3000");



socket.on("Connect", () => {
  console.log("WebSocket connected");
});

socket.on("newAssociation", (gameState) => {
  console.log("renderAssociations", gameState.associationRed, gameState.associationBlue);
  renderAssociations(gameState.associationRed, gameState.associationBlue);
});



socket.on("gameStarted", (gameState) => {
  console.log("Game Started");
  renderAssociations(gameState.associationRed, gameState.associationBlue);
  gameStarted(gameState.cards);
  wordsCounterUpdate(gameState.redLeft, gameState.blueLeft);
});

socket.on("wordRevealed", (gameState) => {
  console.log("wordRevealed");

  wordsCounterUpdate(gameState.redLeft, gameState.blueLeft);
  wordRevealed(gameState.cards);
  if (gameState.gameOver == true) {
    gameOver(gameState.cards);
  }
});

socket.on("error", (message) => {
  console.error("WebSocket Error: ", message);
});

socket.on("disconnect", () => {
  console.log("WebSocket closed");
});

function send(event, payload) {
  socket.emit(event, payload);
}

let btnStart = document.getElementById("start");
btnStart.addEventListener("click", () => {
  socket.emit("startGame");
});

function sendAssociation(textarea, isRed) {
  const text = textarea.value; // Получаем текст и убираем лишние пробелы
  if (text) { // Проверяем, что текст не пустой
    socket.emit("printAssociation", text, isRed);
    textarea.value = ''; // Очищаем textarea после отправки
  }
}

document.getElementById('redAssociationsForm').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) { // Проверяем, что нажат Enter без Shift
    event.preventDefault(); // Предотвращаем перенос строки
    sendAssociation(event.target, true); // Отправляем ассоциацию для красной команды
  }
});

document.getElementById('blueAssociationsForm').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) { // Проверяем, что нажат Enter без Shift
    event.preventDefault(); // Предотвращаем перенос строки
    sendAssociation(event.target, false); // Отправляем ассоциацию для синей команды
  }
});