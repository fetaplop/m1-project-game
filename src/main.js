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
        <h1>u n n a m e d    r h y t h m    g a m e </h1>
        <button>Start Game</button>
    </main>
`
let gameStr = `
    <main class = "game-container">
        <header>
            <h1>this  g a m e </h1>
            <div class="score">
                <h3>some stuff here if we need, score at least</h3>
                <span class="value"> tänne pittää osoittaa jotenki se score, mulla on class score, sub class value <span\>
            </div>
        </header> <!-- ehkä se timer yms tänne-->
            <div class = "canvas-container">
                <canvas></canvas>
            </div>
            <button>pointless button minä lopetan pelin että saadaan transitiot testattua</button>
    </main>
`
let gameOverStr = `
    <main>
        <h1> g a m e  over</h1>
        <h2>your score string interpolation: <span></span> </h2>
        <button>restart button</button>
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
    startBtn.addEventListener("click", function () {
        startGame();
    });
    // eventlistener call back func should be startGame!
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

    const restartBtn = gameOverScreen.querySelector("button");
    restartBtn.addEventListener("click", startGame);
    // add button just like is splash

    document.body.appendChild(gameOverScreen);
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

    game.start();
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