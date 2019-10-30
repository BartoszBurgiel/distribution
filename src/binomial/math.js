// Distribution handles all mathematical functions needed for this project
export default class Distribution {

    // calculate binomial distribution
    bDistribution = (n, p, k) => {
        return this.binomialCoef(n, k) * Math.pow(p, k) * Math.pow((1 - p), n - k)
    }
    
    // calculate binomial coefficient
    binomialCoef = (n, k) => {
        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k))
    }
    
    // get factiorial of a given integer
    factorial = (n) => {
        if (n == 1) {
            return (1)
        } else if (n == 0) {
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
