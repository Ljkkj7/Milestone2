const wordBoxes = document.querySelector(".wordBoxes");
hintTag = document.querySelector(".hint span");
attempts = document.querySelector(".attempts span");
wrongLetters = document.querySelector(".wrongLetters span");
resetBtn = document.querySelector(".resetButton");

let wrongLettersList = []; // List to store wrong letters
let correctLettersList = []; // List to store correct letters

async function randomWord() {
    const fetchWord = async () => {
        try {
            let response = await fetch("https://random-word-api.herokuapp.com/word");
            return await response.json();
        } catch (err) {
            console.log("Error fetching word:", err);
            randomWordLocal(); // Retry fetching a new word locally if there's an error
            return []; // Return an empty array to avoid breaking the code
        }
    };

    let word = await fetchWord();
    if (!word || word.length === 0) {
        console.log("No word fetched.");
        randomWord(); // Retry fetching a new word if there's an error
    }
    console.log(word[0]);

    const fetchHint = async () => {
        try {
            let response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word[0]);
            return await response.json();
        } catch (err) {
            console.log("Error fetching hint:", err);
            randomWordLocal(); // Retry fetching a new hint locally if there's an error
        }
    };

    let hint = await fetchHint();
    console.log(hint);
    if (hint.title === "No Definitions Found") {
        console.log("No hint fetched.");
        randomWord(); // Retry fetching a new hint if there's an error
    } else {
        hintTag.innerText = hint[0].meanings[0].definitions[0].definition;
    }
    console.log(hint[0].meanings[0].definitions[0].definition);

    guesses = 0; // Reset guesses for the new word
    attempts.innerText = guesses; // Update attempts display

    let html = "<div class='letterBox'></div>";
    for (let i = 0; i < word[0].length; i++) {
        wordBoxes.appendChild(document.createElement("div")).innerHTML = html;
    }
}

function randomWordLocal() {
    let randItem = Math.floor(Math.random() * wordList.length);
    word = wordList[randItem].word; // Randomly select a word from the local list
    hint = wordList[randItem].hint; // Get the corresponding hint

    hintTag.innerText = hint; // Display the hint
    guesses = 0; // Reset guesses for the new word
    attempts.innerText = guesses; // Update attempts display

    let html = "<div class='letterBox'></div>";
    for (let i = 0; i < word.length; i++) {
        wordBoxes.appendChild(document.createElement("div")).innerHTML = html;
    }
}

function initGame() {
    wordBoxes.innerHTML = ""; // Clear previous word boxes
    randomWord(); // Fetch a new word and hint
    hintTag.innerText = ""; // Clear previous hint

}
initGame(); // Initialize the game

resetBtn.addEventListener("click", initGame); // Reset button to fetch a new word