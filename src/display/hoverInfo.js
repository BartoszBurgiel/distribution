
// Hover info creates a small window with data about a 
// chosen bar
export default class HoverInfo {
    constructor(bars, p) {
        this.bars = bars
        this.p = p
    }

    showHoverWindow = () => {
        // Check x-Axis
        if (this.p.mouseX >= 30 && this.p.mouseX <= 700) {

            // Check y-Axis
            if (this.p.mouseY <= 300 && this.p.mouseY >= 100) {

                // Iterate over bars 
                this.bars.forEach(element => {

                    // Check x-range
                    if (this.p.mouseX >= element.xPos && this.p.mouseX <= element.xPos + element.width) {

                        // Display only if hover over bar
                        if (this.p.mouseY >= 300 - element.height) {

                            this.p.fill(255)

                            // Draw window
                            this.p.rect(550, 20, 100, 20)

                            this.p.fill(0)
                            
                            // Label 
                            this.p.text('P(' + element.k + ') = ' + Math.round(element.prop * 10000) / 100 + '%', 560, 32.5)
                        }
                    }
                });
            }
        }
    }
}