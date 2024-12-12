const Human = document.querySelector(".human");
const Comp = document.querySelector(".comp");
const hs=document.querySelector(".humanscore")
const cs=document.querySelector(".compscore")
const rock = document.querySelector(".rock");
const Paper = document.querySelector(".paper");
const sci = document.querySelector(".sci");
const score = document.querySelector("#Score");
let chances=0
const buttons=document.querySelector(".buttons")
const ops = ["paper", "rock", "sci"];
const again=document.querySelector(".again")
again.style.display="none"
const win = ["paperrock", "rocksci", "scipaper"];
again.addEventListener("click",()=>{
    buttons.style.display="block"
    again.style.display="none"
})
let humanScore = 0;
let compScore = 0;

function gen() {
    return ops[Math.floor(Math.random() * 3)];
}

function play(user) {
    if (chances>=5){
        buttons.style.display="none"
        again.style.display="block"
        chances=5
        if (humanScore>compScore){
            score.innerHTML="Human Winn!"
        }
        else if(humanScore<compScore){
            score.innerHTML="Computer Winn :("
        }
        else{
            score.innerHTML="Draww"
        }
    }
    chances++
    const compnum = gen();
    Comp.innerHTML = "Computer: "+compnum;
    Human.innerHTML = "Human: "+user;
    const comb = user + compnum;

    if (user === compnum) {
        score.innerHTML=humanScore;
    } else if (win.includes(comb)) {
        humanScore++;
        hs.innerHTML=humanScore
    } else {
        compScore++;
        cs.innerHTML=compScore
    }
}

Paper.addEventListener("click", () => {
    play("paper");
});
rock.addEventListener("click", () => {
    play("rock");
});
sci.addEventListener("click", () => {
    play("sci");
});
