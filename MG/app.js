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
function flip(j,card){
    if(ops.length==2) return
    if(s==4){
        score.innerHTML="won"
        alert("Won")
        window.location.reload()
    }
    card.innerHTML=all[j]
    ops.push({id:j,card})
    if(ops.length==2){
        setTimeout(() => {
            const [first,sec]=ops
            if(all[first.id]==all[sec.id]){
                s++
                if(s>=4){
                    alert("Won")
                    window.location.reload()
                }
            }
            else{
                first.card.innerHTML="?"
                sec.card.innerHTML="?"
            }
            ops=[]
        }, 500);
    }
}