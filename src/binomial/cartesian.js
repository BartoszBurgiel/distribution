export default class Cartesian {

    // xPos and yPos define the absolute position on the p5 canvas
    // height and width are the dimensions of the Cartesian object 
    // x/yMinRange and x/yMaxRange determine the interval in which the coordinate system spans 
    constructor(xPos, yPos, height, width, xMinRange, xMaxRange, yMinRange, yMaxRange, p) {
        this.p = p
        this.xPos = xPos
        this.yPos = yPos

        this.height = height
        this.width = width
        
        this.xMinRange = xMinRange
        this.yMinRange = yMinRange

        this.xMaxRange = xMaxRange
        this.yMaxRange = yMaxRange

        this.createCartesian()
    }
    
    // Assemble coordinate system -> draw axies 
    createCartesian = () => {

        this.p.strokeWeight(2)

        // y - axis
        // check if must span below zero
        if (this.yMinRange <= 0) {
            this.p.line((this.width / 2), 0, (this.width / 2), this.height)
        } else {            
            this.p.line(0, 0, 0, this.height)
        }

        // x - axis
        // check if must span below zero
        if (this.xMinRange <= 0) {
            this.p.line(0, this.height/2, this.width, this.height/2)
        } else {            
            this.p.line(0, 0, this.width, 0)
        }

        this.p.strokeWeight(1)
    }
}
