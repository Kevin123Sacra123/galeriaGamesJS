const playBoard = document.querySelector(".play-board");
const puntajeElement = document.querySelector(".score");
const highpuntajeElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameover = false;
let foodX, foodY;
let snakeX= 5,snakeY=10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalID;
let puntaje = 0;
let highScore = localStorage.getItem("high-score") || 0;
highpuntajeElement.innerText = `Puntos mas alto: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*26)+2;
    foodY = Math.floor(Math.random()*26)+2;
}

const changeDirection = (e) =>{
    console.log(e);
    if(e.key ==="ArrowUp" && velocityY !=1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown"&& velocityY !=-1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    }

    if(e.key ==="w" && velocityY !=1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "s" && velocityY !=-1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "a" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "d" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

controls.forEach(key=> {
    key.addEventListener("click", ()=> changeDirection({key:key.dataset.key}));
})

const handGameOver = () =>{
    clearInterval(setIntervalID);
    alert("game over, presione OK para repeticion");
    location.reload();
}

const initGame = () => {
    if(gameover) return handGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && foodY === snakeY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        puntaje++;
        highScore = puntaje >= highScore ? puntaje: highScore;
        localStorage.setItem("high-score", highScore);
        puntajeElement.innerText = `Puntaje: ${puntaje}`;
        highpuntajeElement.innerText = `Puntaje mas alto: ${highScore}`;
        
        console.log(snakeBody);
    }
    for(let i = snakeBody.length-1; i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX<=0 ||snakeX>30 || snakeY<=0 ||snakeY>30){
        gameover = true;
    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !==0 && snakeBody[0][1]=== snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameover = true;
        }
        
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalID= setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);