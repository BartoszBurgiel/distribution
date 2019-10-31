export default class Bar {

    constructor(xPos, yPos, width, height) {
        this.xPos = xPos
        this.yPos = yPos
        this.width = width
        this.height = height
    }

    display(p) {
        p.fill(255)
        p.rect(this.xPos, this.yPos, this.width, -this.height)
        p.fill(0)
    }
}