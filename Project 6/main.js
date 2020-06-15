let blocks = document.querySelectorAll('.game-block'),
    blocksArray = [...blocks],
    blocksContainer = document.querySelector('.blocks'),
    movesContainer = document.querySelector('.moves span')

let timer,
    moves = 0,
    timerInterval;

// ----- start the game -----
let welcome = document.querySelector('.welcome');
welcome.onclick = () => {
    let name = document.querySelector('.name span'),
        enterName = prompt('Enter Your Name');
    if(enterName === '' || enterName === null){
        name.innerHTML = 'Unknown'
    } else{
        name.innerHTML = enterName.slice(0,1).toUpperCase() + enterName.slice(1)
    }
    welcome.remove();

    // start timer
    timer = 80;
    startTimer();
}

// ----- shuffle items -----
let i,j,k;
for(i=blocksArray.length-1; i>0; i--){
    j = Math.floor(Math.random()*20);
    k = blocksArray[i];
    blocksArray[i] = blocksArray[j];
    blocksArray[j] = k;
    blocksArray[i].style.order = i
}

//----- create flip function -----
blocks.forEach(block => block.onclick = () => {    
    block.classList.add('flipped');
    let flippedCards = blocksArray.filter(block => block.classList.contains('flipped')); 

    if(flippedCards.length ===2 ){
        moves++
        movesContainer.innerHTML = moves;

        // ----- stop clicking -----
        blocksContainer.classList.add('no-clicking')
        setTimeout(() => {
            blocksContainer.classList.remove('no-clicking');
            flippedCards.map(e => e.classList.remove('flipped'))
        }, 1000);        

        // ----- checking if there is a match -----
        if(flippedCards[0].dataset.type === flippedCards[1].dataset.type){
            flippedCards.forEach(e => e.classList.add('matched'));
            document.querySelector('#success').play()
        } else {
            document.querySelector('#fail').play()
        }
    }
})

// ----- create game timer -----
function startTimer(){
    let gameTimerContainer = document.querySelector('.timer');
    let gameTimer = document.querySelector('.timer span');
    timerInterval = setInterval( () => {
        gameTimer.innerHTML = timer;
        timer--;
        if(timer <=9){
            gameTimerContainer.style.color = 'red';
            gameTimerContainer.style.fontWeight = 'bold';
            gameTimer.innerHTML = `0${timer}`;
        }else{
            gameTimerContainer.style.fontWeight = 'normal';
            gameTimerContainer.style.color = 'black';
            gameTimer.innerHTML = timer
        }

            // is game over?
            gameOver();
    },1000)
}

// -----game over function -----
function gameOver() {
    let finished = document.querySelector('.finished'),
        win = document.querySelector('#win'),
        lose = document.querySelector('#lose'),
        playerStatUs = document.querySelector('.finished .state-us'),
        numberOfMoves = document.querySelector('.number-of-moves');

    // finished the game?
    if(blocksArray.every(e => e.classList.contains('matched'))){
        playerStatUs.innerHTML = 'Congratulations';
        finished.style.display = 'flex';
        numberOfMoves.innerHTML = moves;
        win.play();
        clearInterval(timerInterval);
        finished.children[0].onclick = () => {
            window.location.reload()
        }
    }

    // is time finished?
    if(timer <= 0){
        playerStatUs.innerHTML = 'Geme Over';
        finished.style.display = 'flex';
        numberOfMoves.innerHTML = moves;
        lose.play();
        clearInterval(timerInterval);
        finished.children[0].onclick = () => {
            window.location.reload()
        }
    }
}
