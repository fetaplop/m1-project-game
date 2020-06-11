/* will need at least these functions:
buildDom
createSplashScreen
createGameScreen
createGameover
window eventListener start on load
*/

let game;
let splashScreen;
let gameScreen;
let gameOverScreen;

let splashStr = `
    <main>
        <h1><span style="font-size: small">a very</span> Bad StepMania Clone</h1>
        <div class="button-div">
            <button>Start Game</button>
            <button id="hard">Hard mode</button>
            <button id="swap">under construction</button>
        </div>
    </main>
`
let gameStr = `
    <main class = "game-container">
        <header>
            <div class="gamestats">
                <div>
                    <h2>Current score: 
                        <span class="score"> 0</span>
                    </h2>
                    <h2>
                        Time: <span class="timer"></span>
                    </h2>
                </div>        
            </div>
        </header> <!-- ehkä se timer yms tänne-->
            <div class = "canvas-container">
                <canvas></canvas>
            </div>
            <button style="margin: 0 43%;">quit game</button> <!--dirty hack-->
    </main>
`
let gameOverStr = `
    <main>
        <h1>game over</h1>
        <h2 class="score-display">your score string interpolation: <span></span> </h2>
        <div id="hiscores"></div>
        <div class="button-div">
            <button>restart</button>
            <button id="hard">hard mode</button>
            <button id="back2main">Back to main</button>
        </div>
    </main>
`

// creates html elements
function buildDom(htmlString) {
    const containerDiv = document.createElement("div"); // holds the html element and can be used to retrieve that element
    containerDiv.innerHTML = htmlString;
    return containerDiv.children[0];
}

// create splash screen from the html string and add event listeners to it to start game
function createSplashScreen(splashString) {
    splashScreen = buildDom(splashString);
    document.body.appendChild(splashScreen)

    const startBtn = splashScreen.querySelector("button");
    startBtn.addEventListener("click", startGame);
    const hardBtn = document.getElementById("hard");
    hardBtn.addEventListener("click", startHardGame)
    // eventlistener call back func should be startGame!
    const swapBtn = document.getElementById("swap");
    swapBtn.addEventListener("click", startSwapGame);

}

function createGameScreen(htmlstring) {
    // buildDom invoke
    gameScreen = buildDom(htmlstring);
    document.body.appendChild(gameScreen);

    //creating this to make testing easier!! needs another look
    const turhaButton = gameScreen.querySelector("button");
    turhaButton.addEventListener("click", endGame); // (remember not to actually call the endGame functtion here )
}

function createGameOver(overString, score) {
    gameOverScreen = buildDom(overString);
    let yourScore = gameOverScreen.querySelector("span");
    yourScore.innerHTML = `${score}`;
    document.body.appendChild(gameOverScreen);

    const restartBtn = gameOverScreen.querySelector("button");
    restartBtn.addEventListener("click", startGame);
    // add button just like is splash
    const backBtn = document.getElementById("back2main");
    // to make this work: create new function, where we call removeScreen and the createSplash..(str) !

    backBtn.addEventListener("click", backToMain);
    const hardBtn = document.getElementById("hard");
    hardBtn.addEventListener("click", startHardGame);


    // ------------------------------ hiscores still under construction: ---------------------
    // local storage!
    const topScores = [{name: "Guybrush Threepwood", score: 22000}, {name: "Dad", score: 10000}]
    const topScoreStr = JSON.stringify(topScores);
    //console.log("topScoreStr before stroing:", topScoreStr);

    localStorage.setItem("topScores", topScoreStr);

    // retrieve:

    const scoreStrFromLS = localStorage.getItem("topScores");
    //parse:
    retrievedScores = JSON.parse(scoreStrFromLS);

    let hiscores = document.getElementById("hiscores");


    /*
    for (let i = 0; i < retrievedScores.length; i++) {
        let newEntry = document.hiscores.createElement("LI");
        let entryText = document.hiscores.createTextNode("new entry") 
        newEntry.appendChild(entryText) 
        //const element = retrievedScores[index];
        //let entry = hiscores.appendChild(ul);
        
    }


    hiscores.innerHTML = retrievedScores */

    // structure: default: display topscores. IF you reach top-10, ask for name input and append topscores, display topscores

    console.log(scoreStrFromLS);
    // ^------------------------------ hiscores still under construction ---------------------


}

function backToMain() {
    removeScreen();
    createSplashScreen(splashStr);
}

function removeScreen() {
    document.body.innerHTML = ""; // nothing in body should be displayed!
}

function startGame() {
    removeScreen();
    createGameScreen(gameStr);
    //console.log("we're in game screen");

    // create a new Game object. The game itself knows when it ends and will call endGame and pass it player score
    game = new Game();
    game.gameScreen = gameScreen;

    //give the game difficulty here
    game.start("normal");
}

function startHardGame() {
    removeScreen();
    createGameScreen(gameStr);
    console.log("HARD MODE");
    game = new Game();
    game.gameScreen = gameScreen;
    game.start("hard");
}

// UNDER CONSTRUCTION
function startSwapGame() {
    removeScreen();
    createGameScreen(gameStr);
    console.log("swap mode!");
    game = new Game();
    game.gameScreen = gameScreen;
    game.start("swap");
}

// create game over screen
function endGame(score) { // import score from game
    // bug/feature when player clicks end game from game window; gameover doesn*T GET THE SCORE
    removeScreen();
    createGameOver(gameOverStr, score); // gameOverStr
    console.log(`I got the score: -- ${score} pts -- from game obj, hopefully`)
    // huoma scorella ei vielä tehä mitään! sen pitäis tulla tuolta game.js:stä 

    // 
}

// create splash screen only after everything is loaded!
window.addEventListener("load", createSplashScreen(splashStr));