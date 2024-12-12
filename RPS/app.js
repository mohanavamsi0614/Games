const Human=document.querySelector(".human")
const Comp=document.querySelector(".comp")
const rock=document.querySelector(".rock")
const Paper=document.querySelector(".paper")
const sci=document.querySelector(".sci")
const score=document.querySelector("#Score")
const ops=["paper","rock","sci"]
function gen(){
    console.log(ops[Math.floor(Math.random()*3)])
    return ops[Math.floor(Math.random()*3)]
}

function play(user){
    Comp.innerHTML=gen()
    Human.innerHTML=user
}
Paper.addEventListener("click",()=>{
    play("paper")
})
rock.addEventListener("click",()=>{
    play("rock")
})
sci.addEventListener("click",()=>{
    play("sci")
})