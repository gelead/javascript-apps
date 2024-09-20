const boxs = document.querySelectorAll(".box");

boxs.forEach((box) => {
  box.addEventListener("click", playerMove);
});

let currentPlayer = "X";

let board = ["", "", "", "", "", "", "", "", ""];

let pointx = 0;
let pointo = 0;
let pointTie = 0;

let playMode = 0;

const player1 = document.querySelector(".player-1-score");
const player2 = document.querySelector(".player-2-score");
const tieElement = document.querySelector(".tie-score");


function playerMove(e) {
  box = e.target;
  boxId = box.id;

  if (!board[boxId - 1]) {
    const boxElement = document.getElementById(`${box.id}`);
    boxElement.textContent = currentPlayer;
    if(playMode == 0){
        boxElement.classList.remove('blue');
        boxElement.classList.add('gold');
        playMode++;
    }else{
        boxElement.classList.remove('gold');
        boxElement.classList.add('blue');
        playMode--;
    }
    
    board[boxId - 1] = currentPlayer;
    if (checkWinner()) {
      const winSound = document.querySelector("#winSound");
      winSound.play();
      if (currentPlayer === "X") {
        pointx++;
        player1.textContent = pointx;
      } else {
        pointo++;
        player2.textContent = pointo;
      }
    }

    if (checkBoardFull()) {
      if (!checkWinner()) {
        pointTie++;
        tieElement.textContent = pointTie;
        const tieSound = document.querySelector("#tieSound");
        tieSound.play();
      }
    }
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  }
}

function checkWinner() {
  const winList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const list of winList) {
    const [a, b, c] = list;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      HighlightWinner(a, b, c);
      return true;
    }
  }
}
function HighlightWinner(a, b, c) {
  document.querySelectorAll(".box").forEach((box, i) => {
    if (i === a || i === b || i === c) {
      box.classList.add("win");
    } else {
      box.classList.add("lose");
    }
  });
}
function checkBoardFull() {
  for (let cell of board) {
    if (cell === "") {
      return false;
    }
  }
  return true;
}
document.querySelector(".restart").addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  document.querySelectorAll(".box").forEach((box) => {
    box.textContent = "";
    box.classList.remove("win");
    box.classList.remove("lose");
  });
});
document.querySelector(".reset").addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".box").forEach((box) => {
    box.textContent = "";
    box.classList.remove("win");
    box.classList.remove("lose");
  });
  currentPlayer = "X";
  pointo = 0;
  pointx = 0;
  pointTie = 0;

  player1.textContent = pointx;
  player2.textContent = pointo;
  tieElement.textContent = pointTie;
});
