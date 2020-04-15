"use strict"

class Game {
    constructor() {
        this.arrows = []; // holds arrow objects
        //this.arrowBoxes = []; // dont really need this atm
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
                this.keyPressMatchesArrow("left") // sending info on what key was pressed to this function
                //console.log("HEY MOM I'M PRESSING THE LEFT ARROW!");
            }
            else if (event.key === "ArrowRight") {
                this.keyPressMatchesArrow("right");
                //console.log("right key pressed timely!");
            }

            /*else {// maybe just not have this block at all ?????
                this.keyPressMatchesArrow("WRONG")
                console.log("hey dont go pressing those buttons just whenever");
            } */


        }.bind(this); // bound to game object! (instead of window)

        document.addEventListener("keydown", keyPressListener); // should be checked continually until key press ends

        console.log("start was invoked and we made it to the end of setting visuals and making event listener!")


        // here we jump into the game loop!
        console.log("next we're trying to invoke startGameLoop() which in turn invokes the gameLoop")
        this.startGameLoop();
        console.log("this is coming after invoking startGameLoop()")
    }

    startGameLoop() {
        // recursive structure creating a game loop, bind()ing it to the game object and then calling itself

        const gameLoop = function () {

            // start making arrows:
            // maybe dont make new arrows when we're close to time running out
            // DAMMIT JUST REALISED THIS COULD/SHOULD BE TIED TO THE TIMER (or its modulo 60 or somethignn)

            // requestanimationframe runs at ~60 Hz -> check every half second if should generate arrows

            
                
            if ((this.timer % 30 === 0) && (Math.random() > 0.40)) { // stealing this spawning condition, might tweak later
                // random arrowtype:
                let arrowLotto = ["left", "right"];
                // statistics ppl look away now
                let randomArrow = arrowLotto[(Math.round(Math.random() * (arrowLotto.length - 1)))]; // referencing by index
                const newArrow = new Arrow(this.canvas, randomArrow, 10);
                this.arrows.push(newArrow);
                
            }

            //testArrow = this.arrows[0];
            //testArrow.updatePosition();

            /*
            if (testArrow.boxCollision() === true) {
                testArrow.isAligned = true; // CHANGED THIS TO HILIGHT A HIT
                console.log("we hit something!")
            } else {
                // we have to assign the alignment property to false
                testArrow.isAligned = false;
            }*/
            // -> this is naw arrowAlignedWithBox(takes in arrow)

            // HERE looping thru arrow array and updating position and checking if aligned


            // get rid of arrows that are below screen
            const visibleArrows = this.arrows.filter( function (arrow) {
                const visibleArrow = arrow.isOnScreen();
                return visibleArrow;
            } )
            this.arrows = visibleArrows;

            // update arrow positions and check if they hit the hitbox
            this.arrows.forEach(arrow => { // added this!
                arrow.updatePosition();
                this.arrowAlignedWithBox(arrow); // this????
                // keypress alignment isn't checked here, it's defined in game methods and invoked from 
                // keyPressListener that is defined inside start(). Score is updated there as well
            });


            // clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // draw on canvas
            // no point really giving these names but its more descriptive
            let leftBox = this.drawBox(50); // just give the x-axis position here, the rest is preset inside drawBox()
            let middleBox = this.drawBox(200);
            let rightBox = this.drawBox(400);
            //testArrow.draw();
            // forEach arrow THAT IS ON SCREEN, draw()

            this.arrows.forEach(arrow => { // added this keywd!
                arrow.draw();
            });

            // we dont have a timer yet but.. let's make it somehow happen
            this.timer++;
            if (this.timer >= 800) {
                this.gameOver();
            } // keskekn!!!
            else if (this.timer % 10 === 0) {
                //console.log(this.timer);
                //this.score++; // Hey! Hey you! YEah you, remove this! IT's just to test if the dom shit works
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
    keyPressMatchesArrow(arrowtypeStr) { // left, right, up, down

        if (arrowtypeStr === "left") { // if there is a "left" arrow with state "isAligned" we should give player points
            this.arrows.forEach(arrow => {
                if ((arrow.type === "left") && (arrow.isAligned === true)) {
                    console.log("found inside keylistener(start level) inside keypressmatchesArrow(game level), logging: key-matching arrow is aligned with hitbox");
                    this.updateScore(200);
                }
                // tried doing else block, failed :D              
            });
        }
        // else if other type arrow..
        else if (arrowtypeStr === "right") {
            this.arrows.forEach(arrow => {
                if ((arrow.type === "right") && (arrow.isAligned === true)) {
                    this.updateScore(200);
                    console.log("giving 200 pts for hitting right arrow at right time")
                }
                /*else if ( (arrow.type === "right") && (arrow.isAligned === false) ) {
                    console.log("missed it! minus points")
                    this.score -= 100;
                }*/
            });
        }
        /*else {
            console.log("what the heck are u pressing \n i should reduce your points..... ")
        }*/
    }

    arrowAlignedWithBox(arrow) {
        if (arrow.boxCollision() === true) {
            arrow.isAligned = true; // CHANGED THIS TO HILIGHT A HIT
            //console.log("an arrow hit the y-limit")
        } else {
            // we have to assign the alignment property to false
            arrow.isAligned = false;
        }
    }

    // method for updating score??    
    updateScore(givenScore) {
        this.score += givenScore;
        this.scoreElement.innerHTML = this.score;
    }

    gameOver() {
        // we should export the score from here!
        this.timeIsUp = true;
        console.log("Time is up!!! we're in class Game, method gameOver!!");
        // let's call screen transition from main
        endGame(this.score);
    }

    drawBox(box_x) { // this is only optics
        // box_y and dimensions are hardcoded here

        const width = 60;
        const height = 60;
        const box_y = 500; // so the area to hit arrows is 500 ... 560 px on y-axis

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(box_x, box_y, width, height); //syntax: ctx.fillRect(x, y, width, height)
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