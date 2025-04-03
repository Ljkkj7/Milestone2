let game = {
    score: 0,
    gamecounter: 0,
    highscore: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button0", "button1", "button2", "button3"],
};

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
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
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(pickRandom(game.choices));
    showTurns();
}

function pickRandom(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

function showScore() {
    document.getElementById('score').innerText = game.score;
}

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

function displayScore() {
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

function lightsOn(circ) {
    document.getElementById(circ).classList.add('light');
    setTimeout(() => {
        document.getElementById(circ).classList.remove('light');
    }, 400);
}

module.exports = { game, newGame, showScore, addTurn, pickRandom, lightsOn, showTurns, playerTurn };