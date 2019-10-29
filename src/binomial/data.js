// Data class will be used to create fields containing variables etc.
export default class Data {
    constructor(n, prop, p, x, y, height, width) {
        this.n = n
        this.prop = prop
        this.p = p

        this.x = x
        this.y = y
        this.height = height
        this.width = width
    }

    display () {
        this.p.rect(this.y, this.x, this)
    }

    update (n, prop) {

        // Update attributes
        this.n = n 
        this.prop = prop
    }

}
