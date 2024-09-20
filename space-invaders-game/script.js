const result = document.querySelector(".result");
const grid = document.querySelector(".grid");
const removedAliens = [];
const width = 15;
let shooterIndex = 202;
let results = 0;
let invadersId;
let direction = 1;
let isGoingRight = true;

for (let i = 0; i < width * width; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function displayInvaders() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!removedAliens.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}
displayInvaders();

squares[shooterIndex].classList.add("shooter");

function moveShooter(e) {
  squares[shooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (shooterIndex % width !== 0) shooterIndex -= 1;
      break;
    case "ArrowRight":
      if (shooterIndex % width < width - 1) shooterIndex += 1;
      break;
  }
  squares[shooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

function moveInvaders() {
  remove();
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;

  if (rightEdge && isGoingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      isGoingRight = false;
    }
  }
  if (leftEdge && !isGoingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      isGoingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  displayInvaders();

  if (squares[shooterIndex].classList.contains("invader")) {
    result.textContent = "GAME OVER";
    clearInterval(invadersId);
  }
  if (removedAliens.length === alienInvaders.length) {
    result.textContent = "You win";
    clearInterval(invadersId);
  }
}
invadersId = setInterval(moveInvaders, 600);

function shoot(e) {
  let laserId;
  let laserIndex = shooterIndex;

  function moveLaser() {
    squares[laserIndex].classList.remove("laser");
    laserIndex -= width;
    if (laserIndex < 0) {
      clearInterval(laserId); 
      return;
    }
    squares[laserIndex].classList.add("laser");

    if (squares[laserIndex].classList.contains("invader")) {
      squares[laserIndex].classList.remove("laser");
      squares[laserIndex].classList.remove("invader");
      squares[laserIndex].classList.add("boom");

      setTimeout(() => squares[laserIndex].classList.remove("boom"), 300);
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(laserIndex);
      removedAliens.push(alienRemoved);
      results++;
      result.innerHTML = results;
    }
  }

  if (e.key === "ArrowUp") {
    laserId = setInterval(moveLaser, 100);
  }
}
document.addEventListener("keydown", shoot);
