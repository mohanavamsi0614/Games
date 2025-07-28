
const container = document.querySelector(".game-container");
const scoreDisplay = document.querySelector(".score");
const symbols = ["😎", "😍", "🤖", "🦁", "🐮", "🍔", "🎮", "🚀"];
let openCards = [];
let matches = 0;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function initializeGame() {
  container.innerHTML = "";
  const allSymbols = shuffle([...symbols, ...symbols]);
  allSymbols.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-symbol", symbol);
    card.innerHTML = "?";
    card.addEventListener("click", () => flipCard(card, index));
    container.appendChild(card);
  });
}

function flipCard(card, index) {
  if (openCards.length === 2 || card.classList.contains("matched")) return;

  card.innerHTML = card.getAttribute("data-symbol");
  card.classList.add("flipped");
  openCards.push(card);

  if (openCards.length === 2) {
    setTimeout(() => {
      const [first, second] = openCards;
      if (first.getAttribute("data-symbol") === second.getAttribute("data-symbol")) {
        first.classList.add("matched");
        second.classList.add("matched");
        matches++;
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        if (matches === symbols.length) {
          setTimeout(() => alert("You won!"), 300);
        }
      } else {
        first.innerHTML = "?";
        second.innerHTML = "?";
      }
      openCards = [];
    }, 500);
  }
}

function restartGame() {
  matches = 0;
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  openCards = [];
  initializeGame();
}

initializeGame();