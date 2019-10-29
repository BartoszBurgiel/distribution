// Distribution handles all mathematical functions needed for this project
export default class Distribution {

    // calculate binomial distribution
    bDistribution(n, p, k) {
        return this.binomialCoef(n, k) * Math.pow(p, k) * Math.pow((1 - p), n - k);
    }
    
    // calculate binomial coefficient
    binomialCoef = (n, k) => {

        let c = 1;
        for (var x = n-k+1; x <= n; x++) c *= x;
        for (x = 1; x <= k; x++) c /= x;

        return c
    }
    
    // get factiorial of a given integer
    factorial(n) {
        if (n == 1) {
            return (1);
        } else if (n == 0) {
            return (0);
        } else {
            return (n * this.factorial(n - 1));
        }    
    }
}