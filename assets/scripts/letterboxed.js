const wordBoxes = document.querySelector(".wordBoxes");
hintTag = document.querySelector(".hint span");

async function randomWord() {
    const fetchWord = async () => {
        try {
            let response = await fetch("https://random-word-api.herokuapp.com/word");
            return await response.json();
        } catch (err) {
            console.log("Error fetching word:", err);
            randomWord(); // Retry fetching a new word if there's an error
        }
    };

    let word = await fetchWord();
    if (!word || word.length === 0) {
        console.log("No word fetched.");
        return;
    }
    console.log(word[0]);

    const fetchHint = async () => {
        try {
            let response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word[0]);
            return await response.json();
        } catch (err) {
            console.log("Error fetching hint:", err);
            randomWord(); // Retry fetching a new word if there's an error
        }
    };

    let hint = await fetchHint();
    console.log(hint);
    if (hint.title === "No Definitions Found") {
        console.log("No hint fetched.");
        randomWord(); // Retry fetching a new word if there's an error
    } else {
        hintTag.innerText = hint[0].meanings[0].definitions[0].definition;
    }
    console.log(hint[0].meanings[0].definitions[0].definition);

    let html = "<div class='letterBox'>";
    for (let i = 0; i < word[0].length; i++) {
        wordBoxes.innerHTML = html;
    }
}
randomWord();