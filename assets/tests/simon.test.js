/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, pickRandom, lightsOn, showTurns, playerTurn } = require('../scripts/simon.js');   


beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('simon.html', 'utf8');
    document.open();
    document.write(fileContents);
    document.close();
})

describe("game object keys test", () => {
    test("game object should have a score key", () => {
        expect(game).toHaveProperty('score');
    });
    test("game object should have a currentGame key", () => {
        expect(game).toHaveProperty('currentGame');
    });
    test("game object should have a playerMoves key", () => {
        expect(game).toHaveProperty('playerMoves');
    });
    test("game object should have a choices key", () => {
        expect(game).toHaveProperty('choices');
    });
    test("game object should have a turnNumber key", () => {
        expect(game).toHaveProperty('turnNumber');
    });
});


describe("game object values test", () => {
    test("game object choices should contain button ids", () => {
        expect(game.choices).toEqual(["button0", "button1", "button2", "button3"]);
    });
});

describe("newGame function functionality test", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = [1, 2, 3, 4];
        game.playerMoves = [1, 2, 3, 4];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test("score should be 0", () => {
        expect(game.score).toBe(0);
    });
    test("Score should display 0 for the element with ID of score", () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    })
    test("currentGame should have a population of one", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("playerMoves should be an empty array", () => {
        expect(game.playerMoves).toEqual([]);
    });
    test("data-listener attribute set to true", () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toBe('true');
        }
    });
});

describe("Gameplay functionality test", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the currentGame array", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("light class is correctly applied", () => {
        lightsOn('button0');
        expect(document.getElementById('button0').className).toBe('circle circle1 light');
    })
    test("game.turnNumber is correctly incremented", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    })
});