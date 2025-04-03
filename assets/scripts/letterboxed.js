const wordBoxes = document.querySelector(".wordBoxes");
hintTag = document.querySelector(".hint span");
async function randomWord() {
    const fetchWord = async () => {
        let word = await fetch("https://random-word-api.herokuapp.com/word");
        return word.json();
    }
    let word = await fetchWord();
    console.log(word[0]);

    const fetchHint = async () => {
        let hint = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+ word[0]);
        return hint.json();
    }

    let hint = await fetchHint();
    hintTag.innerText = hint[0].meanings[0].definitions[0].definition;
    console.log(hint[0].meanings[0].definitions[0].definition);

    let html = "";
    for (let i = 0; i < word.length; i++) {
        wordBoxes.innerHTML = html;
    }
}
randomWord();