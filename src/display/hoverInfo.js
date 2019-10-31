
// Hover info creates a small window with data about a 
// chosen bar
export default class HoverInfo {
    constructor(bars, p) {
        this.bars = bars
        this.p = p
    } 

    checkIfHoverBars() {
        // Check x-Axis
        if(this.p.mouseX >= 30 && this.p.mouseX <= 600) {
            
            // check y-Axis
            if (this.p.mouseY <= 300 && this.p.mouseY >=200) {
                
                // iterate over bars 
                this.bars.forEach(element => {
                    
                    // check x-range
                    if (this.p.mouseX >= element.xPos && this.p.mouseX <= element.xPos + element.width) {
                        
                        // Display only if hover over bar
                        if (this.p.mouseY >= 300 - element.height) {
                            console.log(element.prop, "hehe")
                            return true

                        } 
                    }
                });
            }
        } 
        return false
    }
}