const words = ["Hello", "Programming", "Code", "Javascript", "Town", "Country", "Testing", "Youtube", "Linkedin", "Twitter", "Github", "Leetcode", "Internet", "Python", "Scala", "Destructuring", "Paradigm", "Styling", "Cascade", "Documentation", "Coding", "Funny", "Working", "Dependencies", "Task", "Runner", "Roles", "Test", "Rust", "Playing"];
const levels = {
    "Easy": 5,
    "Normal" : 3,
    "Hard": 2
}

let levelName = "Normal";
let levelSeconds = levels[levelName];

let startButton = document.querySelector(".start");
let levelNameSpan = document.querySelector(".message .level");
let levelSecondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let input = document.querySelector("#input-text");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".control .time span");
let gotScore = document.querySelector(".control .score .got");
let totalScore = document.querySelector(".control .score .total");
let finishMessage = document.querySelector(".finish");
let score = 0;

levelNameSpan.innerHTML = levelName;
levelSecondsSpan.innerHTML = levelSeconds;
timeLeftSpan.innerHTML = levelSeconds;
totalScore.innerHTML = words.length;

// disable pasting text into field (security)
input.onpaste = function() {
    return false; 
}

// Start Game
startButton.onclick = function() {
    this.remove();
    input.focus();
    generateWords();
}

function generateWords() {
    let randomIndex = Math.floor(Math.random() * words.length);
    let randomWord = words[randomIndex];
    theWord.innerHTML = randomWord;
    words.splice(randomIndex, 1);
    upcomingWords.innerHTML = "";
    for (let i = 0 ; i < words.length ; i++) {
        let div = document.createElement("div");
        let textNode = document.createTextNode(words[i]);
        div.appendChild(textNode);       
        upcomingWords.appendChild(div);
    }
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = levelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML == 0) {
            clearInterval(start);
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = "";
                gotScore.innerHTML++;
                if (words.length > 0) {
                    generateWords();
                } else {
                    let span = document.createElement("span");
                    span.appendChild(document.createTextNode("Perfect"));
                    span.classList.add("good");
                    finishMessage.appendChild(span);
                    upcomingWords.remove();
                    input.remove();
                    theWord.remove()
                }
            } else {
                let span = document.createElement("span");
                span.appendChild(document.createTextNode("Game Over"));
                span.classList.add("bad");
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}