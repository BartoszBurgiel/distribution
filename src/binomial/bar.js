export default class Bar {

    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }

    display() {
        fill(255);
        rect(this.xPos, this.yPos, this.width, -this.height);
    }
}