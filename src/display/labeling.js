// This class provides labels for the x and y axies
export default class Labeling {
    constructor(p, graph) {
        this.p = p
        this.graph = graph
    }

    xAxisNormal = (range) => {
        this.p.line(this.graph.xPos, this.graph.yPos, this.graph.xPos + this.graph.width, this.graph.yPos)
        this.p.noStroke()

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

    xAxisNormalSteps = (range, n, i) => {
        return this.p.map(((range / n) / this.graph.width) * this.p.map(i, 0, range, 0, this.graph.width), 0, range / n, 0, this.graph.width)
    }

    labelXAxis = (n, i) => {
        this.p.noStroke()
        // Display bar's label
        if (n < 40) {

            // If bigger than 9 adjust -> 2 digits are wider -> misaligment
            if (i > 9) {
                this.p.text(i, this.graph.xPos - 4, this.graph.yPos)
            } else {
                this.p.text(i, this.graph.xPos, this.graph.yPos)
            }
        } else if (n < 99) {

            // Display every fifth
            if (i % 5 === 0) {
                this.p.text(i, this.graph.xPos - 4, this.graph.yPos)
            }
        } else {
            // Display every tenth
            if (i % 10 === 0) {
                this.p.text(i, this.graph.xPos - 4, this.graph.yPos)
            }
        }
        this.p.stroke(0)
    }

    labelYAxis = (yRange) => {

        // Axis line
        this.p.strokeWeight(1.5)
        this.p.stroke(0)
        this.p.line(this.graph.xPos, this.graph.yPos, this.graph.xPos, this.graph.height)
        this.p.strokeWeight(1)

        this.p.noStroke()

        // Upper bond label 
        this.p.text(Math.round(yRange * 100) + '%', this.graph.xPos - 45, this.graph.yPos + 10)

        // Add inbetween steps
        if (yRange <= 0.2) {
            this.inbetweenSteps(this.graph.xPos, this.graph.width, this.graph.height, 6, yRange, this.graph.yPos + 10)
        } else if (yRange > 0.2 && yRange < 0.4) {
            this.inbetweenSteps(this.graph.xPos, this.graph.width, this.graph.height, 5, yRange, this.graph.yPos + 10)
        } else if (yRange >= 0.4 && yRange < 0.6) {
            this.inbetweenSteps(this.graph.xPos, this.graph.width, this.graph.height, 4, yRange, this.graph.yPos + 10)
        } else if (yRange >= 0.6) {
            this.inbetweenSteps(this.graph.xPos, this.graph.width, this.graph.height, 3, yRange, this.graph.yPos + 10)
        } else if (yRange > 0.6) {
            this.inbetweenSteps(this.graph.xPos, this.graph.width, this.graph.height, 2, yRange, this.graph.yPos + 10)
        }

        this.p.stroke(0)
    }

    inbetweenSteps = (n, yRange, upperBond) => {
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
            this.p.line(this.graph.xPos, stepPropPos, this.graph.xPos + this.graph.width, stepPropPos)
            this.p.strokeWeight(1)
        }
    }

    // Draw line representing the Ā - interval
    markAlphaRange = (yAxisBegin ,begin, end, k, n, alpha) => {
        // Mark Alpha

        // Color line 
        this.p.strokeWeight(2)
        this.p.stroke("#56FE34")

        //Draw opposite A line
        this.p.line(begin, this.graph.yPos, begin+(this.graph.width*k), this.graph.yPos)

        // Draw x - axis marker
        this.p.stroke(150)
        this.p.line(begin +(this.graph.width*k), this.graph.yPos, begin + (this.graph.width*k), this.graph.yPos + this.graph.height)


        // Draw A line
        this.p.stroke("#FE8734")
        this.p.line(begin+(this.graph.width*k), this.graph.yPos, end, this.graph.yPos)
        
        // draw y-axis marker
        this.p.stroke(150)

        let tempYPos = this.p.map(alpha, 0, 1, yAxisBegin+this.graph.height-(yAxisBegin-this.graph.yPos), yAxisBegin)
        this.p.line(begin, tempYPos, begin+(this.graph.width*k), tempYPos) 

        // Reset
        this.p.strokeWeight(1)
        
        // Label
        this.p.noStroke()
        this.p.textSize(18)
        this.p.text("P(X≤k) < α = [0;"+k+"]",begin + ((this.graph.width*k)/2)-50, this.graph.yPos - 10)

        // x-coordinates
        // half of the width of the line
        let AxCoords = (this.graph.width * (n-k))/2
        
        // add the end of the opposite A line
        AxCoords += begin + this.graph.width*k

        // add margin
        AxCoords -= 50

        this.p.text("P(X≤k) > α = ["+(k+1)+";"+n+"]", AxCoords, this.graph.yPos - 10)
        this.p.stroke(0)
    }

    // Mark interval marks a given interval with two lines 
    markInterval = (x1, x2, label, col, limX, limY) => {

        this.p.fill(col)
        this.p.noStroke()
        

        if (x1>limX && x2 < limY)
        // Draw rect
        this.p.rect(x1, this.graph.yPos, x2-x1, this.graph.height)

        // Reset fill and stroke
        this.p.fill(0)
        this.p.stroke(1)
    }
}