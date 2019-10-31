export default class Bar {

    constructor(xPos, yPos, width, height, prop, k) {

        // Position on canvas
        this.xPos = xPos
        this.yPos = yPos

        // Dimensions
        this.width = width
        this.height = height
    
        // Bar data
        this.prop = prop
        this.k = k
    }

    // Draw a rect according to Bar attributes
    display(p) {
        p.fill(255)
        p.rect(this.xPos, this.yPos, this.width, -this.height)
        p.fill(0)
    }
}