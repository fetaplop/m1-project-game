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

// pitääkö hard-koodata se tietty korkeus ja sen perusteella arvioida, onko arrow "hot" vai "cold"

class Arrow {
    constructor(canvas, type, speed) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d"); // i think we need this
        this.size = 10;
        this.y = 0;
        //this.top = this.y; // for collision
        //this.bottom = this.top + this.size; // for collision
        // x is determined by type, same as fillcolour
        this.speed = speed;
        this.type = type;
        this.isAligned = null;
        this.x = null;
    }
    //methods:
    updatePosition() {
        this.y = this.y + this.speed;
        //console.log("updatePosotion() called")
    }


    draw() {
        //maybe we could set here that if the type is "belowScreen", just return or something. or remove it in the array? not update position?
        // -> decide later, not important now
        let colour;
        // depends on arrrow type
        if (this.isAligned === true) {
            colour = "yellow";
            // doesnt x persist from before??
        } else {

            if (this.type === "left") {
                colour = "red";
                this.x = 50;
            }
            else if (this.type === "right") {
                colour = "green"
                this.x = 150;
            }

            else if (this.type === "up") {
                colour = "blue";
                this.x = 100;
            }

            else {
                console.log("arrow type may not be passing correct! not gonna draw anything new :P");
                return;
            }
        }
        //console.log(this.y);
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    //drawHit() {}

    boxCollision() { // this method could also update the game.js arrowbox????
        let top = this.y;
        let bottom = top + this.size;
        // x depends on arrrow type, we don't need to check for x-colliosion, only need it for drawing
        // collision range for y should be same
        if ((bottom >= 200) && (top <= 300)) {
            switch (true) { // checking if the arrow is completely inside the hit area!
                case this.type === "left":
                    // hit the left box!
                    console.log("left arrow hit the hit area")
                    //console.log(`my y is ${this.y}, top:${top}  and bottom ${bottom}`)
                    return true; // we could return  something additionally here so that we can tell the hit box to light up!
                case this.type === "right":
                    console.log("right arrow hit the hit area!")
                    return true;
                default:
                    return false;
            }
        }

        /*switch(expression) {
            case x:
              // code block
              break;
            case y:
              // code block
              break;
            default:
              // code block
          }*/

    }

    amIonScreen() {
        // check if y>lower limit of screen
        //return true/false
    }
    //    this.ctx.fillStyle = "blue";
    //      this.ctx.fillRect(this.x, this.y, this.size, this.size);
}