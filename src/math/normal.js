export default class Normal {
    
    solve = (x, sD, eV) => {
        // Calculate the coefficient 
        let coef = 1 / (Math.sqrt(2 * Math.PI * Math.pow(sD, 2)))

        // Calculate the power 
        let power = -(Math.pow(x - eV, 2)) / (2 * Math.pow(sD, 2))

        return coef * Math.pow(Math.E, power)
    }

    // Calculates the cumulated propability of the most common values 
    // -> expectedValue +/- standard deviation
    mostCommonValues = (sD, eV) => {
        let sum = 0
        
        for(let i = (eV-sD); i<=(sD + eV); i+=0.05) {
            sum += this.solve(i, sD, eV) * 0.05
        }

        return sum
    }
}