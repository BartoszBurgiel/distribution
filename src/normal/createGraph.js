import Distribution from '../math/distribution.js';
import Data from '../display/data.js';
import Normal from '../math/normal.js';
import HoverInfo from '../display/hoverInfo.js';
import Labeling from '../display/labeling.js';

// This function handles p.setup and p.draw  
export default function createGraph(nValue, pValue, kValue, p, slider) {

    let canvas
    let nBar, pBar, yRangeBar, kBar
    
    // All of canvas constants
    const graph = {
        'width': 600, 
        'height': 300, 
        'xPos': 50,
        'yPos': 30,
        
        // Change if any varables changed 
        'endX': 600 + 50,
        'endY': 300 + 30,
    }

    // Fetch variables from the parameters [props] 
    let nVal = nValue
    let pVal = pValue
    let kVal = kValue
    
    let yRange = 0.5

    // Declare the classes
    let distributionMath = new Distribution()
    let normalMath = new Normal()
    let hoverInfo = new HoverInfo([], p)
    let labeling = new Labeling(p, graph)
    let dataDisplay = new Data(p, 700, 0, 420, 200)
    
    // Initialize canvas
    canvas = p.createCanvas(900, 420)


    // Constants
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
        dataDisplay.addLabel("f(μ)", normalMath.solve(mu, sigma, mu))
        dataDisplay.addLabel("f(X=k)", normalMath.solve(kVal, sigma, mu))
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

        labeling.labelYAxis(yRange)

        p.strokeWeight(2)
        p.stroke(255, 0, 0)

        // Mark sigma intervals
        if(nVal <= 500) {
            
            // Calculate the sigma value
            const getSigmaMapped = (n) => {
                return p.map(mu + (n*sigma), 0, nVal, graph.xPos, graph.endX)
            }

            // First sigma
            labeling.markInterval(getSigmaMapped(-1), getSigmaMapped(1), p.color(255, 143, 21, 50), 0, graph.endX)

            // Second sigma
            labeling.markInterval(getSigmaMapped(-2), getSigmaMapped(2), p.color(255, 143, 21, 50), 0, graph.endX)

            // Third sigma
            labeling.markInterval(getSigmaMapped(-3), getSigmaMapped(3), p.color(255, 143, 21, 50), 0, graph.endX)
        }
        
        
        
        const sublines = 600

        // Set stroke 
        p.stroke(255, 0, 0)

        // plot function
        for (let i = 0; i < sublines; i++) {

            let x1 = graph.xPos + i
            let y1 = graph.height - p.map(normalMath.solve(p.map(i, 0, graph.width, 0, nVal), sigma, mu), 0, yRange, 0, graph.height - graph.yPos)
            let x2 = graph.xPos + i + 1
            let y2 = graph.height - p.map(normalMath.solve(p.map(i + 1, 0, graph.width, 0, nVal), sigma, mu), 0, yRange, 0, graph.height - graph.yPos)

            p.line(x1, y1, x2, y2)

            // Mark k 
            if (i === parseInt(p.map(kVal, 0, nVal-1, 0, graph.width))) {
                p.stroke('#ada')
                p.strokeWeight(1)

                let kLineXPos = p.map(kVal, 0, nVal, 0, graph.width)
                p.line(graph.xPos + kLineXPos, graph.height, graph.xPos + kLineXPos, graph.yPos)

                p.stroke(255, 0, 0)
                p.strokeWeight(2)
            }
        }

        p.stroke(0)
        p.strokeWeight(1)

        labeling.xAxisNormal(nVal)


        let hoverMousePos = p.map(p.mouseX, graph.xPos, graph.xPos+graph.width, 0, nVal)
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
