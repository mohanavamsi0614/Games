const cells = document.querySelectorAll(".cell");
    const time = document.querySelector(".time");
    const scoreDisplay = document.querySelector(".score-display");

    let sec = 0;
    let score = 0;
    let ran = -1;

    const kalam = setInterval(() => {
      if (sec === 10) {
        clearInterval(kalam);
        clearInterval(ply);
        scoreDisplay.innerHTML = `Final Score: ${score}`;
      }

      time.innerHTML = `Time: ${sec}`;
      sec++;

    }, 1000);

    const ply = setInterval(() => {
      play();
    }, 1000);

    cells.forEach((cell, i) => {
      cell.addEventListener("click", () => {
        if (ran === i) {
          score++;
          scoreDisplay.innerHTML = `Score: ${score}`;
        }
      });
    });

    function play() {
      const img = document.createElement("img");
      img.src = "./images.jpeg";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.borderRadius = "10px";

      ran = Math.floor(Math.random() * cells.length);
      cells[ran].appendChild(img);

      const randomTime = Math.floor(Math.random() * 500) + 500;
      setTimeout(() => {
        cells[ran].removeChild(img);
      }, randomTime);
    }