// const serverIP = "192.168.0.195";
// const socket = io(`http://${serverIP}:3000`);
const socket = io("ws://localhost:3000");

let countdown;
let timeLeft = 0;
let timertext = "";

socket.on("Connect", () => {
  console.log("WebSocket connected");
});

socket.on("newAssociation", (gameState) => {
  console.log(
    "renderAssociations",
    gameState.associationRed,
    gameState.associationBlue
  );
  renderAssociations(gameState.associationRed, gameState.associationBlue);
});

socket.on("gameStarted", (gameState) => {
  console.log("Game Started");
  timertext = "Загадывают красные";
  startTimer(120, "timerRed");
  renderAssociations(gameState.associationRed, gameState.associationBlue);
  gameStarted(gameState.cards);
  wordsCounterUpdate(gameState.redLeft, gameState.blueLeft);
});

socket.on("nextGameStage", (gameStage) => {
  console.log("nextgameStage", gameStage);
  switch (gameStage % 4) {
    case 0:
      timertext = "Загадывают красные";
      startTimer(120, "timerRed");
      break;
    case 1:
      timertext = "Отгадывают красные";
      startTimer(90, "timerRed");
      break;
    case 2:
      timertext = "Загадывают синие";
      startTimer(120, "timerBlue");
      break;
    case 3:
      timertext = "Отгадывают синие";
      startTimer(90, "timerBlue");
      break;
  }
});

socket.on("addTime", () => {
  console.log("addTime");
  addTime(15);
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
  if (text) {
    // Проверяем, что текст не пустой
    socket.emit("printAssociation", text, isRed);
    textarea.value = ""; // Очищаем textarea после отправки
  }
}

document
  .getElementById("redAssociationsForm")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Проверяем, что нажат Enter без Shift
      event.preventDefault(); // Предотвращаем перенос строки
      sendAssociation(event.target, true); // Отправляем ассоциацию для красной команды
    }
  });

document
  .getElementById("blueAssociationsForm")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Проверяем, что нажат Enter без Shift
      event.preventDefault(); // Предотвращаем перенос строки
      sendAssociation(event.target, false); // Отправляем ассоциацию для синей команды
    }
  });

function startTimer(seconds, indicator) {
  document.getElementById("title").className = `timer ${indicator}`;
  clearInterval(countdown);
  timeLeft = seconds;
  updateDisplay();

  countdown = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      timeOut();
    }
  }, 1000);
}

function addTime(seconds) {
  timeLeft += seconds;
  updateDisplay();
}
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("title").innerHTML = `${timertext} ${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
function timeOut() {
  alert("Время вышло!");
}
