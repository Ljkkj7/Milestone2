const wordBoxes = document.querySelector(".wordBoxes");
hintTag = document.querySelector(".hint span");
attempts = document.querySelector(".attempts span");
wrongLetters = document.querySelector(".wrongLetters span");
resetBtn = document.querySelector(".resetButton");
input = document.getElementById("guessInput");
let storedWord

let wrongLettersList = []; // List to store wrong letters
let correctLettersList = []; // List to store correct letters
let guesses = 0; // Number of guesses made

async function randomWord() {
    const fetchWord = async () => {
        try {
            let response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
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
            storedWord = await response.json(); // Store the fetched word for later use
            return storedWord;
        } catch (err) {
            console.log("Error fetching hint:", err);
            randomWordLocal(); // Retry fetching a new hint locally if there's an error
            return []; // Return an empty array to avoid breaking the code
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
    return word; // Return the selected word
}

function onGuess() {
    let guess = input.value.toLowerCase(); // Get the guessed word from input
    input.value = ""; // Clear the input field
    console.log("Guess:", guess);
    console.log("Word:", storedWord[0].word);

    if (guess === storedWord[0].word) {
        for (let i = 0; i < storedWord[0].word.length; i++) {
            wordBoxes.children[i].classList.add("green"); // Change the box colour to green
            wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
        }
        alert("Congratulations! You guessed the word!"); // Alert if the guess is correct
        return; // Exit the function if the guess is correct
    }
    if (guess.length !== storedWord[0].word.length) {
        alert("Please enter a word with " + storedWord[0].word.length + " letters."); // Alert if the guess length is incorrect
    }

    if (attempts.innerText >= 1) {
        for (let i = 0; i < storedWord[0].word.length; i++) {
            if (guess[i] === storedWord[0].word[i]) {
                if (guess[i].includes(correctLettersList)){
                    continue; // Skip if the letter is already correct
                } else {
                    wordBoxes.children[i].classList.remove("grey"); // Change the box colour from grey
                    wordBoxes.children[i].classList.remove("yellow"); // Change the box colour from yellow
                    wordBoxes.children[i].classList.add("green"); // Change the box colour to green
                    wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
                    correctLettersList.push(guess[i]); // Add the correct letter to the list
                }
            } else if (storedWord[0].word.includes(guess[i])) {
                wordBoxes.children[i].classList.add("yellow"); // Change the box colour to yellow
                wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
            } else {
                wordBoxes.children[i].classList.add("grey"); // Change the box colour to grey
                wordBoxes.children[i].innerText = guess[i]; // Display the wrong letter in the corresponding box
                wrongLettersList.push(guess[i]); // Add the wrong letter to the list
            }}
        guesses++; // Increment the number of guesses
        attempts.innerText = guesses; // Update the attempts display
    } else if (attempts.innerText == 0) {
        for (let i = 0; i < storedWord[0].word.length; i++) {
            if (guess[i] === storedWord[0].word[i]) {
                wordBoxes.children[i].classList.add("green"); // Change the box colour to green
                wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
                correctLettersList.push(guess[i]); // Add the correct letter to the list
            } else if (storedWord[0].word.includes(guess[i])) {
                wordBoxes.children[i].classList.add("yellow"); // Change the box colour to yellow
                wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
            } else {
                wordBoxes.children[i].classList.add("grey"); // Change the box colour to grey
                wordBoxes.children[i].innerText = guess[i]; // Display the wrong letter in the corresponding box
                if (wrongLettersList.includes(guess[i])) {
                    continue; // Skip if the letter is already wrong
                }
                wrongLettersList.push(guess[i]); // Add the wrong letter to the list
            }
        }
        guesses++; // Increment the number of guesses
        attempts.innerText = guesses; // Update the attempts display
        wrongLetters.innerText = wrongLettersList.join(", "); // Display the wrong letters
    }
}

function initGame() {
    wordBoxes.innerHTML = ""; // Clear previous word boxes
    randomWord(); // Fetch a new word and hint
    hintTag.innerText = ""; // Clear previous hint
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            onGuess(); // Call the awaitGuess function when Enter is pressed
        }
    });
}
initGame(); // Initialize the game

resetBtn.addEventListener("click", initGame); // Reset button to fetch a new word
