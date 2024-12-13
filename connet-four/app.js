const winningArrays = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    [16, 17, 18, 19], [20, 21, 22, 23], [24, 25, 26, 27],
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    [4, 8, 12, 16], [5, 9, 13, 17], [6, 10, 14, 18], [7, 11, 15, 19],
    [8, 12, 16, 20], [9, 13, 17, 21], [10, 14, 18, 22], [11, 15, 19, 23],
    [12, 16, 20, 24], [13, 17, 21, 25], [14, 18, 22, 26], [15, 19, 23, 27],
    [0, 5, 10, 15], [4, 9, 14, 19], [8, 13, 18, 23], [12, 17, 22, 27],
    [12, 9, 6, 3], [16, 13, 10, 7], [20, 17, 14, 11], [24, 21, 18, 15]
];

const grid = document.querySelector(".grid");
let player = 1;
const stu = document.querySelector(".player");
stu.innerHTML = "player 1";

for (let i = 0; i < 28; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.addEventListener("click", () => { play(hole) });
    grid.appendChild(hole);
}

function play(hole) {
    if (player == 1 && !hole.classList.contains("taken")) {
        hole.style.background = "red";
        hole.classList.add("first");
        hole.classList.add("taken");
        player = 2;
        stu.innerHTML = "player 2";
    } else if (!hole.classList.contains("taken")) {
        hole.style.background = "blue";
        hole.classList.add("sec");
        hole.classList.add("taken");
        player = 1;
        stu.innerHTML = "player 1";
    }
}

const holes = document.querySelectorAll(".hole");

function check() {
    for (let i = 0; i < winningArrays.length; i++) {
        const [a, b, c, d] = winningArrays[i];
        if (
            holes[a].classList.contains("first") &&
            holes[b].classList.contains("first") &&
            holes[c].classList.contains("first") &&
            holes[d].classList.contains("first")
        ) {
            clearInterval(che)
            alert("Player 1 wins!");

            window.location.reload();
        } else if (
            holes[a].classList.contains("sec") &&
            holes[b].classList.contains("sec") &&
            holes[c].classList.contains("sec") &&
            holes[d].classList.contains("sec")
        ) {
            clearInterval(che)

            alert("Player 2 wins!");
            window.location.reload();
        }
    }
}
const che=setInterval(() => {
    check()
}, 500);