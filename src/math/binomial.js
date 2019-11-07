export default class Binomial {

    // calculate binomial distribution
    bDistribution = (n, p, k) => {
        return this.binomialCoef(n, k) * Math.pow(p, k) * Math.pow((1 - p), n - k)
    }
    
    // calculate binomial coefficient
    binomialCoef = (n, k) => {
        if (k === 0) {
            return (1)
        }
        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k))
    }

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

    // Calculates the cumulated propability of the most common values 
    // -> expectedValue +/- standard deviation
    binomMostCommon = (n, p, sD, eV) => {
        let min = Math.ceil(eV - sD)
        let max = Math.floor(eV + sD)

        let sum = 0
        
        // Calculated the cumulated propability
        for(let i = min; i<=max; i++) {
            sum += this.bDistribution(n, p, i)
        }

        return sum
    } 

    // Calculate cumulated binomial distribution
    cumulatedBinom = (n, p, k) => {
        let sum = 0

        for (let i = 0; i <= k; i++) {
            sum += this.bDistribution(n, p, i)
        }

        return sum
    }
}