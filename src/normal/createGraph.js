import Distribution from '../math/distribution.js';
import Data from '../display/data.js';
import Normal from '../math/normal.js';
import HoverInfo from '../display/hoverInfo.js';
import Labeling from '../display/labeling.js';

// This function handles p.setup and p.draw  
export default function createGraph(nValue, pValue, kValue, p, slider) {

    let canvas
    let nBar, pBar, yRangeBar, kBar

    // Global slider position
    
    let nVal = nValue
    let pVal = pValue
    let kVal = kValue
    
    let yRange = 0.5

    let distributionMath = new Distribution()
    let normalMath = new Normal()
    let hoverInfo = new HoverInfo([], p)
    let labeling = new Labeling(p)
    let dataDisplay = new Data(p, 700, 0, 420, 200)
    
    // Initialize canvas
    canvas = p.createCanvas(900, 420)

    const sliderYPosition = 360

    if (slider) {
        // Initialize slider
        nBar = p.createSlider(1, 150, nVal, 1)
        pBar = p.createSlider(0.01, 0.99, pVal, 0.01)
        kBar = p.createSlider(0, 150-1, 1)

        // Set slider
        nBar.position(20 + canvas.position().x, canvas.position().y + sliderYPosition)
        pBar.position(700 - pBar.width - 20 + canvas.position().x, canvas.position().y + sliderYPosition)
        kBar.position(20 + canvas.position().x, canvas.position().y + sliderYPosition + 40)
    }

    yRangeBar = p.createSlider(0.01, 1, yRange, 0.01)
    yRangeBar.position(700 / 2 - yRangeBar.width / 2 + canvas.position().x, canvas.position().y + sliderYPosition)

    // Draw the graph and calculate all constants
    p.draw = () => {

        if (typeof yRangeBar === 'undefined') {
            canvas = p.createCanvas(900, 420)
            yRangeBar = p.createSlider(0.01, 1, yRange, 0.01)
            yRangeBar.position(700 / 2 - yRangeBar.width / 2  + canvas.position().x, canvas.position().y + sliderYPosition)
        }

        // Reset screen
        p.background(240)


        if (slider) {
            
            // Get values from the sliders
            nVal = nBar.value()
            pVal = pBar.value()
            
            kVal = parseInt(p.map(kBar.value(), 0, 150, 0, nVal))

        }

        yRange = yRangeBar.value()

        // temp Variables 
        let mu = distributionMath.expectedValue(nVal, pVal)
        let sigma = distributionMath.standardDeviation(nVal, pVal)
        let variace = distributionMath.variance(nVal, pVal)
        let oneSigma = normalMath.calcInterval(sigma, mu, mu - sigma, mu + sigma)
        let twoSigma = normalMath.calcInterval(sigma, mu, mu - (2*sigma), mu + (2*sigma))
        let threeSigma = normalMath.calcInterval(sigma, mu, mu - (3*sigma), mu + (3*sigma))

        // Create labels for data 		
        dataDisplay.addLabel("μ", mu)
        dataDisplay.addLabel("P(μ)", normalMath.solve(mu, sigma, mu))
        dataDisplay.addLabel("P(X=k)", normalMath.solve(kVal, sigma, mu))
        dataDisplay.addLabel("σ", sigma)
        dataDisplay.addLabel("σ²", variace)
        dataDisplay.addLabel("[μ±σ]", '[' + Math.ceil(mu - sigma) + ':' + Math.floor(mu + sigma) + ']')
        dataDisplay.addLabel("[μ±2σ]", '[' + Math.ceil(mu - (2*sigma)) + ':' + Math.floor(mu + (2*sigma)) + ']')
        dataDisplay.addLabel("[μ±3σ]", '[' + Math.ceil(mu - (3*sigma)) + ':' + Math.floor(mu + (3*sigma)) + ']')
        
        dataDisplay.addLabel("P([μ±σ])", oneSigma)
        dataDisplay.addLabel("P([μ±2σ])", twoSigma)
        dataDisplay.addLabel("P([μ±3σ])", threeSigma)

        // Display dataDisplay 
        dataDisplay.display()

        // Set fill back
        p.fill(0)

        let highestProp = normalMath.solve(mu, sigma, mu)
        labeling.labelYAxis(50, 30, 600, 300, highestProp, yRange)

        p.strokeWeight(2)
        p.stroke(255, 0, 0)

        // Mark sigma intervals
        if(nVal <= 500) {
            
            // Calculate the +sigma value
            const getPlusSigmaMapped = (n) => {
                return p.map(mu + (n*sigma), 0, nVal, 50, 650)
            }

            // Calculate the -sigma value
            const getMinusSigmaMapped = (n) => {
                return p.map(mu - (n*sigma), 0, nVal, 50, 650)
            }


            // First sigma
            labeling.markInterval(30, 270, getMinusSigmaMapped(1), getPlusSigmaMapped(1), "[μ±σ]", p.color(255, 143, 21, 50), 50, 650)

            // Second sigma
            labeling.markInterval(30, 270, getMinusSigmaMapped(2), getPlusSigmaMapped(2), "[μ±2σ]", p.color(255, 143, 21, 50), 50, 650)

            // Third sigma
            labeling.markInterval(30, 270, getMinusSigmaMapped(3), getPlusSigmaMapped(3), "[μ±3σ]", p.color(255, 143, 21, 50), 50, 650)
        }
        
        
        
        const sublines = 600

        // plot function
        for (let i = 0; i < sublines; i++) {

            let x1 = 50 + i
            let y1 = 300 - p.map(normalMath.solve(p.map(i, 0, 600, 0, nVal), sigma, mu), 0, yRange, 0, 300 - 30)
            let x2 = 50 + i + 1
            let y2 = 300 - p.map(normalMath.solve(p.map(i + 1, 0, 600, 0, nVal), sigma, mu), 0, yRange, 0, 300 - 30)

            p.line(x1, y1, x2, y2)



            // Mark k 
            if (i === parseInt(p.map(kVal, 0, nVal-1, 0, 600))) {
                p.stroke('#ada')
                p.strokeWeight(1)

                let kLineXPos = p.map(kVal, 0, nVal, 0, 600)
                p.line(50 + kLineXPos, 300, 50 + kLineXPos, 30)

                p.stroke(255, 0, 0)
                p.strokeWeight(2)
            }
        }
        p.stroke(0)
        p.strokeWeight(1)

        labeling.xAxisNormal(50, 300, 600, nVal)


        let hoverMousePos = p.map(p.mouseX, 50, 650, 0, nVal)
        hoverInfo.showHoverWindowNormal(hoverMousePos, normalMath.solve(hoverMousePos, sigma, mu))

        p.noStroke()

        if (slider) {
            // Print bar values 
            p.text('n = ' + nVal, 20, sliderYPosition - 10)
            p.text('p = ' + Math.round(pVal * 100) + '%', 700 - pBar.width - 20, sliderYPosition - 10)
            p.text('k = ' + kVal, 20, sliderYPosition + 30)
        }
        p.text('yRange = ' + Math.round(yRange * 100) + '%', 700 / 2 - yRangeBar.width / 2, sliderYPosition - 10)
    }

    // Make sure the sliders are in place
    p.windowResized = () => {
        if (slider) {
            nBar.position(20 + canvas.position().x, canvas.position().y + canvas.height + sliderYPosition)
            pBar.position(700 - pBar.width - 20 + canvas.position().x, canvas.position().y + sliderYPosition)
            kBar.position(20 + canvas.position().x, canvas.position().y + sliderYPosition + 40)
        }
        yRangeBar.position(700 / 2 - yRangeBar.width / 2 + canvas.position().x, canvas.position().y + sliderYPosition)
    }

}
