"use strict"

class Game {
    constructor() {
        this.arrows = []; // holds arrow objects
        this.arrowBoxes = []; // dont really need this atm
        this.timeIsUp = false; // teenkö timerin erikseen???
        this.timer = 0; // it's a fake! just counting animation frames lol
        this.score = 0;
        this.gameScreen = null;
        this.canvas = null;
        this.ctx = null;

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
            if (event.key === "ArrowLeft") { // test arrow is set to be "left"
                // func to check if it is correct + if it is timed right..
                // return "left" ????
                this.keyPressMatchesArrow("left") // sending info on what key was pressed to this function
                console.log("HEY MOM I'M PRESSING THE LEFT ARROW");
            } else {// ??????????????????
                console.log("hey dont go pressing those buttons just whenever");
            }


        }.bind(this); // bound to game object! (instead of window)

        document.addEventListener("keydown", keyPressListener); // should be checked continually until key press ends

        console.log("start was invoked and we made it to the end of setting visuals and making event listener!")


        // here we jump into the game loop!
        console.log("next we're trying to invoke startingLoop() which in turn invokes the gameLoop")
        this.startingLoop();
        console.log("this is coming after invoking startingLoop()")
    }

    startingLoop() {
        // tässä loopissa pitäis kattoo kelloo ja jos aikaa on vielä, jatkaa peliä!


        // i should have recursive structure def func loop .... invoke loop()
        const gameLoop = function () {
            let testArrow;
            // start making arrows



            // stealing this spawning condition, might tweak later
            if (Math.random() > 0.98) {
                // random arrowtype
                let arrowLotto = ["left", "right"];
                let randomArrow = arrowLotto[(Math.round(Math.random() * (arrowLotto.length - 1)))]; // referencing by index
                const newArrow = new Arrow(this.canvas, randomArrow, 5);
                this.arrows.push(newArrow);

            }

            // we're not looping thru this arrow array

            console.log(this.arrows);


            if (this.arrows.length === 0) {
                testArrow = new Arrow(this.canvas, "left", 3);
                this.arrows.push(testArrow);
            }
            // we need just 1

            testArrow = this.arrows[0];

            testArrow.updatePosition();

            // did the arrow hit the box
            // did we hit the right key then?
            if (testArrow.boxCollision() === true) {
                testArrow.isAligned = true; // CHANGED THIS TO HILIGHT A HIT
                console.log("we hit something!")
            } else {
                // we have to assign the alignment property to false
                testArrow.isAligned = false;
            }



            // clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // then draw stuff
            // no point really giving these names but its more descriptive
            let leftBox = this.drawBox(20); // just give the x-axis position here, the rest is preset inside drawBox()
            let middleBox = this.drawBox(60);
            let rightBox = this.drawBox(100);
            testArrow.draw();

            // we dont have a timer yet but.. let's make it somehow happen
            this.timer++;
            if (this.timer > 300) {
                this.gameOver();
            } // keskekn!!!
            else if (this.timer % 10 === 0) {
                console.log(this.timer);
            }

            // if the game has not ended, keep loopin
            if (this.timeIsUp === false) {
                requestAnimationFrame(gameLoop);
            }

        }.bind(this); // _this bound to game element, right?
        // now we have to invoke the gameLoop so that we enter it once and can exit it from within
        gameLoop();
    }
    // this one is called from keyPresslistener and it should do diff things depending on the keypress
    keyPressMatchesArrow(arrowtype) { // left, right, up, down
        // arrow know its type ("left")
        console.log(`what is this??? this: ${this}`);
        if (arrowtype === "left") {
            // do something
            // if there is a "left" arrow with state "isAligned" we should give player points
            console.log("left key was pressed");
            if (this.arrows[0].isAligned === true) { // now this only works if I know where exavtly it is...
                console.log("you get a point!");
                console.log(`how about this this???: ${this}`);
                this.score++;
            }
        }
    }

    gameOver() {
        // we should export the score from here!
        this.timeIsUp = true;
        console.log("Time is up!!! we're in class Game, method gameOver!!");
        // let's call screen transition from main
        endGame(this.score);
    }

    drawBox(box_x) { // this is only called in the beginning and the boxes disappera when gameloop cleans the canvas
        // box size is hardcoded here
        // box_y is hardcoded here
        //console.log("helllooooo?? do we ever get here??????????");

        const size = 30;
        const box_y = 200;

        this.ctx.fillStyle = "black";
        //syntax: ctx.fillRect(x, y, width, height)
        this.ctx.fillRect(box_x, box_y, size, size);
    }


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