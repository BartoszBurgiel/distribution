import Distribution from '../math/distribution.js';
import Bar from '../display/bar.js';
import Data from '../display/data.js';
import Binomial from '../math/binomial.js';
import HoverInfo from '../display/hoverInfo.js';
import Labeling from '../display/labeling.js';

// This function handles p.setup and p.draw  
export default function createGraph(nValue, pValue, kValue, p, slider) {

    let canvas
    let nBar, pBar, yRangeBar, kBar

    // Constants
    const sliderYPosition = 360   
    
    const graphWidth = 600
    const graphHeight = 300

    const graphXPos = 50
    const graphYPos = 30



    let nVal = nValue
    let pVal = pValue
    let kVal = kValue

    let yRange = 0.5

    let distributionMath = new Distribution()
    let binomialMath = new Binomial()
    let hoverInfo = new HoverInfo([], p)
    let labeling = new Labeling(p)
    let dataDisplay = new Data(p, 700, 0, 420, 200)

    canvas = p.createCanvas(900, 420)


    // Initialize canvas

    if (slider) {
        // Initialize slider
        nBar = p.createSlider(1, 150, nVal, 1)
        pBar = p.createSlider(0.01, 0.99, pVal, 0.01)
        kBar = p.createSlider(0, 149, kVal, 1)

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
            yRangeBar.position(700 / 2 - yRangeBar.width / 2 + canvas.position().x, canvas.position().y + sliderYPosition)
        }

        // Reset screen
        p.background(240)

        // Array with all bars
        let bars = []


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
        let mostCommonValues = binomialMath.binomMostCommon(nVal, pVal, sigma, mu)

        // Create labels for data 		
        dataDisplay.addLabel("μ", mu)
        dataDisplay.addLabel("P(μ)", binomialMath.bDistribution(nVal, pVal, Math.round(mu)))
        dataDisplay.addLabel("P(X=k)", binomialMath.bDistribution(nVal, pVal, kVal))
        dataDisplay.addLabel("σ", sigma)
        dataDisplay.addLabel("σ²", variace)
        dataDisplay.addLabel("[μ±σ]", '[' + Math.ceil(mu - sigma) + ':' + Math.floor(mu + sigma) + ']')
        dataDisplay.addLabel("P([μ±σ])", mostCommonValues)

        // Display dataDisplay 
        dataDisplay.display()

        // Set fill back
        p.fill(0)

        // Highest propability
        let highestProp = binomialMath.bDistribution(nVal, pVal, Math.floor(mu))

        if (binomialMath.bDistribution(nVal, pVal, Math.ceil(mu)) > highestProp) {
            highestProp = binomialMath.bDistribution(nVal, pVal, Math.ceil(mu))
        }

        labeling.labelYAxis(graphXPos, graphYPos, graphWidth, graphHeight, highestProp, yRange)

        // Generate bars
        for (let i = 0; i < nVal; i++) {
            bars[i] = new Bar(graphXPos + p.map(i, 0, nVal, 0, graphWidth), graphHeight, graphWidth / nVal, 0, 0, i)

            let currentPropability = binomialMath.bDistribution(nVal, pVal, i)

            // 300 - 30 because of the xPos margin
            let absHeight = p.map(currentPropability, 0, yRange, 0, graphHeight - graphYPos)
            bars[i].height = absHeight
            bars[i].prop = currentPropability

            if (kVal === i) {
                bars[i].display(p, '#22919D')
            } else {
                bars[i].display(p, 255)
            }


            labeling.labelXAxis(nVal, i, bars[i].xPos + bars[i].width / 2, bars[i].yPos + 20)
        }


        // Hovering 
        hoverInfo.bars = bars
        hoverInfo.showHoverWindow()

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
