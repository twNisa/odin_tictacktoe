const Player = (name, icon, ai)=>{
  
  return {name, icon, ai}
}

const gameboard = (()=>{
  setupBoard = ()=>{
    const gameboard = document.querySelector(".gameboard")
    gameboard.textContent="";
    for(let i =0; i< 9; i++){
      const div = document.createElement("div");
      div.className = ("field");
      div.id= i;
      gameboard.append(div);
    }
  }
  
  return {setupBoard}
})();

const game = (()=>{
  gameboard.setupBoard()
  let board = [];
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const player1 = Player('player 1', 'x', false);
  const player2 = Player('player 2', 'o', false)
  let roundsLeft = 9;
  let currentPlayer = player1;
  const turn = document.querySelector(".turn").firstChild;
  const restartBtn = document.querySelector(".restart")
  let stats = {
    'x': 0,
    'tie': 0,
    'o': 0,
  }

  setup();
  
  function setup(){
    const fields = document.querySelectorAll(".field");
    fields.forEach((field)=>{
      field.addEventListener("click", handleClick, {once: true});
    })
    turn.className=(`${player1.icon}-turn`);
    restartBtn.addEventListener("click", restartGame);

  }

  function handleClick(e){
    addMove(e.target);
    if(checkWin()){
      endGame(currentPlayer);
    } else if(checkDraw()){
      endGame('draw');
    } else {
      alternatePlayer();
    }
  }
  function checkWin(){
    return winningCombos.some(combo=>{
      return combo.every(item=>{
        return board[item] === currentPlayer.icon
      })
    })
  }
  function checkDraw(){
    if(roundsLeft === 0 && !checkWin()){
      return true;
    } 
  }
  function endGame(result){
    if (result === 'draw'){
      stats["tie"]++;
      showEndGame('draw');
    } else {
      stats[result.icon]++;
      showEndGame(result);
    }
    updateStats();
  }
  function updateStats(){
    const xDiv = document.querySelector(".x-stats");
    const tieDiv = document.querySelector(".tie-stats");
    const oDiv = document.querySelector(".o-stats");

    xDiv.lastElementChild.textContent = stats.x;
    tieDiv.lastElementChild.textContent = stats.tie;
    oDiv.lastElementChild.textContent = stats.o;
  }
  function showEndGame(result){
    const overlay = document.querySelector(".overlay")
    const endgame = document.querySelector(".end-game")

    overlay.classList.toggle("active")
    endgame.classList.toggle("active")
   
    const h1 = endgame.querySelector("h1")
    const quit = document.querySelector(".quit")
    const next = document.querySelector(".next");
   
    if(result ==='draw'){    
      h1.textContent = "DRAW!"
    } else {
      const img = document.createElement("img");
      img.src = `./images/icon-${result.icon}.svg`;
      
      h1.innerHTML = `
      <img src="./images/icon-${result.icon}.svg" alt="" id="img" srcset=""> TAKES THE ROUND!
      `
  
      if(result.icon==='o'){
        h1.style.color = "var(--orange)"
        next.style.backgroundColor = "var(--orange)"
      } else {
        h1.style.color = "var(--green)"
        next.style.backgroundColor = "var(--green)"
      }
    }

    // quit.addEventListener
    next.addEventListener("click", nextRound);
  }
  function hideEndGame(){
    const overlay = document.querySelector(".overlay")
    const endgame = document.querySelector(".end-game")
    overlay.classList.toggle("active")
    endgame.classList.toggle("active")
  }
  function addMove(target){
    board[target.id] = currentPlayer.icon;
    target.classList.add(`${currentPlayer.icon}`)
    console.log(board);
    roundsLeft--;
  }
  function alternatePlayer(){
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    turn.classList.toggle(`${player1.icon}-turn`)
    turn.classList.toggle(`${player2.icon}-turn`)
  }
  function nextRound(){
    console.log("currentPlayer.name ++ ");
    hideEndGame();
    restartGame();
  }
  function restartGame(){
    console.log('restart game');
    board = [];
    gameboard.setupBoard();
    roundsLeft=9;
    currentPlayer=player1;
    setup();
   
  }
  
})();
