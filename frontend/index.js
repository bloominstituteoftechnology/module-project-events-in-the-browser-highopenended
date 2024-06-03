// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time
  let gameCompleted=false;

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // let keys = { // To easily check `event.key` on keyboard events
  //   space: ' ',
  //   up: 'ArrowUp',
  //   right: 'ArrowRight',
  //   down: 'ArrowDown',
  //   left: 'ArrowLeft',
  // }
  const arrKeys=[' ','ArrowUp','ArrowRight','ArrowDown','ArrowLeft'];

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        let currTarget=getCurrentTile();
        currTarget.classList.remove('targeted');
        square.classList.add('targeted');
      });
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    if(arrKeys.includes(evt.key)){
      if(evt.key===' '){
        if(!gameCompleted){
          squishBug();
        }        
      }else{
        moveToNextTile(evt.key);
      }
    }

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    

    // 👉 TASK 5 - End the game 👈
  })
  function getCurrentTile(){
    return document.querySelector('.targeted');
  }
  
  // Returns an array [row,col]
  function getCurrentTile_Coords(){
    let returnArr=[];
    let grid=document.querySelector('#grid');
    let rows=grid.querySelectorAll('.row');
    for (let i = 0; i < rows.length; i++) {
      const targetedSquare=rows[i].querySelectorAll('.targeted')
      if(targetedSquare.length>0){
        let squares = rows[i].querySelectorAll('.square')
        for (let j = 0; j < squares.length; j++) {        
          if(squares[j].classList.contains('targeted')){          
            returnArr.push(i);
            returnArr.push(j);
            return returnArr;
          }
        }
      }
    }
    return null;
  }
  
  // Moves to the next tile (if possible)
  function moveToNextTile(direction){
    let arrCoords = getCurrentTile_Coords();
    let currRow=arrCoords[0];
    let currCol=arrCoords[1];
    let currTile = getCurrentTile();
    let nextRow = currRow;
    let nextCol = currCol;
    if(direction==="ArrowUp"){
      if(currRow>0){nextRow=currRow-1;}
    }
    if(direction==="ArrowDown"){
      if(currRow<4){nextRow=currRow+1;}
    }
    if(direction==="ArrowLeft"){
      if(currCol>0){nextCol=currCol-1;}
    }
    if(direction==="ArrowRight"){
      if(currCol<4){nextCol=currCol+1;}
    }
    if(nextRow!==currRow || nextCol!==currCol){
      let grid=document.querySelector('#grid');
      let row = grid.querySelectorAll('.row')[nextRow];
      let nextTile = row.querySelectorAll('.square')[nextCol];
      currTile.classList.remove('targeted');
      nextTile.classList.add('targeted');
    }
  }
  
  // Tries to squish bug in the current tile (if there is a bug)
  function squishBug(){
    let currTile=getCurrentTile();
    currTile.childNodes.forEach(node =>{
      if(node.nodeName==='IMG'){
        node.dataset.status="dead";
        currTile.style.backgroundColor='red';
      }
    });

    // Check for gameover
    let bugs=document.querySelectorAll('img[src="./mosquito.png"]')
    let gameOver=true;
    bugs.forEach(bug=>{
      if(bug.dataset.status==='alive'){
        gameOver=false;
      }
    });

    if(gameOver){
      let timeElapsed=(getTimeElapsed()/1000).toFixed(4);
      document.querySelector('.info').textContent=`Extermination completed in ${timeElapsed} seconds!`
      
      let header=document.querySelector('h2');
      let newBtn=document.createElement('button');
      newBtn.textContent='Restart';
      newBtn.addEventListener('click', resetGame)
      header.appendChild(newBtn);
      newBtn.focus();
      gameCompleted=true;
    }
    function resetGame(){
      gameCompleted=false;
      location.reload();
    }
  } 












  // 👆 WORK WORK ABOVE THIS LINE 👆
} 






// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
