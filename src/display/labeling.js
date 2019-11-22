// This class provides labels for the x and y axies
export default class Labeling {
    constructor(p) {
        this.p = p
    }

    xAxisNormal = (xPos, yPos, width, range) => {
        this.p.line(xPos, yPos, xPos + width, yPos)
        this.p.noStroke()

        for (let i = 0; i < range; i++) {


            if(range < 20) {
                this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 25, width, i), yPos + 20)
            } else if (range < 50) {
                
                // Display every 5th
                if (i % 5 === 0) {
                    this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 25, width, i), yPos + 20)
                }
            } else if (range < 100) {

                // Display every 10th
                if (i % 10 === 0) {
                    this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 25, width, i), yPos + 20)
                }
            } else if (range < 250) {


                // Display every 25th
                if (i % 50 === 0) {
                    this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 25, width, i), yPos + 20)
                }
            } else if (range > 250) {
                if (i % parseInt(range/5) === 0) {
                    this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 25, width, i), yPos + 20)
                }
            }
        }
    }

    xAxisNormalSteps = (range, n, width, i) => {
        return this.p.map(((range / n) / width) * this.p.map(i, 0, range, 0, width), 0, range / n, 0, width)
    }

    labelXAxis = (n, i, xPos, yPos) => {
        this.p.noStroke()
        // Display bar's label
        if (n < 40) {

            // If bigger than 9 adjust -> 2 digits are wider -> misaligment
            if (i > 9) {
                this.p.text(i, xPos - 4, yPos)
            } else {
                this.p.text(i, xPos, yPos)
            }
        } else if (n < 99) {

            // Display every fifth
            if (i % 5 === 0) {
                this.p.text(i, xPos - 4, yPos)
            }
        } else {
            // Display every tenth
            if (i % 10 === 0) {
                this.p.text(i, xPos - 4, yPos)
            }
        }
        this.p.stroke(0)
    }

    labelYAxis = (xPos, yPos, width, height, maxProp, yRange) => {

        // Axis line
        this.p.strokeWeight(1.5)
        this.p.stroke(0)
        this.p.line(xPos, yPos, xPos, height)
        this.p.strokeWeight(1)

        this.p.noStroke()

        // Upper bond label 
        this.p.text(Math.round(yRange * 100) + '%', xPos - 45, yPos + 10)

        // Add inbetween steps
        if (yRange <= 0.2) {
            this.inbetweenSteps(xPos, width, height, 6, yRange, yPos + 10)
        } else if (yRange > 0.2 && yRange < 0.4) {
            this.inbetweenSteps(xPos, width, height, 5, yRange, yPos + 10)
        } else if (yRange >= 0.4 && yRange < 0.6) {
            this.inbetweenSteps(xPos, width, height, 4, yRange, yPos + 10)
        } else if (yRange >= 0.6) {
            this.inbetweenSteps(xPos, width, height, 3, yRange, yPos + 10)
        } else if (yRange > 0.6) {
            this.inbetweenSteps(xPos, width, height, 2, yRange, yPos + 10)
        }

        this.p.stroke(0)
    }

    inbetweenSteps = (xPos, width, height, n, yRange, upperBond) => {
        for (let i = 0; i < n; i++) {
            // Propability of the step
            let stepProp = Math.round(this.p.map(i, 0, n, 0, yRange) * 1000) / 10
            let stepPropPos = this.p.map(i, 0, n, height, upperBond)

            this.p.noStroke()

            // Percentage labels
            this.p.text(stepProp + '%', xPos - 45, stepPropPos)

            this.p.stroke(0)

            // Lines
            this.p.strokeWeight(0.5)
            this.p.line(xPos, stepPropPos, xPos + width, stepPropPos)
            this.p.strokeWeight(1)
        }
    }

    // Draw line representing the Ā - interval
    markAlphaRange = (yPos, yAxisBegin ,begin, width, height, end, k, n, alpha) => {
        // Mark Alpha

        // Color line 
        this.p.strokeWeight(2)
        this.p.stroke("#56FE34")

        //Draw opposite A line
        this.p.line(begin, yPos, begin+(width*k), yPos)

        // Draw x - axis marker
        this.p.stroke(150)
        this.p.line(begin +(width*k), yPos, begin + (width*k), yPos + height)


        // Draw A line
        this.p.stroke("#FE8734")
        this.p.line(begin+(width*k), yPos, end, yPos)
        
        // draw y-axis marker
        this.p.stroke(150)

        let tempYPos = this.p.map(alpha, 0, 1, yAxisBegin+height-(yAxisBegin-yPos), yAxisBegin)
        this.p.line(begin, tempYPos, begin+(width*k), tempYPos) 

        // Reset
        this.p.strokeWeight(1)
        
        // Label
        this.p.noStroke()
        this.p.textSize(18)
        this.p.text("P(X≤k) < α = [0;"+k+"]",begin + ((width*k)/2)-50, yPos - 10)

        // x-coordinates
        // half of the width of the line
        let AxCoords = (width * (n-k))/2
        
        // add the end of the opposite A line
        AxCoords += begin + width*k

        // add margin
        AxCoords -= 50

        this.p.text("P(X≤k) > α = ["+(k+1)+";"+n+"]", AxCoords, yPos - 10)
        this.p.stroke(0)
    }

    // Mark interval marks a given interval with two lines 
    markInterval = (yPos, height, x1, x2, label, col, limX, limY) => {

        this.p.fill(col)
        this.p.noStroke()
        

        if (x1>limX && x2 < limY)
        // Draw rect
        this.p.rect(x1, yPos, x2-x1, height)

        // Reset fill and stroke
        this.p.fill(0)
        this.p.stroke(1)
    }
}