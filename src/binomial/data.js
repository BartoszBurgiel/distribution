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
        fill(255);
        this.p.rect(this.y, this.x, this.width, this.height)

        // Display labels
        let i = 0

        for (let [key, val] of this.labels) {
            
            text(key+'='+val , 20 + this.x, 20 + this.y + (this.height/this.labels.length) )
            i++
        }
    }

    addLabel(key, val) {
        this.labels.set(key, val)
    }

}
