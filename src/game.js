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
        //this.size = 10;

    }

    //methods
    start() { // this will literally just start the game, later will come the game loop where we update canvas all the time
        // referencing the canvas and setting 2D context
        const canvasCont = document.querySelector(".canvas-container");
        console.log("check out canvasCont console log:")
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
        console.log(this.containerHeigth);

        //thats visual presets, 
        //// event listener
        const keyPressListener = function (event) {
            if (event.key === "ArrowLeft") {
                // func to check if it is correct + if it is timed right..
                // return "left"
            }
            // if key is presssed, do this...
        }.bind(this); // bound to game object! (instead of window)

        document.addEventListener("keydown", keyPressListener); // should be checked continually until key press ends

        //now the game loop
        //
        console.log("start was invoked and we made it to the end of setting visuals!")
        // make arrow-boxes

        this.drawBox(20); // just give the x-axis position here, the rest is preset inside drawBox()
        this.drawBox(60);
        this.drawBox(100);



        // here we define how many of them we need, the placement of them should be defined in arr

        // muista se bind!!!!!

        // nyt aloitetaan game loop!
        console.log("next we're trying to invoke startingLoop() which in turn invokes the gameLoop")
        this.startingLoop();
        console.log("this is coming after invoking startingLoop()")
    }

    startingLoop() {
        // tässä loopissa pitäis kattoo kelloo ja jos aikaa on vielä, jatkaa peliä!


        // i should have recursive structure def func loop .... invoke loop()
        const gameLoop = function () {
            let testArrow;
            // start making arrows and listening to key strokes and whatnot
            if (this.arrows.length === 0) {
                testArrow = new Arrow(this.canvas, "left", 3);
                this.arrows.push(testArrow);
            }
            // we need just 1
            //if (!this.arrows.length === 0) {
            //}
            testArrow = this.arrows[0];

            testArrow.updatePosition();
            if (testArrow.boxCollision() === true) {
                testArrow.isAligned = true; // CHANGED THIS TO HILIGHT A HIT
                console.log("we hit something!")
            } else {
                // we have to assign the alignment property to false
                testArrow.isAligned = false;
            }
            // clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            testArrow.draw();
            // we dont have a timer yet but.. let's make it somehow happen
            this.score++;

            if (this.score > 300) {
                this.gameOver();
            } // keskekn!!!
            else if (this.score % 10 === 0) {
                console.log(this.score);
            }
            // if the game has not ended, keep loopin
            if (this.timeIsUp === false) {
                requestAnimationFrame(gameLoop);
            }

        }.bind(this); // _this bound to game element, right?
        // now we have to invoke the gameLoop so that we enter it once and can exit it from within
        gameLoop();
    }

    gameOver() {
        this.timeIsUp = true;
        // we should export the score from here!
        console.log("Time is up!!! we're in class Game, method gameOver!!");
    }

    drawBox(box_x) {
        // box size is hardcoded here
        // box_y is hardcoded here
        //console.log("helllooooo?? do we ever get here??????????");

        const size = 100;
        const box_y = 80;

        this.ctx.fillStyle = "black";
        // ctx.fillRect(x, y, width, height)
        this.ctx.fillRect(box_x, box_y, size, size); // is it not taking in size? it's not working with numeric values
        // doesn't work even if i set this.size in properties and use it here.
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