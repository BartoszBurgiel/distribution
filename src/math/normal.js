import Distribution from "../binomial/math";

export default class Normal extends Distribution {
    
    solve = (x, sD, eV) => {
        // Calculate the coefficient 
        let coef = 1 / (Math.sqrt(2 * Math.PI * Math.pow(sD, 2)))

        // Calculate the power 
        let power = -(Math.pow(x - eV, 2)) / (2 * Math.pow(sD, 2))

        return coef * Math.pow(Math.E, power)
    }
}