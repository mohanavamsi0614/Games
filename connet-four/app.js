const winningArrays = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    [0, 5, 10, 15], [3, 6, 9, 12]
];

const grid = document.querySelector(".grid");
const playerDisplay = document.querySelector(".player");
const resetButton = document.querySelector(".reset");
const winnerDisplay = document.querySelector(".winner");

let player = 1;
let holes = [];
let gameOver = false;

for (let i = 0; i < 16; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    grid.appendChild(hole);
    holes.push(hole);
}

grid.addEventListener("click", (event) => {
    if (gameOver || player !== 1) return;

    const hole = event.target;
    if (!hole.classList.contains("hole") || hole.classList.contains("taken")) return;

    makeMove(hole, "player1", "red");
    checkWinner();

    if (!gameOver) setTimeout(computerMove, 500);
});

function computerMove() {
    if (gameOver || player !== 2) return;

    const availableHoles = holes.filter(hole => !hole.classList.contains("taken"));
    const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];

    if (randomHole) {
        makeMove(randomHole, "player2", "blue");
        checkWinner();
    }
}


function makeMove(hole, playerClass, color) {
    hole.classList.add(playerClass, "taken");
    hole.style.backgroundColor = color;
    player = player === 1 ? 2 : 1;
    playerDisplay.textContent = player === 1 ? "Player 1's Turn" : "Computer's Turn";
    playerDisplay.style.color = player === 1 ? "red" : "blue";
}

// Check for a 
function checkWinner() {
    for (const combo of winningArrays) {
        const [a, b, c, d] = combo;

        if (holes[a].classList.contains("player1") &&
            holes[b].classList.contains("player1") &&
            holes[c].classList.contains("player1") &&
            holes[d].classList.contains("player1")) {
            announceWinner("Player 1");
            return;
        }

        if (holes[a].classList.contains("player2") &&
            holes[b].classList.contains("player2") &&
            holes[c].classList.contains("player2") &&
            holes[d].classList.contains("player2")) {
            announceWinner("Computer");
            return;
        }
    }

    if (holes.every(hole => hole.classList.contains("taken"))) {
        announceWinner("No one (It's a tie)");
    }
}

function announceWinner(winner) {
    winnerDisplay.textContent = `${winner} Wins!`;
    grid.style.pointerEvents = "none";
    gameOver = true;
}

// Reset the game
resetButton.addEventListener("click", resetGame);

function resetGame() {
    holes.forEach(hole => {
        hole.classList.remove("taken", "player1", "player2");
        hole.style.backgroundColor = "white";
    });

    player = 1;
    gameOver = false;
    playerDisplay.textContent = "Player 1's Turn";
    playerDisplay.style.color = "red";
    winnerDisplay.textContent = "";
    grid.style.pointerEvents = "auto";
}
