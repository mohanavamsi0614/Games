// Selecting Elements
const humanDisplay = document.querySelector(".human");
const computerDisplay = document.querySelector(".comp");
const humanScoreDisplay = document.querySelector(".humanscore");
const computerScoreDisplay = document.querySelector(".compscore");
const resultMessage = document.querySelector("#Score");
const buttons = document.querySelector(".buttons");
const playAgainBtn = document.querySelector(".again");
const choicesDisplay = document.querySelector(".choices");
// const humanpic=document.querySelector(".humanpic")
// const computerpic=document.querySelector(".computerpic")

const rockButton = document.querySelector(".rock");
const paperButton = document.querySelector(".paper");
const scissorsButton = document.querySelector(".sci");

const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const tieSound = document.getElementById("tieSound");

const options = ["rock", "paper", "sci"];
const winningCombinations = ["paperrock", "rocksci", "scipaper"];
let humanScore = 0;
let computerScore = 0;
let chances = 0;

playAgainBtn.style.display = "none";

playAgainBtn.addEventListener("click", () => {
    humanScore = 0;
    computerScore = 0;
    chances = 0;

    humanScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
    resultMessage.textContent = "Let’s play Rock, Paper, Scissors!";
    choicesDisplay.textContent = "Make a move!";
    buttons.style.display = "flex";
    playAgainBtn.style.display = "none";
});

function generateComputerChoice() {
    return options[Math.floor(Math.random() * 3)];
}
function pic(picu,classname){
    const photo=document.querySelector(`.${classname}`)
    switch (picu){
        case "paper":
            photo.src="./assests/paper.png"
            break
        case "rock":
            photo.src="./assests/stone.png"
            break
        case "sci":
            photo.src="./assests/sci.png"
            break
    }
    return "doen"
}

function playGame(playerChoice) {
    if (chances >= 5) {
        buttons.style.display = "none";
        playAgainBtn.style.display = "block";

        if (humanScore > computerScore) {
            resultMessage.textContent = "You win! 🎉";
            // winSound.play();
        } else if (humanScore < computerScore) {
            resultMessage.textContent = "Computer wins! 😢";
            // loseSound.play();
        } else {
            resultMessage.textContent = "It's a tie! 🤝";
            // tieSound.play();
        }
        return;
    }

    chances++;

    const computerChoice = generateComputerChoice();
    const combination = playerChoice + computerChoice;
    pic(playerChoice,"humanpic")
    pic(computerChoice,"computerpic")

    choicesDisplay.textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}`;

    if (playerChoice === computerChoice) {
        resultMessage.textContent = "It's a tie!";
        // tieSound.play();
    } else if (winningCombinations.includes(combination)) {
        humanScore++;
        humanScoreDisplay.textContent = humanScore;
        resultMessage.textContent = "You win this round! 🎉";
        // winSound.play();
    } else {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        resultMessage.textContent = "You lose this round! 😢";
        // loseSound.play();
    }

    resultMessage.classList.add("winning");
    setTimeout(() => {
        resultMessage.classList.remove("winning");
    }, 500);
}

// Add Event Listeners to Buttons
rockButton.addEventListener("click", () => playGame("rock"));
paperButton.addEventListener("click", () => playGame("paper"));
scissorsButton.addEventListener("click", () => playGame("sci"));
