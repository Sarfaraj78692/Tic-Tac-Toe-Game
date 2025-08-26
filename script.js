const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;


const winConditions = [
[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]
];


cells.forEach(cell => cell.addEventListener('click', cellClicked));
restartBtn.addEventListener('click', restartGame);


function cellClicked() {
const index = this.getAttribute('data-index');


if (board[index] !== "" || !running) return;


updateCell(this, index);
checkWinner();
}


function updateCell(cell, index) {
board[index] = currentPlayer;
cell.textContent = currentPlayer;
cell.classList.add('taken');
}


function changePlayer() {
currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
statusText.textContent = `Player ${currentPlayer}'s turn`;
}


function checkWinner() {
let roundWon = false;


for (let condition of winConditions) {
const [a, b, c] = condition;
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
roundWon = true;
break;
}
}


if (roundWon) {
statusText.textContent = `🎉 Player ${currentPlayer} wins! 🎉`;
running = false;
} else if (!board.includes("")) {
statusText.textContent = `It's a draw!`;
running = false;
} else {
changePlayer();
}
}


function restartGame() {
currentPlayer = 'X';
board = ["", "", "", "", "", "", "", "", ""];
statusText.textContent = `Player ${currentPlayer}'s turn`;
cells.forEach(cell => {
cell.textContent = "";
cell.classList.remove('taken');
});
running = true;
}
function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken', currentPlayer.toLowerCase()); // add class x or o
}

function checkWinner() {
  let roundWon = false;
  let winningCombo = [];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCombo = condition;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins! 🎉`;
    drawWinningLine(winningCombo);
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = `It's a draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function drawWinningLine([a, b, c]) {
  const game = document.getElementById('game');
  const rectA = cells[a].getBoundingClientRect();
  const rectC = cells[c].getBoundingClientRect();
  const gameRect = game.getBoundingClientRect();

  // Calculate center positions of first and last cell
  const x1 = rectA.left + rectA.width/2 - gameRect.left;
  const y1 = rectA.top + rectA.height/2 - gameRect.top;
  const x2 = rectC.left + rectC.width/2 - gameRect.left;
  const y2 = rectC.top + rectC.height/2 - gameRect.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  const line = document.createElement('div');
  line.classList.add('winning-line');
  line.style.width = `${length}px`;
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.transform = `rotate(${angle}deg)`;

  game.appendChild(line);
}

function restartGame() {
  currentPlayer = 'X';
  board = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('taken', 'x', 'o');
  });

  // Remove old winning line
  const line = document.querySelector('.winning-line');
  if (line) line.remove();

  running = true;
}
