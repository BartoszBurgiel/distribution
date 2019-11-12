import Normal from './normal.js';

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

    // Return the index k of the last value 
    // that is lower than alpha
    getDevianceIndex = (n, p, alpha) => {
        let sum = 0
        
        let normal = new Normal()
        
        let sD = this.standardDeviation(n, p)
        let eV = this.variance(n, p)

        for(let i = 0; i<n; i++) {
            sum += normal.solve(i, sD, eV)

            if (sum > alpha) {
                return (i-1)
            }
        }
    }
}
