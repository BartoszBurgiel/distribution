export default class Distribution {

    standardDeviation = (n, p) => {
        return Math.sqrt(n * p * (1 - p))
    }

    expectedValue = (n, p) => {
        return n * p
    }
}
