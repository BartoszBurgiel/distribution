export default class Normal {
    
    solve = (x, sD, eV) => {
        // Calculate the coefficient 
        let coef = 1 / (Math.sqrt(2 * Math.PI * Math.pow(sD, 2)))

        // Calculate the power 
        let power = -(Math.pow(x - eV, 2)) / (2 * Math.pow(sD, 2))

        return coef * Math.pow(Math.E, power)
    }

    plot = (x, sD, eV, n, width, height, xPos, yPos, p) => {
        for(let i = 0; i<=n;i+=p.map(i, 0, n, 0, width)) {
            p.line(p.map(i, 0, n, 0, width), p.map(this.solve(i, sD, eV), 0, 1, 0, height), p.map(i+1, 0, n, 0, width), p.map(this.solve(i+1, sD, eV), 0, 1, 0, height))
        }
    }
}