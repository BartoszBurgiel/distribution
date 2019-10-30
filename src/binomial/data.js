// Data class will be used to create fields containing variables etc.
export default class Data {
    constructor(p, x, y, height, width) {
        this.p = p

        this.x = x
        this.y = y

        this.height = height
        this.width = width

        this.labels = new Map()
    }

    display () {

        // Background
        this.p.fill(255, 255, 255)
        this.p.rect(this.x, this.y, this.width, this.height)


        this.p.fill(0)
        this.p.textSize(24)
        this.p.text("Werte", this.x+20, this.y+30)
        this.p.textSize(12)

        // Display labels
        let i = 0

        this.p.fill(0)
        for (let [key, val] of this.labels) {
            //Print all lables      
            this.p.text(key+' = '+val , 20 + this.x, 60 + this.y + (this.height/this.labels.size) * i )
            i++
        }
    }

    addLabel(key, val) {
        this.labels.set(key, val)
    }

}
