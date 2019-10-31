export default class Distribution {

    standardDeviation = (n, p) => {
        return Math.sqrt(n * p * (1 - p))
    }

    expectedValue = (n, p) => {
        return n * p
    }

    variance = (n, p) => {
        return Math.pow(this.standardDeviation(n, p), 2)
    }
}
