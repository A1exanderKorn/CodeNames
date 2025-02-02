let cards = [];

function gameStarted(cardsarr) {
  cards = cardsarr;
  renderBoard();
}

function renderAssociations(redArr, blueArr){
  // console.log("renderAssociations", redArr, blueArr);
  const redAssociations = document.getElementById('redAssociations');
  const blueAssociations = document.getElementById('blueAssociations');
  redAssociations.innerHTML = '';
  blueAssociations.innerHTML = '';
  for(let i = 0; i < redArr.length; i++){
    const associationElement = document.createElement('div');
    associationElement.className = 'association';
    associationElement.textContent = redArr[i];
    redAssociations.appendChild(associationElement);
  }
  for(let j = 0; j < blueArr.length; j++){
    const associationElement = document.createElement('div');
    associationElement.className = 'association';
    associationElement.textContent = blueArr[j];
    blueAssociations.appendChild(associationElement);
  }
}

function wordRevealed(cardsarr) {
  cards = cardsarr;
  renderBoard();
}

function wordsCounterUpdate(redleft, blueleft) {
  let redCounter = document.getElementById("redScore");
  let blueCounter = document.getElementById("blueScore");
  redCounter.innerHTML = `${redleft}`;
  blueCounter.innerHTML = `${blueleft}`;
}

function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  console.log("renderplayer");
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    const cardElement = document.createElement("div");
    if (!card.revealed) cardElement.className = `card unrevealed}`;
    else cardElement.className = `card ${card.type} revealed`;
    cardElement.innerText = card.word;
    cardElement.addEventListener("click", () => {
      if (!card.revealed) {
        send("revealWord", card.word);
      }
    });
    // documend.insertAfter(board, cardElement);
    board.appendChild(cardElement);
  }
}

function gameOver(cardsarr) {
  cards = cardsarr;
  const board = document.getElementById("board");
  board.innerHTML = "";
  console.log("renderplayer");
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    const cardElement = document.createElement("div");
    if (!card.revealed) cardElement.className = `card ${card.type}`;
    else cardElement.className = `card ${card.type} revealed`;
    cardElement.innerText = card.word;
    board.appendChild(cardElement);
  }
}
