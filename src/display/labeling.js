// This class provides labels for the x and y axies
export default class Labeling {
    constructor(p) {
        this.p = p
    }

    xAxisNormal = (xPos, yPos, width, range) => {
        this.p.line(xPos, yPos, xPos+width, yPos)


        for (let i = 0; i < range; i++) {

            if (range < 250) {

                // Display every tenth
                if (i % 25 === 0) {
                    this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 25, width, i), yPos + 20)
                }
            } else if (range < 500) {

                // Display every 25-th
                if (i % 50 === 0) {
                    this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 50, width, i), yPos + 20)
                }
            } else {
                // Display every 50-th
                if (i % 100 === 0) {
                    this.p.text(i, xPos - 8 + this.xAxisNormalSteps(range, 100, width, i), yPos + 20)
                }
            }
        }
    }

    xAxisNormalSteps = (range, n, width, i) => {
        return this.p.map(((range / n) / width) * this.p.map(i, 0, range, 0, width), 0, range / n, 0, width)
    } 

    labelXAxis = (n, i, xPos, yPos) => {
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
    }

    labelYAxis = (xPos, yPos, width, height, maxProp, yRange) => {

        // Axis line
        this.p.strokeWeight(1.5)
        this.p.line(xPos, yPos, xPos, height)
        this.p.strokeWeight(1)

        // Upper bond label 
        this.p.text(Math.round(yRange*100)+'%', xPos - 45, yPos + 10)
        
        // Highest propability stamp
        let maxPropPos = yPos + height - this.p.map(maxProp, 0, yRange, yPos, height)
        this.p.text(Math.round(maxProp * 1000) / 10 + '%', xPos - 45, maxPropPos)

        if (maxProp > 0.2) {
            // Marking line
            this.p.strokeWeight(0.5)
            this.p.line(xPos, maxPropPos, xPos + width, maxPropPos)
            this.p.strokeWeight(1)
        }

        // Add inbetween steps
        if (maxProp > 0.2 && maxProp < 0.4) {
            this.inbetweenSteps(xPos, width, height, 3, maxProp, maxPropPos)
        } else if (maxProp >= 0.4 && maxProp < 0.6) {
            this.inbetweenSteps(xPos, width, height, 4, maxProp, maxPropPos)
        } else if (maxProp >= 0.6) {
            this.inbetweenSteps(xPos, width, height, 5, maxProp, maxPropPos)
        }
    }

    inbetweenSteps = (xPos, width, height, n, maxProp, maxPropPos) => {
        for (let i = 0; i < n; i++) {
            // Propability of the step
            let stepProp = Math.round(this.p.map(i, 0, n, 0, maxProp) * 1000) / 10
            let stepPropPos = this.p.map(i, 0, n, height, maxPropPos)
            // Percentage labels
            this.p.text(stepProp + '%', xPos - 45, stepPropPos)

            // Lines
            this.p.strokeWeight(0.5)
            this.p.line(xPos, stepPropPos, xPos + width, stepPropPos)
            this.p.strokeWeight(1)
        }
    }
}