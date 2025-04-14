const wordBoxes = document.querySelector(".wordBoxes");
hintTag = document.querySelector(".hint span");
attempts = document.querySelector(".attempts span");
wrongLetters = document.querySelector(".wrongLetters span");
resetBtn = document.querySelector(".resetButton");
input = document.getElementById("guessInput");
submitButton = document.getElementById("submitButton");
resetBtn = document.querySelector(".resetButton");
helpInfo = document.querySelector(".gameDescription");
helpButton = document.querySelector(".helpButton");
let storedWord

let wrongLettersList = []; // List to store wrong letters
let correctLettersList = []; // List to store correct letters
let mediumLettersList = []; // List to store medium letters
let guesses = 0; // Number of guesses made

async function randomWord() {

    
    wrongLettersList = []; // Reset wrong letters list
    wrongLetters.innerText = ""; // Clear previous wrong letters display
    correctLettersList = []; // Reset correct letters list

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
    let applyList = [[]]; // List to store amount of style applications to a letter
    input.value = ""; // Clear the input field
    console.log("Guess:", guess);
    console.log("Word:", storedWord[0].word);

    if (guess === storedWord[0].word) {
        for (let i = 0; i < storedWord[0].word.length; i++) {
            wordBoxes.children[i].classList.remove("grey"); // Change the box colour from grey
            wordBoxes.children[i].classList.remove("yellow"); // Change the box colour from yellow
            wordBoxes.children[i].classList.add("green"); // Change the box colour to green
            wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
        }
        alert("Congratulations! You guessed the word!"); // Alert if the guess is correct
        return; // Exit the function if the guess is correct
    }

    if (guess.length !== storedWord[0].word.length) {
        alert("Please enter a word with " + storedWord[0].word.length + " letters."); // Alert if the guess length is incorrect
        return; // Exit the function if the guess length is incorrect
    }

    if (attempts.innerText >= 1 && attempts.innerText <= 5) {
        for (let i = 0; i < storedWord[0].word.length; i++) {
            console.log(correctLettersList)
            if (guess[i] === storedWord[0].word[i]) {
                if (guess[i].includes(correctLettersList) && wordBoxes.children[i].classList.contains("green")) {
                    continue; // Skip if the letter is already correct
                } else {
                    if (applyList[0] === undefined) {
                        applyList[0][0] = guess[i]; // Add the letter to the apply list
                        applyList[0][1] = 0; // Set the count to 0
                    } else {
                        for (let j = 0; j < applyList.length; j++) {
                            if (applyList[j][0] === guess[i]) {
                                continue; // Skip if the letter is already in the apply list
                            } else {
                                applyList.push([guess[i], 0]); // Add the letter to the apply list with count 0
                            }
                        }
                    }
                    if(wordBoxes.children[i].classList.contains("yellow") || wordBoxes.children[i].classList.contains("grey")) {
                        wordBoxes.children[i].classList.remove("yellow"); // Change the box colour from yellow
                        wordBoxes.children[i].classList.remove("grey"); // Change the box colour from grey
                    }
                    wordBoxes.children[i].classList.add("green"); // Change the box colour to green
                    wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
                    for (let j = 0; j < applyList.length; j++) {
                        if (applyList[j][0] === guess[i]) {
                            applyList[j][1]++; // Increment the count for the letter in the apply list
                        }
                    }
                    if (correctLettersList.includes(guess[i]) && checkOccuranceList(correctLettersList, guess[i]) === checkOccurance(guess[i])) {
                        continue; // Skip if the letter is already correct
                    } else {
                        correctLettersList.push(guess[i]); // Add the correct letter to the list
                    }
                }
            } else if (storedWord[0].word.includes(guess[i])) {
                {
                    if (applyList[0] === undefined) {
                        applyList[0][0] = guess[i]; // Add the letter to the apply list
                        applyList[0][1] = 0; // Set the count to 0
                    } else {
                        for (let j = 0; j < applyList.length; j++) {
                            if (applyList[j][0] === guess[i]) {
                                continue; // Skip if the letter is already in the apply list
                            } else {
                                applyList.push([guess[i], 0]); // Add the letter to the apply list with count 0
                            }
                        }
                    }
                    if (checkApplyCount(applyList, guess[i]) < checkOccurance(guess[i])) {
                        if (wordBoxes.children[i].classList.contains("grey") || wordBoxes.children[i].classList.contains("green")) {
                            wordBoxes.children[i].classList.remove("green"); // Change the box colour from green
                            wordBoxes.children[i].classList.remove("grey"); // Change the box colour from grey
                        }
                        wordBoxes.children[i].classList.add("yellow"); // Change the box colour to yellow
                        wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
                        for (let j = 0; j < applyList.length; j++) {
                            if (applyList[j][0] === guess[i]) {
                                applyList[j][1]++; // Increment the count for the letter in the apply list
                            }
                        }
                } else if (checkApplyCount(applyList, guess[i]) === checkOccurance(guess[i])) {
                        if (wordBoxes.children[i].classList.contains("green") || wordBoxes.children[i].classList.contains("yellow")) {
                            wordBoxes.children[i].classList.remove("green"); // Change the box colour from green
                            wordBoxes.children[i].classList.remove("yellow"); // Change the box colour from yellow
                        }
                        wordBoxes.children[i].classList.add("grey"); // Change the box colour to grey
                        wordBoxes.children[i].innerText = guess[i]; // Display the wrong letter in the corresponding box
                    }
            }} else {
                if (wordBoxes.children[i].classList.contains("green") || wordBoxes.children[i].classList.contains("yellow")) {
                    wordBoxes.children[i].classList.remove("green"); // Change the box colour from green
                    wordBoxes.children[i].classList.remove("yellow"); // Change the box colour from yellow
                }
                wordBoxes.children[i].classList.add("grey"); // Change the box colour to grey
                wordBoxes.children[i].innerText = guess[i]; // Display the wrong letter in the corresponding box
                if (wrongLettersList.includes(guess[i])) {
                    continue; // Skip if the letter is already wrong
                }
                wrongLettersList.push(guess[i]); // Add the wrong letter to the list
            }}
        guesses++; // Increment the number of guesses
        attempts.innerText = guesses; // Update the attempts display
        wrongLetters.innerText = wrongLettersList.join(", "); // Display the wrong letters
    } else if (attempts.innerText == 0) {
        resetBtn.style.display = "flex"; // Show the reset button
        for (let i = 0; i < storedWord[0].word.length; i++) {
            if (applyList[0] === undefined) {
                applyList[0][0] = guess[i]; // Add the letter to the apply list
                applyList[0][1] = 0; // Set the count to 0
            } else {
                for (let j = 0; j < applyList.length; j++) {
                    if (applyList[j][0] === guess[i]) {
                        continue; // Skip if the letter is already in the apply list
                    } else {
                        applyList.push([guess[i], 0]); // Add the letter to the apply list with count 0
                    }
                }
            }
            if (guess[i] === storedWord[0].word[i]) {
                if (guess[i].includes(correctLettersList) && wordBoxes.children[i].classList.contains("green")) {
                    continue; // Skip if the letter is already correct
                }
                wordBoxes.children[i].classList.add("green"); // Change the box colour to green
                wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
                correctLettersList.push(guess[i]); // Add the correct letter to the list
                console.log(correctLettersList);
            } else if (storedWord[0].word.includes(guess[i]) && !correctLettersList.includes(guess[i])) {
                if (checkOccuranceList(mediumLettersList, guess[i]) < checkOccurance(guess[i])) {
                    wordBoxes.children[i].classList.add("yellow"); // Change the box colour to yellow
                    wordBoxes.children[i].innerText = guess[i]; // Display the correct letter in the corresponding box
                    mediumLettersList.push(guess[i]); // Add the medium letter to the list
                } else {
                    wordBoxes.children[i].classList.add("grey"); // Change the box colour to grey
                    wordBoxes.children[i].innerText = guess[i]; // Display the wrong letter in the corresponding box
                }
                
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
    } else {
        alert("Game Over! The word was: " + storedWord[0].word); // Alert if the game is over
        for (let i = 0; i < storedWord[0].word.length; i++) {
            wordBoxes.children[i].classList.add("grey"); // Change the box colour to grey
            wordBoxes.children[i].innerText = storedWord[0].word[i]; // Display the correct letter in the corresponding box
        }
    }
}

function checkOccurance(inputLetter) {
    let count = 0; // Initialize the count of occurrences
    for (let i = 0; i < storedWord[0].word.length; i++) {
        if (inputLetter === storedWord[0].word[i]) {
            count++; // Increment the count if the letter matches
        }
    }
    console.log("Count of " + inputLetter + ": " + count); // Log the count of occurrences
    return count; // Return the count of occurrences
}

function checkOccuranceList(list, letter) {
    let count = 0; // Initialize the count of occurrences in the list
    for (let i = 0; i < list.length; i++) {
        if (letter === list[i]) {
            count++; // Increment the count if the letter matches
        }
    }
    console.log("Count of " + letter + " in list: " + count); // Log the count of occurrences in the list
    return count; // Return the count of occurrences in the list
}

function checkApplyCount(list, letter) {
    for (let i = 0; i < list.length; i++) {
        if (list[i][0] === letter) {
            console.log("Count of " + letter + " in apply list: " + list[i][1]); // Log the count of occurrences in the apply list
            return list[i][1]; // Return the count of occurrences in the apply list
        }
    }
    return 0; // Return 0 if the letter is not found in the apply list
}

function showHelp() {
    helpInfo.style.display = "flex"; // Show the help information
}

function initGame() {
    wordBoxes.innerHTML = ""; // Clear previous word boxes
    randomWord(); // Fetch a new word and hint
    hintTag.innerText = ""; // Clear previous hint
}
initGame(); // Initialize the game

resetBtn.addEventListener("click", initGame); // Reset button to fetch a new word
helpButton.addEventListener("click", showHelp); // Help button to show help information
submitButton.addEventListener("click", onGuess); // Submit button to check the guess
input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        onGuess(); // Call the awaitGuess function when Enter is pressed
    }
});