/*
properties:
canvas
ctx
size
arrowType (up, down, left, right)
image
position x (depends on arrowType)
position y
speed

methods:
update position
draw image
amIonScreen

*/

class Arrow {
    constructor(canvas, type, speed) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.size = 50;
        this.y = 0;
        // x is determined by type, same as fillcolour
        this.x = null; // this is set in draw() depending on arrow type! x is not important otherwise
        this.speed = speed;
        this.type = type;
        this.image = new Image();
        this.image.src = "img/test.png" // just make this null?
        this.isAligned = null; // aligned with hitbox true/false -> changes colour + used to give pts
        this.hitOnce = null; // to make sure we don't score twice for same arrow
    }
    //methods:

    
    updatePosition() {
        this.y = this.y + this.speed;
    }

    draw(lane) {

        let colour; // depends on arrrow type
        //change arrow colour if it is hit, else it's default colour
        if (this.hitOnce === true) { // was: this.isAligned === true (kinda cool behaviour, maybe implement it again somehow?)
            if (this.type === "left") {
                this.image.src = "img/left-invert.png"
            } else if (this.type === "right") {
                this.image.src = "img/right-invert.png"
            } else if (this.type === "up") {
                this.image.src = "img/up-invert.png"
            }

            //colour = "yellow";
            // doesnt x persist from before?? -> it does. also, omitting x should never be an issue since no arrow is aligned in the beginning
        } else {

            if (this.type === "left") {
                //colour = "red"; // change this.image.srs = "image/different.png"
                this.image.src = "img/left.png"
                this.x = lane;
            }
            else if (this.type === "right") {
                //colour = "green"
                this.image.src = "img/right.png"
                this.x = lane;
            }

            else if (this.type === "up") {
                //colour = "blue";
                this.image.src = "img/up.png"
                this.x = lane;
            }

            else {
                console.log("arrow type may not be passing correct! debug message from arrow.draw(lane), not drawing anything!");
                return;
            }
        }
        // drawing boxes to represent falling arrows
        //this.ctx.fillStyle = colour;
        //this.ctx.fillRect(this.x, this.y, this.size + 10, this.size);

        this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
    }

    // checks if the arrow is within set hit y-range, as in, did it collide with the hit box
    // returns boolean
    boxCollision() { 
        // suggestion! add an accuracy range for scoring!
        let top = this.y;
        let bottom = top + this.size;
        // x depends on arrrow type, we don't need to check for x-colliosion, only need it for drawing
        // collision range for y is same for every arrow
        if ((bottom >= 450) && (top <= 510)) {
            switch (true) { // checking if the arrow is completely inside the hit area!
                case this.type === "left":
                    // hit the left box!
                    //console.log("left arrow hit the hit area")
                    //console.log(`my y is ${this.y}, top:${top}  and bottom ${bottom}`)

                    //this.ctx.fillStyle = "yellow"
                    //this.ctx.fillRect(this.x, top, 100, 100)

                    return true; // we could return  something additionally here so that we can tell the hit box to light up!
                    // like collisionArr = [boolean, accuracyGoodness]
                case this.type === "right":
                    //console.log("right arrow hit the hit area!")
                    return true;
                case this.type === "up":
                    return true;
                default:
                    return false;
            }
        }
    }

    // check if y > lower limit of screen
    isOnScreen() {
        if (this.y < this.canvas.height) {
            return true;
        }

    }
}