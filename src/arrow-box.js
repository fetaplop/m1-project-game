class ArrowBox {
    constructor(canvas, boxAmount) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.boxAmount = boxAmount;
        // tarvitaan koko, sijainti (tyyppi? miten erotetaan et kuka tää on :D)
        this.size = 10;
        this.y = this.canvas.height / 2; // this should always remain same. but is it pixels?
        this.x = 100;
    }

    // methods

    // luodaan niin monta ku halutaan, right?
    // first let's hardcode this for just 1 arrow-box in the middle of canvas

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.size * 2, this.size);

    }
}