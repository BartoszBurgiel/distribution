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
					this.p.text(i, bar.xPos + bar.width/2 -4, bar.yPos+20)
				} else {					
					this.p.text(i, bar.xPos + bar.width/2, bar.yPos+20)
				}
			} else if (n < 100) {
				
				// Display every fifth
				if (i % 5 === 0) {					
					this.p.text(i, bar.xPos + bar.width/2 -4, bar.yPos+20)
				}
			} else {
				
				// Display every tenth
				if (i % 10 === 0) {					
					this.p.text(i, bar.xPos + bar.width/2 -8, bar.yPos+20)
				}
			}
    }
}