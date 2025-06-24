let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
const cells = document.querySelectorAll(".cell");
const winnerDisplay = document.getElementById("winner");
const resetButton = document.getElementById("reset");

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.disabled = true;

    if (checkWinner()) {
      winnerDisplay.textContent = `Winner: ${currentPlayer}`;
      gameOver = true;
    } else if (checkDraw()) {
      winnerDisplay.textContent = "It's a Draw!";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      winnerDisplay.textContent = `Turn: ${currentPlayer}`;
    }
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      highlightWinner(pattern);
      return true;
    }
  }
  return false;
}

function highlightWinner(pattern) {
  pattern.forEach(i => {
    cells[i].classList.add("win");
  });
}

function checkDraw() {
  return board.every(cell => cell !== "");
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";
  winnerDisplay.textContent = "Tic Tac Toe Game";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("win");
  });
}
