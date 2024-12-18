const grid=document.querySelector(".grid");
const scoreDisplay=document.querySelector(".score")
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const limit = 440
let xDirection = -2
let yDirection = 2
const boardHeight = 300
const boardWidth = 560


let currentPosition = [230, 10]

let ballCurrentPosition =  [270, 30]

let timerId
let score = 0

class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis]
      this.bottomRight = [xAxis + blockWidth, yAxis]
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
      this.topLeft = [xAxis, yAxis + blockHeight]
    }
  }
  
  const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
  ]
  function addblocks(){
    for (let i = 0; i < blocks.length; i++) {
        const block=document.createElement("div")
        block.classList.add('block')
        block.style.left=blocks[i].bottomLeft[0]+"px"
        block.style.bottom=blocks[i].bottomLeft[1]+"px"
        grid.appendChild(block)
        console.log("kncjk")
    }
  }
  addblocks()
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
  }
  function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
  }
  document.addEventListener("keydown",(e)=>{
    console.log(e.key)
    switch (e.key) {
        case "ArrowRight":
            if(currentPosition[0]<=limit){
            currentPosition[0]+=10
            drawUser()
            }
            break;
        case "ArrowLeft" :
            if(currentPosition[0]>=20){
            currentPosition[0]-=10
            drawUser()
            break;
            }
    
    }

  })

  function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

function checkForCollisions() {
    for (let i = 0; i < blocks.length; i++){
      if
      (
        (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
        ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
      )
        {
        const allBlocks = document.querySelectorAll('.block')
        grid.removeChild(allBlocks[i])
        blocks.splice(i,1)
        changeDirection()   
        score++
        scoreDisplay.innerHTML = score
        if (blocks.length == 0) {
          scoreDisplay.innerHTML = 'You Win!'
          clearInterval(timerId)
          document.removeEventListener('keydown', moveUser)
        }
      }
    }
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
    {
      changeDirection()
    }
  
    if
    (
      (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
      (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
    )
    {
      changeDirection()
    }
  
    if (ballCurrentPosition[1] <= 0) {
      clearInterval(timerId)
      scoreDisplay.innerHTML = 'You lose!'
      document.removeEventListener('keydown', moveUser)
    }
  }
  
  
  function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  }