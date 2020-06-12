"use strict"

class Game {
    constructor() {
        this.arrows = []; // holds arrow objects
        this.timeIsUp = false;
        this.timer = 1600; // it's a fake! just counting animation frames lol
        this.score = 0;
        this.gameScreen = null;
        this.canvas = null;
        this.ctx = null;
        this.left_x = null; // changed to null from set x -values, maybe can remove this?
        this.middle_x = null;
        this.right_x = null;
        this.boxSize = 60;
        //this.paused = false; // default

    }

    //methods

    // create the game canvas, event listeners and invoke game loop depending on difficulty level (game mode)
    start(mode) {
        // referencing the canvas and setting 2D context
        const canvasCont = document.querySelector(".canvas-container");

        this.canvas = this.gameScreen.querySelector("canvas"); // setting canvas html element as our canvas property
        this.ctx = this.canvas.getContext("2d");

        // score and timer should be assigned here to their respective html elements so their value can be assigned through a var name
        this.scoreElement = this.gameScreen.querySelector(".gamestats .score")
        this.timerElement = this.gameScreen.querySelector(".gamestats .timer")

        // fixing canvas size
        this.containerWidth = canvasCont.clientWidth;
        this.containerHeigth = canvasCont.clientHeight;

        this.canvas.width = this.containerWidth;
        this.widthSixth = (this.containerWidth / 6); // doing this to avoid using pixels so it works for diff. screen sizes
        this.canvas.height = this.containerHeigth;


        // event listeners: (bind to game)
        const keyPressListener = function (event) {
            if (event.key === "ArrowLeft") {
                // func that checks if key press was correct
                this.keyPressMatchesArrow("left")
                //console.log("HEY MOM I'M PRESSING THE LEFT ARROW!");
            }
            else if (event.key === "ArrowRight") {
                this.keyPressMatchesArrow("right");
            }
            else if (event.key === "ArrowUp") {
                this.keyPressMatchesArrow("up");
            }

            /* pause is not a thing yet
            else if (event.key === "ArrowDown") {
                this.togglePause();
                console.log(`is paused: ${this.paused}`)
            } */

        }.bind(this); // bound to game object! (instead of window)

        document.addEventListener("keydown", keyPressListener); // should be checked continually until key press ends
        //console.log("next we're trying to invoke startGameLoop() which in turn invokes the gameLoop")

        // starting game loop, finally!
        // condition for game mode:
        if (mode === "hard") {
            this.startGameLoop("hard")
        }
        else if (mode === "swap") {
            this.startGameLoop(mode)
        }
        else {
            this.startGameLoop("normal");
        }
        //console.log("this is coming after invoking startGameLoop()")
    }

    // create new arrows and give them a velocity value depending on fiddiculty level
    createArrows(speed) {
        let arrowLotto = ["left", "right", "up"];
        // statistics ppl look away now, pseudo random generator
        let randomArrow = arrowLotto[(Math.round(Math.random() * (arrowLotto.length - 1)))]; // referencing by index
        const newArrow = new Arrow(this.canvas, randomArrow, speed);
        this.arrows.push(newArrow);
    }

    // did this in 2 min, new game mode UNDER CONSTUCTION
    createSwapArrows(speed) {
        let arrowLotto = ["left", "right"];
        // statistics ppl look away now
        let randomArrow = arrowLotto[(Math.round(Math.random() * (arrowLotto.length - 1)))]; // referencing by index
        const newArrow = new Arrow(this.canvas, randomArrow, speed);
        this.arrows.push(newArrow);
    }

    startGameLoop(gamemode) {
        // recursive structure creating a game loop, bind()ing it to the game object and then calling itself

        // set arrow speed depending on difficulty level
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
            speed = 10; //fallback if all else fails :D
        }

