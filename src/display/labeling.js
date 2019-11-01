// This class provides labels for the x and y axies
export default class Labeling {
    constructor(p) {
        this.p = p
    }

    labelXAxis = (n, i, bar) => {
        // Display bar's label
        if (n < 40) {

            // If bigger than 9 adjust -> 2 digits are wider -> misaligment
            if (i > 9) {
                this.p.text(i, bar.xPos + bar.width / 2 - 4, bar.yPos + 20)
            } else {
                this.p.text(i, bar.xPos + bar.width / 2, bar.yPos + 20)
            }
        } else if (n < 100) {

            // Display every fifth
            if (i % 5 === 0) {
                this.p.text(i, bar.xPos + bar.width / 2 - 4, bar.yPos + 20)
            }
        } else {

            // Display every tenth
            if (i % 10 === 0) {
                this.p.text(i, bar.xPos + bar.width / 2 - 8, bar.yPos + 20)
            }
        }
    }

    labelYAxis = (xPos, yPos, height, maxProp) => {
        
        // Axis line
        this.p.strokeWeight(1.5)
        this.p.line(xPos, yPos,xPos, height)
        this.p.strokeWeight(1)

        // Upper bond label 
        this.p.text('100%', xPos - 45 , yPos + 10)

        // Highest propability stamp

        let maxPropPos = yPos + height-this.p.map(maxProp, 0, 1, yPos, height)
        this.p.text(Math.round(maxProp * 1000) / 10+'%', xPos - 45, maxPropPos)

        // Add inbetween steps
        if (maxProp > 0.2 && maxProp < 0.4) {
            this.inbetweenSteps(xPos, yPos, height, 3, maxProp, maxPropPos)
        } else if (maxProp >= 0.4 && maxProp < 0.6) {            
            this.inbetweenSteps(xPos, yPos, height, 4, maxProp, maxPropPos)
        } else if (maxProp >= 0.6) {            
            this.inbetweenSteps(xPos, yPos, height, 5, maxProp, maxPropPos)
        }
    }
    
    inbetweenSteps = (xPos, yPos, height, n, maxProp, maxPropPos) => {
        for(let i = 0; i<n;i++) {
            // Propability of the step
            let stepProp = Math.round(this.p.map(i, 0, n, 0, maxProp) * 1000)/10

            // Percentage labels
            this.p.text(stepProp + '%', xPos-45, this.p.map(i, 0, n, height, maxPropPos))
            
            // Lines
        }
    }
}