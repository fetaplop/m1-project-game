"use strict"

class Game {
    constructor() {
        this.arrows = []; // reserved but not used yet, kai ne pitää olla pelissä kans määritelty??
        this.arrowBoxes = []; // pitäiskö tää tehä toisin?
        this.timeIsUp = false; // teenkö timerin erikseen???
        this.timer = 0; // tässä tää nyt on
        this.score = 0;
        this.gameScreen = null;
        this.canvas = null;
        this.ctx = null;

        }

        //methods
        start() {
            // referencing the canvas and setting 2D context
            const canvasCont = document.querySelector(".canvas-container");
            console.log(canvasCont)
            this.canvas = this.gameScreen.querySelector("canvas"); // setting canvas html element as our canvas property
            this.ctx = this.canvas.getContext("2d"); // just like the example

            // score and timer should be assigned here to their respective html elements so their value can be assigned through a var name
            this.scoreElement = this.gameScreen.querySelector(".score .value") // why do we not use "let this.scoreElemen.... ?""

            // fixing canvas size, check later if ok
            this.containerWidth = canvasCont.clientWidth;
            this.containerHeigth = canvasCont.clientHeight;

            this.canvas.width = this.containerWidth;
            this.canvas.height = this.containerHeigth;

            //thats visuals, now the game loop
            //
            console.log("start was invoked and we made it to the end of setting visuals!")

            // make arrow-boxes

            // muista se bind!!!!!
        }

        
        // ehkä kannattaa luoda oma class arrow-boxeille.
        // ne voi määritää tässä startissa ja antaa argumenttina tää canvas(!!!) ja montako boxii halutaan
        // ne varmaan kannatta flex boxata paikoilleen
        // jos rakentaa sen alusta alkaen näin, on helpompi tehä ensin yks ja sit useempi box (ja niille arrowit)

                // next method
        // so now we create the arrow-boxes inside start()!!!!!!!!!!!!
        // maybe then we start populating screen woth arrows
        
}
// Class Game...
/*
properties:

methods
eventListener for key presses -> highlight pressed key
check if collision
check if correct key press
check if key press was within acceptable accuracy
update score
update positions
loop to remove old + draw new frame
check if time is up
*/

// we should create new arrows in the game loop