        const gameLoop = function () {
            // timer is a countdown
            this.timerElement.innerHTML = this.timer;

            // start making arrows:
            // have a "cooldown" at the end so no new arrows generate (and beginning!)
            // requestanimationframe runs at ~60 Hz -> check every half second if should generate arrows           

            if (this.timer >= 1570 || this.timer <= 80) {
                //chill ~ ~ *cooldown period*
            }
            else if ((this.timer % 30 === 0) && (Math.random() > 0.20)) { // stealing this spawning random condition, might tweak later
                // get arrows of random type:
                if (gamemode !== "swap") {
                    this.createArrows(speed);
                }
                else {
                    // gamemode IS swap
                    this.createSwapArrows(speed);
                }
            }


            // Now looping thru arrow array and updating positions and checking if aligned with hitbox

            // get rid of arrows that are below screen
            const visibleArrows = this.arrows.filter(function (arrow) {
                const visibleArrow = arrow.isOnScreen();
                return visibleArrow;
            })
            this.arrows = visibleArrows;

            // update arrow positions and check if they hit the hitbox
            this.arrows.forEach(arrow => {
                arrow.updatePosition();
                this.arrowAlignedWithBox(arrow); // func definition later
                // _keypress alignment_ isn't checked here, it's defined in game methods and invoked from 
                // keyPressListener that is defined inside start(). Score is updated there as well
            });


            // first clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            //testing for using text as feedback to player (PERFECT, Miss! Good!)
            //this.ctx.font = "30px Arial";
            //this.ctx.fillText("Hello World", middleLane, 450); // hehehe

            // draw on canvas
            // assign lanes to each arrow type and their hitboxes, draw boxes
            // left 1/6, middle 1/2 right 5/6, this.widthSixth
            let leftLane = this.widthSixth - (this.boxSize / 2)
            let middleLane = 3 * this.widthSixth - (this.boxSize / 2)
            let rightLane = 5 * this.widthSixth - (this.boxSize / 2)
            this.drawBox(leftLane); // just give the x-axis position here, the rest is preset inside drawBox()
            /*                this.ctx.fillStyle = "red"
                            this.ctx.font = "Comic Sans MS 30px" huehue
                            this.ctx.fillText("LEFT", leftLane, 500) */
            this.drawBox(middleLane);
            this.drawBox(rightLane);

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


            this.timer--;
            // displaying time!
            this.timerElement.innerHTML = Math.floor(this.timer / 60); // add milliseconds?
            if (this.timer === 0) {
                this.gameOver();
            } // test if time indeed is linear
            else if (this.timer % 10 === 0) {
                //console.log(this.timer);
            }

            // if the game has not ended, keep loopin!
            if (this.timeIsUp === false) {
                requestAnimationFrame(gameLoop);
            }

        }.bind(this); // _this bound to game element
        // now we have to invoke the gameLoop once so that we enter it and can exit it from within
        gameLoop();
    }

    // UNDER CONSTRUCTION, needs implementation in gameLoop
    togglePause() {
        if (this.paused === true) {
            this.paused = false;
        }
        else {
            this.paused = true;
        }
    }

    // checks if the pressed key matches arrow on screen and if the arrow is aligned with its hitbox when the key was pressed
    // invoked from the keypress listener
    keyPressMatchesArrow(arrowtypeStr) {
        this.arrows.forEach(arrow => { // using arrow function so now _this refers to game, as we want it to
            if (arrow.isAligned === true) {

                switch (arrowtypeStr) {
                    case "left":
                        if ((arrow.type === "left") && (arrow.hitOnce !== true)) {
                            arrow.hitOnce = true;
                            this.updateScore(200);
                        }
                        else {
                            this.updateScore(-100);
                        }
                        break; // wont need a default

                    case "right":
                        if ((arrow.type === "right") && (arrow.hitOnce !== true)) {
                            arrow.hitOnce = true;
                            this.updateScore(200);
                        }
                        else {
                            this.updateScore(-100);
                        }
                        break;

                    case "up":
                        if ((arrow.type === "up") && (arrow.hitOnce !== true)) {
                            arrow.hitOnce = true;
                            this.updateScore(200);
                        }
                        else {
                            this.updateScore(-100);
                            //console.log("wrong button1!");
                        }
                        break;
                }
            }
        });
    }

    arrowAlignedWithBox(arrow) {
        if (arrow.boxCollision() === true) {
            arrow.isAligned = true; // HILIGHT A HIT
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

    // ends the game, passes score to gameover screen
    gameOver() {
        this.timeIsUp = true;
        // call screen transition from main
        endGame(this.score);
    }

    // draw boxes so player can estimate when to hit the keys
    drawBox(box_x) {
        // box_y and dimensions are hardcoded here

        // super backlog thing: make the boxes the same colour + shape as arrow so you could see them align    

        const width = 50;
        const height = this.boxSize;
        const box_y = 450; // so the area to hit arrows is 450 ... 510 px on y-axis

        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(box_x, box_y, width, height); //syntax: ctx.fillRect(x, y, width, height)
    }

}

// Class Game... hahmotelma
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


// OLD version of keyPressMatchesArrow
    // this one is called from keyPresslistener and it should do diff things depending on the keypress
    // keyPressMatchesArrowOld(arrowtypeStr) { // left, right, up, down

    //     if (arrowtypeStr === "left") { // if there is a "left" arrow with state "isAligned" we should give player points
    //         this.arrows.forEach(arrow => {
    //             if ((arrow.type === "left") && (arrow.isAligned === true)) {
    //                 console.log("found inside keylistener(start level) inside keypressmatchesArrow(game level), logging: key-matching arrow is aligned with hitbox");
    //                 if (arrow.hitOnce !== true) { // It should be null to begin with
    //                     arrow.hitOnce = true;
    //                     this.updateScore(200);
    //                 }
    //             }
    //         });
    //     }
    //     // else if other type arrow..
    //     else if (arrowtypeStr === "right") {
    //         this.arrows.forEach(arrow => {
    //             if ((arrow.type === "right") && (arrow.isAligned === true)) {
    //                 if (arrow.hitOnce !== true) {
    //                     arrow.hitOnce = true;
    //                     this.updateScore(200);
    //                 }
    //                 console.log("giving 200 pts for hitting right arrow at right time")
    //             }
    //             /*else if ( (arrow.type === "right") && (arrow.isAligned === false) ) {
    //                 console.log("missed it! minus points")
    //                 this.score -= 100;
    //             }*/
    //         });
    //     }
    //     else if (arrowtypeStr === "up") {
    //         this.arrows.forEach(arrow => {
    //             if ((arrow.type === "up") && (arrow.isAligned === true)) {
    //                 if (arrow.hitOnce !== true) {
    //                     arrow.hitOnce = true;
    //                     this.updateScore(200);
    //                 }
    //                 console.log("giving pts for hitting UP")
    //             }
    //         });
    //     }
    // }