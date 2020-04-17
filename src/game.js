"use strict"

class Game {
    constructor() {
        this.arrows = []; // holds arrow objects
        //this.arrowBoxes = []; // dont really need this atm
        this.timeIsUp = false; // teenkö timerin erikseen???
        this.timer = 1600; // it's a fake! just counting animation frames lol
        this.score = 0;
        this.gameScreen = null;
        this.canvas = null;
        this.ctx = null;
        this.left_x = null; // changed to null from set x -values, maybe can remove this
        this.middle_x = null;
        this.right_x = null;
        this.boxSize = 60;
        //this.paused = false; // default

    }

    //methods
    start(mode) { // this will literally just start the game, later will come the game loop where we update canvas all the time
        // referencing the canvas and setting 2D context
        const canvasCont = document.querySelector(".canvas-container");
        console.log("check out canvasCont console log:")
        console.log(canvasCont)
        this.canvas = this.gameScreen.querySelector("canvas"); // setting canvas html element as our canvas property
        this.ctx = this.canvas.getContext("2d"); // just like the example

        // score and timer should be assigned here to their respective html elements so their value can be assigned through a var name
        this.scoreElement = this.gameScreen.querySelector(".gamestats .score") // why do we not use "let this.scoreElemen.... ?""
        this.timerElement = this.gameScreen.querySelector(".gamestats .timer") // addinf the countdown

        // fixing canvas size, check later if ok
        // what how huh ???? 
        this.containerWidth = canvasCont.clientWidth;
        // this will be used to define x-alignment:
        this.containerHeigth = canvasCont.clientHeight;
        
        this.canvas.width = this.containerWidth;
        this.widthSixth = (this.containerWidth / 6);
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

            else if (event.key === "ArrowUp") {
                this.keyPressMatchesArrow("up");
            }

            /*
            else if (event.key === "ArrowDown") {
                this.togglePause();
                console.log(`is paused: ${this.paused}`)
            } */
            /* cant make this work, also removed the function, not even the console.log is working
            else if (event.key === "Space") {
                console.log("spaaaaaaeseee")
                this.quitGame("space");
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
        // condition on game mode:
        if (mode === "hard") {
            this.startGameLoop("hard")
        }
        else if (mode === "swap") {
            this.startGameLoop(mode)
        }

        else {
            this.startGameLoop("normal");
        }
        console.log("this is coming after invoking startGameLoop()")
    }

    createArrows(speed) {
        let arrowLotto = ["left", "right", "up"];
        // statistics ppl look away now
        let randomArrow = arrowLotto[(Math.round(Math.random() * (arrowLotto.length - 1)))]; // referencing by index
        const newArrow = new Arrow(this.canvas, randomArrow, speed);
        this.arrows.push(newArrow);

    }
// did this in like 2 min so copypasting...
    createSwapArrows(speed) {
        let arrowLotto = ["left", "right"];
        // statistics ppl look away now
        let randomArrow = arrowLotto[(Math.round(Math.random() * (arrowLotto.length - 1)))]; // referencing by index
        const newArrow = new Arrow(this.canvas, randomArrow, speed);
        this.arrows.push(newArrow);
    }

    startGameLoop(gamemode) { // needs mode
        // recursive structure creating a game loop, bind()ing it to the game object and then calling itself

        // if mode jtn, set speed
        let speed;
        if (gamemode === "hard") {
            speed = 20;
        }
        else if (gamemode === "normal") {
            speed = 10;
        }

        else if (gamemode === "swap") {
            speed = 25;
        }
        else {
            speed = 10; //fallback if all else gails= :D
        }

        const gameLoop = function () {
            this.timerElement.innerHTML = this.timer;

            // start making arrows:
            // maybe dont make new arrows when we're close to time running out?
            // DAMMIT JUST REALISED THIS COULD/SHOULD BE TIED TO THE TIMER (or its modulo 60 or somethignn)

            // requestanimationframe runs at ~60 Hz -> check every half second if should generate arrows           
            if (this.timer >= 1570 || this.timer <= 80) {
                //chill ~ ~ needed a cooldown period
            }
            else if ((this.timer % 30 === 0) && (Math.random() > 0.20)) { // stealing this spawning condition, might tweak later
                // random arrowtype:
                if (gamemode !== "swap") {
                    this.createArrows(speed); // remember to give speed here!
                }
                else {
                    // gamemode IS swap
                    this.createSwapArrows(speed);
                }

            }


            // HERE looping thru arrow array and updating position and checking if aligned


            // get rid of arrows that are below screen
            const visibleArrows = this.arrows.filter(function (arrow) {
                const visibleArrow = arrow.isOnScreen();
                return visibleArrow;
            })
            this.arrows = visibleArrows;

            // update arrow positions and check if they hit the hitbox
            this.arrows.forEach(arrow => {
                arrow.updatePosition();
                this.arrowAlignedWithBox(arrow);
                // keypress alignment isn't checked here, it's defined in game methods and invoked from 
                // keyPressListener that is defined inside start(). Score is updated there as well
            });


            // clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            //this.ctx.font = "30px Arial";
            //this.ctx.fillText("Hello World", middleLane, 450); // hehehe

            // draw on canvas
            // left 1/6, middle 1/2 right 5/6, this.widthSixth
            let leftLane = this.widthSixth - (this.boxSize/2)
            let middleLane = 3 * this.widthSixth - (this.boxSize/2)
            let rightLane = 5 * this.widthSixth - (this.boxSize/2)
            this.drawBox(leftLane); // just give the x-axis position here, the rest is preset inside drawBox()
/*                this.ctx.fillStyle = "red"
                this.ctx.font = "Comic Sans MS 30px"
                this.ctx.fillText("LEFT", leftLane, 500) */
            this.drawBox(middleLane);
            this.drawBox(rightLane);
            //testArrow.draw();
            // forEach arrow THAT IS ON SCREEN, draw()

            this.arrows.forEach(arrow => {
                switch (arrow.type) {
                    case "left":
                        arrow.draw(leftLane);                       
                        break;
                
                    case "right":
                        arrow.draw(rightLane);
                        break;
                    case "up":
                        arrow.draw(middleLane);
                        break;

                }

            });

            // we dont have a timer yet but.. let's make it somehow happen
            this.timer--;
            // displaying time!
            this.timerElement.innerHTML = Math.floor(this.timer / 60); // add milliseconds!
            if (this.timer === 0) {
                this.gameOver();
            } // keskekn!!!
            else if (this.timer % 10 === 0) {
                //console.log(this.timer);
                //this.score++; // Hey! Hey you! YEah you, remove this! IT's just to test if the dom shit works
            }

            // if the game has not ended, keep loopin
            if (this.timeIsUp === false) { // tried to make pausing here but then I jump out of the loop..
                requestAnimationFrame(gameLoop);
            }

        }.bind(this); // _this bound to game element, right?
        // now we have to invoke the gameLoop so that we enter it once and can exit it from within
        gameLoop();
    }

    togglePause() { // this is great, but how to go back to gameloop?
        if (this.paused === true) {
            this.paused = false;
        }
        else {
            this.paused = true;
        }
    }

    keyPressMatchesArrow(arrowtypeStr) {
        this.arrows.forEach(arrow => { // forEach + this is tricky!! using arrow function means that now _this refers to game, as we want it to
            if (arrow.isAligned === true) {
                //tarkista muita asioita
                switch (arrowtypeStr) {
                    case "left":
                        if ((arrow.type === "left") && (arrow.hitOnce !== true)) {
                            arrow.hitOnce = true;
                            console.log("left hit!")
                            this.updateScore(200);
                        }
                        //eiks tää ota nyt huomioon väärät inputit=???
                        else {
                            console.log("you hit left but something else is aligned ??!!")
                            this.updateScore(-100);
                        }
                        break; // wont need a default

                    case "right":
                        if ((arrow.type === "right") && (arrow.hitOnce !== true)) {
                            arrow.hitOnce = true;
                            console.log("you hit right at the right time! points?!?")
                            this.updateScore(200);
                        }
                        else {
                            console.log("you hit right at the wrong time....");
                            this.updateScore(-100);
                        }
                        break;

                    case "up":
                        if ((arrow.type === "up") && (arrow.hitOnce !== true)) {
                            arrow.hitOnce = true;
                            console.log("you hit up! points! yay1");
                            this.updateScore(200);
                        }
                        else {
                            this.updateScore(-100);
                            console.log("wrong button1!");
                        }
                        break;
                }
            }
            /*else if ((arrow.isAligned !== true) && (arrowtypeStr === arrow.type)) {
                console.log("missed!")
                this.updateScore(-10000)} */
            // onko vaarallista antaa tässä heti miiniuspisteitä? else: jos arrow.x matchää x.lanen kans nii sillon "missed!"
        });
    }

    // this one is called from keyPresslistener and it should do diff things depending on the keypress
    keyPressMatchesArrowOld(arrowtypeStr) { // left, right, up, down

        if (arrowtypeStr === "left") { // if there is a "left" arrow with state "isAligned" we should give player points
            this.arrows.forEach(arrow => {
                if ((arrow.type === "left") && (arrow.isAligned === true)) {
                    console.log("found inside keylistener(start level) inside keypressmatchesArrow(game level), logging: key-matching arrow is aligned with hitbox");
                    if (arrow.hitOnce !== true) { // It should be null to begin with
                        arrow.hitOnce = true;
                        this.updateScore(200);
                    }
                }
                // tried doing else block, failed :D 
                /*else if ( (arrow.type == any ) && (arrow.isAligned === false) ) {
                    this.updateScore(-1000);
                } this only checks the current arrow, ignoring everything else... :D */
            });
        }
        // else if other type arrow..
        else if (arrowtypeStr === "right") {
            this.arrows.forEach(arrow => {
                if ((arrow.type === "right") && (arrow.isAligned === true)) {
                    if (arrow.hitOnce !== true) {
                        arrow.hitOnce = true;
                        this.updateScore(200);
                    }
                    console.log("giving 200 pts for hitting right arrow at right time")
                }
                /*else if ( (arrow.type === "right") && (arrow.isAligned === false) ) {
                    console.log("missed it! minus points")
                    this.score -= 100;
                }*/
            });
        }
        else if (arrowtypeStr === "up") {
            this.arrows.forEach(arrow => {
                if ((arrow.type === "up") && (arrow.isAligned === true)) {
                    if (arrow.hitOnce !== true) {
                        arrow.hitOnce = true;
                        this.updateScore(200);
                    }
                    console.log("giving pts for hitting UP")
                }
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
            // we have to assign the alignment property to false since it's null by default (bc clarity!).
            arrow.isAligned = false;
        }
    }

    // method for updating score
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

        // suggestion: make the boxes the same colour as arrow so you could see them align    

        const width = 50; // made it smaller!
        const height = this.boxSize;
        const box_y = 450; // so the area to hit arrows is 450 ... 510 px on y-axis

        this.ctx.fillStyle = "purple";
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