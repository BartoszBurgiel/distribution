import Distribution from '../math/distribution.js';
import Bar from '../display/bar.js';
import Data from '../display/data.js';
import Binomial from '../math/binomial.js';
import HoverInfo from '../display/hoverInfo.js';
import Labeling from '../display/labeling.js';

export default function createGraph(nValue, pValue, kValue, alpha, p, slider) {
    let canvas
    let nBar, pBar, kBar, alphaBar

    // Constants
    const sliderYPosition = 360

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

    // Fetch data from parameters [props]
    let nVal = nValue
    let pVal = pValue
    let kVal = kValue
    let alphaVal = alpha

    // Declare external classess
    let distributionMath = new Distribution()
    let binomialMath = new Binomial()
    let hoverInfo = new HoverInfo([], p)
    let labeling = new Labeling(p, graph)
    let dataDisplay = new Data(p, 700, 0, 420, 200)


    // Initialize canvas
    canvas = p.createCanvas(900, 420)

    if (slider) {
        // Initialize slider
        nBar = p.createSlider(1, 150, nVal, 1)
        pBar = p.createSlider(0.01, 0.99, pVal, 0.01)
        kBar = p.createSlider(0, 149, kVal, 1)
        alphaBar = p.createSlider(0.001, 0.999, alphaVal, 0.001)

        // Set slider
        nBar.position(20 + canvas.position().x, canvas.position().y + sliderYPosition)
        pBar.position(700 - pBar.width - 20 + canvas.position().x, canvas.position().y + sliderYPosition)
        kBar.position(700 / 2 - kBar.width / 2 + canvas.position().x, canvas.position().y + sliderYPosition)
        alphaBar.position(20 + canvas.position().x, canvas.position().y + sliderYPosition + 40)
    }


    p.draw = () => {

        // Reset screen
        p.background(240)

        // Array with all bars
        let bars = []

        if (slider) {

            // Get values from the sliders
            nVal = nBar.value()
            pVal = pBar.value()
            kVal = parseInt(p.map(kBar.value(), 0, 150, 0, nVal))

            alphaVal = alphaBar.value()
        }

        // Create labels for data 		
        dataDisplay.addLabel("μ", distributionMath.expectedValue(nVal, pVal))
        dataDisplay.addLabel("P(X ≤ k)", binomialMath.cumulatedBinom(nVal, pVal, kVal))
        dataDisplay.addLabel("σ", distributionMath.standardDeviation(nVal, pVal))
        dataDisplay.addLabel("σ²", distributionMath.variance(nVal, pVal))
        dataDisplay.addLabel("α", alphaVal)
        dataDisplay.addLabel("P(X ≤ k) < α", "[0;" + (binomialMath.getDevianceIndex(nVal, pVal, alphaVal)-1) + "]")
        dataDisplay.addLabel("P(X ≤ k) > α", "[" + (binomialMath.getDevianceIndex(nVal, pVal, alphaVal)) + ";" + nVal + "]")


        // Set fill back
        p.fill(0)

        labeling.labelYAxis(1)

        // Calculate the deviance index
        let devIndex = binomialMath.getDevianceIndex(nVal, pVal, alphaVal)   

        // Fit devIndex to the graph
        let devIndexMapped = p.map(devIndex, 0, nVal, graph.xPos, graph.endX)

        // Mark alpha intervals
        labeling.markInterval(graph.xPos, devIndexMapped, p.color(37, 186, 0, 70), 0, graph.endX)
        labeling.markInterval(devIndexMapped, graph.endX, p.color(255, 77, 77, 70), 0, graph.endX)
        
        // cumulated propability
        let propSum = 0

        // Generate bars
        for (let i = 0; i < nVal; i++) {
            let currentPropability = binomialMath.bDistribution(nVal, pVal, i)

            // Define bar
            bars[i] = new Bar(graph.xPos + p.map(i, 0, nVal, 0, graph.width), graph.height, graph.width / nVal, 0, 0, i)

            // Add to the sum 
            propSum += currentPropability

            // Calculate, set and display bar's hight
            let absHeight = p.map(propSum, 0, 1, 0, 200)
            bars[i].height = absHeight
            bars[i].prop = propSum
            
            if (kVal === i) {
                bars[i].display(p, '#22919D')
            } else {
                bars[i].display(p, 255)
            }
            
            
            labeling.labelXAxis(nVal, i, bars[i].getMiddle(), bars[i].yPos + 20)
        }
        
        // Display dataDisplay 
        dataDisplay.addLabel("α", alphaVal)
        dataDisplay.display()

        hoverInfo.bars = bars
        hoverInfo.showHoverWindow()

        p.noStroke()

        if (slider) {
            // Print bar values 
            p.text('n = ' + nVal, 20, sliderYPosition - 10)
            p.text('p = ' + Math.round(pVal * 100) + '%', 700 - pBar.width - 20, sliderYPosition - 10)
            p.text('k = ' + kVal, 700 / 2 - kBar.width / 2, sliderYPosition - 10)
            p.text('α = ' + alphaVal, 20, sliderYPosition + 40)
        }
    }

    // Make sure the sliders are in place
    p.windowResized = () => {
        if (slider) {
            nBar.position(20 + canvas.position().x, canvas.position().y + canvas.height + sliderYPosition)
            pBar.position(700 - pBar.width - 20 + canvas.position().x, canvas.position().y + sliderYPosition)
            kBar.position(700 / 2 - kBar.width / 2 + canvas.position().x, canvas.position().y + sliderYPosition)
            alphaBar.position(20 + canvas.position().x, canvas.position().y + sliderYPosition + 40)
        }
    }
}