//seleccionar los elementos necesarios
const selectBox = document.querySelector(".select-box"),
selectXbtn = selectBox.querySelector(".playerX"),
selectObtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");


//cargar del windos
window.onload = ()=>{
    //añade a todos los cuadros el evento de click
    for(let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
    selectXbtn.onclick = ()=>{
        selectBox.classList.add("hide");//oculta el menu de jugadores
        playBoard.classList.add("show"); //muestra el tablero
    }
    selectObtn.onclick = ()=>{
        selectBox.classList.add("hide");//oculta el menu de jugadores
        playBoard.classList.add("show"); //muestra el tablero
        
    }
}

let playerXIcon = "fa-solid fa-xmark verde";
let playerOIcon = "fa-regular fa-circle red";
let playerSign = "X";
let runBot = true;

//función de click
function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //añade el icono
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    //genera un tiempo aleatorio
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomDelayTime)
}

//función bot
function bot(runBot) {    
    if(runBot){
        playerSign = "O";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //añade el icono
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);

            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign="X";
    }
}
//funcion de victoria
function getClass(idname){
    return document.querySelector(".box" + idname).id;
}

function checkThreeClasses(val1, val2, val3, sign){
    if(getClass(val1)== sign && getClass(val2) == sign && getClass(val3) == sign ){
        return true;
    }
}

function selectWinner() {
    //si una combinacion es encontrada
    if(checkThreeClasses(1,2,3,playerSign) || checkThreeClasses(4,5,6,playerSign) || checkThreeClasses(7,8,9, playerSign) || checkThreeClasses(1,4,7, playerSign) || checkThreeClasses(2,5,8, playerSign) || checkThreeClasses(3,6,9, playerSign) || checkThreeClasses(1,5,9, playerSign) || checkThreeClasses(3,5,7, playerSign)){
        console.log("victoria");
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        wonText.innerHTML = `!el jugador <strong>${playerSign}</strong>, gano el juego¡`;        
    }else{
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "" ){
            runBot = false;
            Bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            wonText.textContent = `la partida ha terminado`;
        }
    }
}

replayBtn.onclick= ()=>{
    window.location.reload();
}