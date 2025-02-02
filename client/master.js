let cards = [];

function renderAssociations(redArr, blueArr){
  
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

function gameStarted(cardsarr) {
  cards = cardsarr;
  console.log("renderBoard вызывается");
  renderBoard();
}

// function renderAssociations(redArr, blueArr){
//   console.log("renderAssociations", redArr, blueArr);
//   const redAssociations = document.getElementById('redAssociations');
//   const blueAssociations = document.getElementById('blueAssociations');
//   redAssociations.innerHTML = '';
//   blueAssociations.innerHTML = '';
//   for(let i = 0; i < redArr.length; i++){
//     const associationElement = document.createElement('div');
//     associationElement.className = 'association';
//     associationElement.textContent = redArr[i];
//     redAssociations.appendChild(associationElement);
//   }
//   for(let j = 0; j < blueArr.length; j++){
//     const associationElement = document.createElement('div');
//     associationElement.className = 'association';
//     associationElement.textContent = blueArr[j];
//     blueAssociations.appendChild(associationElement);
//   }
// }

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
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    const cardElement = document.createElement("div");

    if (card.revealed) {
      cardElement.className = `card ${card.type} revealed`;
    } else cardElement.className = `card ${card.type}`;
    cardElement.innerText = card.word;
    board.appendChild(cardElement);
  }
  console.log("после цикла for");
}

// Отправка команды на перезапуск игры

function gameOver(cardsarr) {}
