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

function play() {
  const img = document.createElement("img");
  img.src = "./images.jpeg";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.borderRadius = "10px";

  const ran = Math.floor(Math.random() * cells.length);
  img.addEventListener("click", () => {
    score++;
    scoreDisplay.innerHTML = `Score: ${score}`;
  });

  cells[ran].appendChild(img);

  const randomTime = Math.floor(Math.random() * 500) + 500;
  setTimeout(() => {
    cells[ran].removeChild(img);
  }, randomTime);
}
