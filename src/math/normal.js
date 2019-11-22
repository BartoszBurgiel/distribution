export default class Normal {
    
    solve = (x, sD, eV) => {
        // Calculate the coefficient 
        let coef = 1 / (Math.sqrt(2 * Math.PI * Math.pow(sD, 2)))

        // Calculate the power 
        let power = -(Math.pow(x - eV, 2)) / (2 * Math.pow(sD, 2))

        return coef * Math.pow(Math.E, power)
    }

    // Calculates the area under the function under between the given interval  
    calcInterval = (sD, eV, start, end) => {
        let sum = 0
        
        const factor = 0.01

        for(let i = start; i<=end; i+=factor) {
            sum += this.solve(i, sD, eV) * factor
        }

        return sum
    }
}