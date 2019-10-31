export default class Bar {

    constructor(xPos, yPos, width, height) {
        this.position = {
            x = xPos,
            y = yPos 
        }

        this.dimensions = {
            width,
            height
        }
    }

    display(p) {
        p.fill(255)
        p.rect(this.position.x, this.position.y, this.dimensions.width, -this.dimensions.height)
        p.fill(0)
    }
}