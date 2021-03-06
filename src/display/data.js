// Data class will be used to create field showing given labels
export default class Data {
    constructor(p, x, y, height, width) {
        this.p = p

        this.x = x
        this.y = y

        this.height = height
        this.width = width

        this.labels = new Map()
    }

    // Create rect showing all labels
    display () {

        this.p.stroke(0)
        // Background
        this.p.fill(255, 255, 255)
        this.p.rect(this.x, this.y, this.width, this.height)


        this.p.fill(0)
        this.p.textSize(24)
        this.p.text("Info", this.x+20, this.y+30)
        this.p.textSize(16)

        // Display labels
        let i = 0

        this.p.fill(0)
        this.p.noStroke()

        //Print all lables      
        for (let [key, val] of this.labels) {

            // if Val is not a number 
            if (typeof val === 'number') {
                this.p.text(key+' = '+Math.round(val*10000)/10000 , 10 + this.x, 70 + this.y + (this.height/this.labels.size) * 2 * i / 3 )
            } else {                
                this.p.text(key+' = '+val , 10 + this.x, 70 + this.y + (this.height/this.labels.size) * 2*i / 3)
            }
            
            i++
        }

        this.p.stroke(0)
        this.p.textSize(12)
    }

    // Add a label to the map
    addLabel(key, val) {
        this.labels.set(key, val)
    }

}
