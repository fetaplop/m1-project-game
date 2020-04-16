/*
buildDom

createSplashScreen

createGameScreen

createGameover

window eventListener start on load

*/

// määrittele tässä tyhjiä muuttujia let game; jne

let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
// tarviiks muuta?

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
        <div class="button-div">
            <button>restart</button>
            <button id="hard">hard mode</button>
            <button id="back2main">Back to main</button>
        </div>
    </main>
`

// use this to create html elements
function buildDom(htmlString) {
    const containerDiv = document.createElement("div"); // holds the html element and can be used to retrieve that element
    containerDiv.innerHTML = htmlString;
    return containerDiv.children[0];
}

// ehkä ei laiteta sitä stringiä tähän vaan alitetaan kaikki peräkkäin alkuun??? nii et voi verrata =????
function createSplashScreen(splashString) {
    splashScreen = buildDom(splashString);
    document.body.appendChild(splashScreen)

    const startBtn = splashScreen.querySelector("button");
    startBtn.addEventListener("click", startGame);
    const hardBtn = document.getElementById("hard");
    hardBtn.addEventListener("click",startHardGame)
    // eventlistener call back func should be startGame!
    const swapBtn = document.getElementById("swap");
    swapBtn.addEventListener("click", startSwapGame);

}

function createGameScreen(htmlstring) {
    // buildom invoke
    gameScreen = buildDom(htmlstring);
    document.body.appendChild(gameScreen);
    //restartBtn.addEventListener("click", startGame); mallina tässä!
    const turhaButton = gameScreen.querySelector("button");
    // this isn't breaking the gameloop now!!! gameloop only looks if the timer has run out.
    turhaButton.addEventListener("click", endGame); // muista et endGame -funktio kutsutaan ilman () koska se on vaan muuttujanimi sille funktiolle!
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
    //backBtn.addEventListener('click', location.reload);
    //backBtn.addEventListener("click", createSplashScreen(splashStr)); // why cant I make thi s work????
    const hardBtn = document.getElementById("hard");
    hardBtn.addEventListener("click", startHardGame);

}

function removeScreen() {
    document.body.innerHTML = ""; // nothing in body should be displayed!
}

function startGame() {
    removeScreen();
    createGameScreen(gameStr);
    console.log("we're in game screen");
    // täältä pitäis kutsua uus peli ja pelin ite pitäis tietää sillon ku se loppuu.
    // silloin uuden pelin invoken jälkeen kun se on suorittanut loppuun voi vaan suoraan ajaa andGamen, joka saa
    // pelitltä scoren. eli ei mittään iffiä että onko peli loppunu tänne mainiin!

    game = new Game();
    game.gameScreen = gameScreen; // question, why we do it like this?
    // gameScreen is now set, now we need to jump into the loop by invoking it through our new game object

    //maybe we could bring in the difficulty from here???
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

function startSwapGame() {
    removeScreen();
    createGameScreen(gameStr);
    console.log("swap mode!");
    game = new Game();
    game.gameScreen = gameScreen;
    game.start("swap");
}

function endGame(score) { // it's a very good idea to import score to gameover screen
    // pretty sure täällä vois handlata sen et jos klikkaa end game gameScreenissä nii vois vaan asettaa et timeIsUp true to quit gameloop
    removeScreen();
    createGameOver(gameOverStr, score); // gameOverStr
    console.log(`I got the score: -- ${score} pts -- from game obj, hopefully`)
    // huoma scorella ei vielä tehä mitään! sen pitäis tulla tuolta game.js:stä 

    // 
}

// create splash screen only after everything is loaded!
window.addEventListener("load", createSplashScreen(splashStr));