const container=document.querySelector(".game-container")
const symbols=["😎","😍","🤖","🦁","🐮","🍔"]
let ops=[]
let score=document.querySelector(".score")
let s=0
const all=symbols.concat(symbols).sort(()=>{return Math.random()-0.5})
all.map((i,j)=>{
    const card=document.createElement("div")
    card.setAttribute("class","card")
    card.innerHTML="?"
    card.addEventListener("click",()=>{
        flip(j,card)
    })
    container.append(card)
})
// 