const cells = document.querySelectorAll(".cell");
const time = document.querySelector(".time");
const scoreDisplay = document.querySelector(".score-display");

let sec = 0;
let score = 0;

const kalam = setInterval(() => {
  if (sec === 10) {
    clearInterval(kalam);
    clearInterval(ply);
    scoreDisplay.innerHTML = `Final Score: ${score}`;
  }

  time.innerHTML = `${sec}`;
  sec++;

}, 1000);

const ply = setInterval(() => {
  play();
}, 1000);

