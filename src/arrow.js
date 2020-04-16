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
        this.size = 50;
        this.y = 0;
        // x is determined by type, same as fillcolour
        this.speed = speed;
        this.type = type;
        this.image = new Image();
        this.image.src = "img/right.png"
        this.isAligned = null; // aligned with hitbox true/false -> changes colour + used to give pts
        this.x = null; // this is set in draw() depending on arrow type! x is not important otherwise
        // experimental part: (to make sure we don't score twice for same arrow)
        this.hitOnce = null;
    }
    //methods:
    updatePosition() {
        this.y = this.y + this.speed;
        //console.log("updatePosotion() called")
    }

    draw(lane) {
        //maybe we could set here that if the type is "belowScreen", just return or something. or remove it in the array? not update position?
        // -> decide later, not important now
        let colour;
        // depends on arrrow type
        if (this.hitOnce === true) { // was: this.isAligned === true
            colour = "yellow";
            // doesnt x persist from before?? -> it does. also, omitting x should never be an issue since no arrow is aligned in the beginning
        } else {

            if (this.type === "left") {
                colour = "red";
                this.x = lane;
            }
            else if (this.type === "right") {
                colour = "green"
                this.x = lane;
            }

            else if (this.type === "up") {
                colour = "blue";
                this.x = lane;
            }

            else {
                console.log("arrow type may not be passing correct! not gonna draw anything new :P");
                return;
            }
        }
        //console.log(this.y);
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(this.x, this.y, this.size + 10, this.size);
        //this.ctx.drawImage(this.x, this.y, this.size, this.size)
    }

    boxCollision() { // this method could also update the game.js arrowbox????
        let top = this.y;
        let bottom = top + this.size;
        // x depends on arrrow type, we don't need to check for x-colliosion, only need it for drawing
        // collision range for y should be same
        if ((bottom >= 450) && (top <= 510)) {
            switch (true) { // checking if the arrow is completely inside the hit area!
                case this.type === "left":
                    // hit the left box!
                    //console.log("left arrow hit the hit area")
                    //console.log(`my y is ${this.y}, top:${top}  and bottom ${bottom}`)
                    return true; // we could return  something additionally here so that we can tell the hit box to light up!
                case this.type === "right":
                    //console.log("right arrow hit the hit area!")
                    return true;
                case this.type === "up":
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

    isOnScreen() {
        // check if y>lower limit of screen
        //return true/false
        if (this.y < this.canvas.height) {
            return true;
        }

    }
    //    this.ctx.fillStyle = "blue";
    //      this.ctx.fillRect(this.x, this.y, this.size, this.size);
}