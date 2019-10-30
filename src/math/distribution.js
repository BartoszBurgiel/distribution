export default class Distribution {
    // get factiorial of a given integer
    factorial = (n) => {
        if (n === 1) {
            return (1)
        } else if (n === 0) {
            return (0)
        } else {
            return (n * this.factorial(n - 1))
        }    
    }

    standardDeviation = (n, p) => {
        return Math.sqrt(n * p * (1-p))
    }

    expectedValue = (n, p) => {
        return n * p
    }
} 