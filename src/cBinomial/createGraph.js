import Distribution from '../math/distribution.js';
import Bar from '../display/bar.js';
import Data from '../display/data.js';
import Binomial from '../math/binomial.js';
import HoverInfo from '../display/hoverInfo.js';
import Labeling from '../display/labeling.js';
import Normal from '../math/normal.js';

export default function createGraph(nValue, pValue, kValue, alpha, p, slider) {
    let canvas
    let nBar, pBar, kBar, alphaBar

    // Global slider position
    const sliderYPosition = 360

    let nVal = nValue
    let pVal = pValue
    let kVal = kValue
    let alphaVal = alpha

    let distributionMath = new Distribution()
    let binomialMath = new Binomial()
    let hoverInfo = new HoverInfo([], p)
    let labeling = new Labeling(p)
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
        dataDisplay.addLabel("α", alphaVal)
        dataDisplay.addLabel("Ā", "[0;" + binomialMath.getDevianceIndex(nVal, pVal, alphaVal) + "]")
        dataDisplay.addLabel("A", "["+ (1+binomialMath.getDevianceIndex(nVal, pVal, alphaVal)) + ";"+nVal+"]")
        dataDisplay.addLabel("σ", distributionMath.standardDeviation(nVal, pVal))
        dataDisplay.addLabel("σ²", distributionMath.variance(nVal, pVal))

        // Display dataDisplay 
        dataDisplay.display()

        // Set fill back
        p.fill(0)

        labeling.labelYAxis(50, 100, 600, 300, 1, 1)

        // cumulated propability
        let propSum = 0

        if (nVal < 150) {

            // Generate bars
            for (let i = 0; i < nVal; i++) {
                let currentPropability = binomialMath.bDistribution(nVal, pVal, i)

                bars[i] = new Bar(50 + p.map(i, 0, nVal, 0, 600), 300, 600 / nVal, 0, 0, i)

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
                
                labeling.labelXAxis(nVal, i, bars[i].xPos + bars[i].width / 2, bars[i].yPos + 20)
            }
            labeling.markAlphaRange(70, 50, 600/nVal, 650, binomialMath.getDevianceIndex(nVal, pVal, alphaVal), nVal)
        } else {

            // // Infoscreen
            // p.fill(255)
            // p.rect(50, 100, 600, 200)
        
            // //p.textSize(24)

            // p.text("Leider aus performance-Gründen ist das Programm nicht in der Lage \n"+
            //         "den Histogramm anzuzeichnen", 60, 140)
        }
            

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