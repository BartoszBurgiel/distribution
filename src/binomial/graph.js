import Distribution from '../math/distribution.js';
import Bar from '../display/bar.js';
import Data from '../display/data.js';
import Binomial from '../math/binomial.js';
import HoverInfo from '../display/hoverInfo.js';
import Labeling from '../display/labeling.js';


export default function binomialDistributionGraph(p) {

	let canvas
	let nBar, pBar, yRangeBar
	let dataDisplay

	let yRange = 0.5

	// Global slider position
	const sliderYPosition = 360

	let distributionMath = new Distribution()
	let binomialMath = new Binomial()
	let hoverInfo = new HoverInfo([], p)
	let labeling = new Labeling(p)

	p.setup = () => {

		// Initialize canvas
		canvas = p.createCanvas(900, 400)

		// Initialize slider
		nBar = p.createSlider(1, 150)
		pBar = p.createSlider(0.01, 0.99, 0.5, 0.01)
		yRangeBar = p.createSlider(0.01, 0.99, yRange, 0.01)

		// Set slider
		nBar.position(20, canvas.position().y + sliderYPosition)
		pBar.position(700 - pBar.width - 20, canvas.position().y + sliderYPosition)
		yRangeBar.position(700/2 - yRangeBar.width/2, canvas.position().y + sliderYPosition)

		// Data class
		dataDisplay = new Data(p, 700, 0, 400, 200)
	}

	p.draw = () => {

		
		// Reset screen
		p.background(240)

		// Array with all bars
		let bars = []
		
		// Get values from the sliders
		const nVal = nBar.value()
		const pVal = pBar.value()

		// temp Variables 
		let mu = distributionMath.expectedValue(nVal, pVal)
		let sigma = distributionMath.standardDeviation(nVal, pVal)
		let variace = distributionMath.variance(nVal, pVal)
		let mostCommonValues = binomialMath.binomMostCommon(nVal, pVal, sigma, mu)

		// Create labels for data 		
		dataDisplay.addLabel("μ", mu)
		dataDisplay.addLabel("P(μ)", binomialMath.bDistribution(nVal, pVal, Math.round(mu)))
		dataDisplay.addLabel("σ", sigma)
		dataDisplay.addLabel("σ²", variace)
		dataDisplay.addLabel("[μ±σ]", '['+Math.ceil(mu-sigma)+':'+Math.floor(mu + sigma)+']')
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

		if (highestProp >= yRangeBar.value()) {
			yRange = 5*highestProp/4
		} else {
			yRange = yRangeBar.value()
		}

		labeling.labelYAxis(50, 30, 600, 300, highestProp, yRange)

		// Generate bars
		for (let i = 0; i < nVal; i++) {
			bars[i] = new Bar(50 + p.map(i, 0, nVal, 0, 600), 300, 600 / nVal, 0, 0, i)

			let currentPropability = binomialMath.bDistribution(nVal, pVal, i)

			// 300 - 30 because of the xPos margin
			let absHeight = p.map(currentPropability, 0, yRange, 0, 300-30)
			bars[i].height = absHeight
			bars[i].prop = currentPropability
			bars[i].display(p)

			labeling.labelXAxis(nVal, i, bars[i].xPos + bars[i].width/2, bars[i].yPos + 20)
		}


		// Hovering 
		hoverInfo.bars = bars
		hoverInfo.showHoverWindow()

		// Print bar values 
		p.text('n = ' + nVal, 20, sliderYPosition - 10)
		p.text('p = ' + Math.round(pVal * 100) + '%', 700 - pBar.width - 20, sliderYPosition - 10)
		p.text('yRange = ' + Math.round(yRange * 100) + '%', 700/2 - pBar.width/2, sliderYPosition - 10)
	}

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if (canvas) //Make sure the canvas has been created
			p.fill(newProps.color)
	}

	// Make sure the sliders are in place
	p.windowResized = () => {
		nBar.position(20, canvas.position().y + canvas.height + sliderYPosition)
		pBar.position(700 - pBar.width - 20, canvas.position().y + sliderYPosition)
		yRangeBar.position(700/2 - pBar.width/2, canvas.position().y + sliderYPosition)
	}
}