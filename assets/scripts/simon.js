// 
let game = {
    score: 0,
    gamecounter: 0,
    highscore: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button0", "button1", "button2", "button3"],
};

// Function to start a new game
function newGame() {
    // Reset game state
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    // For loop to track player moves
    for (let circle of document.getElementsByClassName('circle')) {
        if (circle.getAttribute('data-listener') !== 'true') {
            circle.addEventListener('click', (e) => {
                let move = e.target.getAttribute('id');
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
            });
            circle.setAttribute('data-listener', 'true');
        }
    }
    // Update the game state
    showScore();
    addTurn();
}

// Function to add a turn to the game
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(pickRandom(game.choices));
    showTurns();
}

// Function to pick a random next move
function pickRandom(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to show the current score
function showScore() {
    document.getElementById('score').innerText = game.score;
}

// Function to show the turns in the game
function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(function() {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 1200);
}

// Function to handle player's turn
function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.playerMoves.length === game.currentGame.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert('Wrong move!');
        displayScore();
        newGame();
    }
}

// Function to display the score after a game ends
function displayScore() {
    // Increment the game counter and update the high score if necessary
    game.gamecounter++;
    if (game.score > game.highscore) {
        let scoreContainer = document.getElementById('high-score-container');
        let oldHScore = document.querySelector('p.highscore');
        console.log(oldHScore);
        console.log(scoreContainer.childNodes.length);
        if (scoreContainer.childNodes.length > 3) {
            scoreContainer.removeChild(oldHScore);
        }
        let highScore = document.createElement('p');
        game.highscore = game.score;
        highScore.innerHTML = `${game.highscore}`;
        highScore.classList.add('highscore');
        scoreContainer.appendChild(highScore);
    }
    let scoreContainer = document.getElementById('score-container');
    let lastScore = document.createElement('p');
    lastScore.innerHTML = `Game: ${game.gamecounter} | Score: ${game.score}`;
    lastScore.classList.add('score');
    scoreContainer.appendChild(lastScore);
}

// Function to light up a circle
function lightsOn(circ) {
    document.getElementById(circ).classList.add('light');
    setTimeout(() => {
        document.getElementById(circ).classList.remove('light');
    }, 400);
}