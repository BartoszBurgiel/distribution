import Distribution from "./distribution";

export default class Binomial extends Distribution {
    
    // calculate binomial distribution
    bDistribution = (n, p, k) => {
        return super.binomialCoef(n, k) * Math.pow(p, k) * Math.pow((1 - p), n - k)
    }
    
    // calculate binomial coefficient
    binomialCoef = (n, k) => {
        return super.factorial(n) / (super.factorial(k) * super.factorial(n - k))
    }
}