// This class provides labels for the x and y axies
export default class Labeling {
    constructor(p, graph) {
        this.p = p
        this.graph = graph
    }

    // Label the x axis for the normal distribution
    xAxisNormal = (range) => {

        // Draw the axis line 
        this.p.line(this.graph.xPos, this.graph.height, this.graph.endX, this.graph.height)
        this.p.noStroke()

        // Iterate over range
        for (let i = 0; i < range; i++) {

            if(range < 20) {
                this.p.text(i, this.graph.xPos - 8 + this.xAxisNormalSteps(range, 25, this.graph.width, i), this.graph.yPos + 20)
            } else if (range < 50) {
                
                // Display every 5th
                if (i % 5 === 0) {
                    this.p.text(i, this.graph.xPos - 8 + this.xAxisNormalSteps(range, 25, this.graph.width, i), this.graph.yPos + 20)
                }
            } else if (range < 100) {

                // Display every 10th
                if (i % 10 === 0) {
                    this.p.text(i, this.graph.xPos - 8 + this.xAxisNormalSteps(range, 25, this.graph.width, i), this.graph.yPos + 20)
                }
            } else if (range < 250) {


                // Display every 25th
                if (i % 50 === 0) {
                    this.p.text(i, this.graph.xPos - 8 + this.xAxisNormalSteps(range, 25, this.graph.width, i), this.graph.yPos + 20)
                }
            } else if (range > 250) {
                if (i % parseInt(range/5) === 0) {
                    this.p.text(i, this.graph.xPos - 8 + this.xAxisNormalSteps(range, 25, this.graph.width, i), this.graph.yPos + 20)
                }
            }
        }
    }

    // Calculate the position of the inbetween steps for the x axis labeling in normal distribution
    xAxisNormalSteps = (range, n, i) => {

        // map the size of one number * the mapped index of the number to the width of the graph
        return this.p.map(((range / n) / this.graph.width) * this.p.map(i, 0, range, 0, this.graph.width), 0, range / n, 0, this.graph.width)
    }

    // Label x axis based on current index, the range of the x axis and the absolute x position
    labelXAxis = (n, i, xPos) => {
        this.p.noStroke()
        // Display bar's label
        if (n < 40) {

            // If bigger than 9 adjust -> 2 digits are wider -> misaligment
            if (i > 9) {
                this.p.text(i, xPos - 4, this.graph.endY - 10)
            } else {
                this.p.text(i, xPos, this.graph.endY - 10)
            }
        } else if (n < 99) {

            // Display every fifth
            if (i % 5 === 0) {
                this.p.text(i, xPos - 4, this.graph.endY - 10)
            }
        } else {
            // Display every tenth
            if (i % 10 === 0) {
                this.p.text(i, xPos - 4, this.graph.endY - 10)
            }
        }
        this.p.stroke(0)
    }

    // Label the y axis based on given y-range
    labelYAxis = (yRange) => {

        // Axis line
        this.p.strokeWeight(1.5)
        this.p.stroke(0)
        this.p.line(this.graph.xPos, this.graph.yPos, this.graph.xPos, this.graph.height)
        this.p.strokeWeight(1)

        this.p.noStroke()

        // Upper bond label 
        this.p.text(Math.round(yRange * 100) + '%', this.graph.xPos - 45, this.graph.yPos + 10)

        // Number of the inbetween steps
        let n = Math.round(this.p.map(yRange, 0, 1, 6, 2))
        
        // Height limit
        let upperBond = this.graph.yPos + 10


        // Draw all inbetween steps
        for (let i = 0; i < n; i++) {
            // Propability of the step
            let stepProp = Math.round(this.p.map(i, 0, n, 0, yRange) * 1000) / 10
            let stepPropPos = this.p.map(i, 0, n, this.graph.height, upperBond)

            this.p.noStroke()

            // Percentage labels
            this.p.text(stepProp + '%', this.graph.xPos - 45, stepPropPos)

            this.p.stroke(0)

            // Lines
            this.p.strokeWeight(0.5)
            this.p.line(this.graph.xPos, stepPropPos, this.graph.endX, stepPropPos)
        }

        this.p.stroke(0)
    }

    // Mark interval marks a given interval with two lines 
    markInterval = (x1, x2, col, limMin, limMax) => {

        this.p.fill(col)
        this.p.noStroke()

        if (x1 >= limMin && x2 <= limMax) {
            // Draw rect
            this.p.rect(x1, this.graph.yPos, x2-x1, this.graph.height-this.graph.yPos)
        }

        // Reset fill and stroke
        this.p.fill(0)
        this.p.stroke(1)
    }
}