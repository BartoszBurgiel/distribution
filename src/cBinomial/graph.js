import Distribution from '../math/distribution.js';
import Bar from '../display/bar.js';
import Data from '../display/data.js';
import Binomial from '../math/binomial.js';
import HoverInfo from '../display/hoverInfo.js';


export default function cumulatedBinomialDistributionGraph(p) {

	let canvas
	let nBar, pBar
	let dataDisplay

	// Global slider position
	const sliderYPosition = 360

	let distributionMath = new Distribution()
	let binomialMath = new Binomial()
	let hoverInfo = new HoverInfo([], p)

	p.setup = () => {

		// Initialize canvas
		canvas = p.createCanvas(900, 400)

		// Initialize slider
		nBar = p.createSlider(0, 150)
		pBar = p.createSlider(0.01, 0.99, 0.5, 0.01)

		// Set slider
		nBar.position(20, canvas.position().y + sliderYPosition)
		pBar.position(700 - pBar.width - 20, canvas.position().y + sliderYPosition)

		// Data class
		dataDisplay = new Data(p, 700, 0, 400, 200)
	}

	p.draw = () => {

		// Reset screen
		p.background(220, 0, 230)

		// Array with all bars
		let bars = []

		// Get values from the sliders
		const nVal = nBar.value()
		const pVal = pBar.value()

		// Create labels for data 		
		dataDisplay.addLabel("μ", distributionMath.expectedValue(nVal, pVal))
		dataDisplay.addLabel("σ", distributionMath.standardDeviation(nVal, pVal))
		dataDisplay.addLabel("σ²", distributionMath.variance(nVal, pVal))

		// Display dataDisplay 
		dataDisplay.display()

		// Set fill back
		p.fill(0)


		// cumulated propability
		let propSum = 0

		// Generate bars
		for (let i = 1; i < nVal; i++) {
			let currentPropability = binomialMath.bDistribution(nVal, pVal, i)
			
			bars[i] = new Bar(30 + p.map(i, 0, nVal, 0, 600), 300, 600 / nVal, 0, 0, i)

			propSum += currentPropability
	
			// Calculate, set and display bar's hight
			let absHeight = p.map(propSum, 0, 1, 0, 200)
			bars[i].height = absHeight
			bars[i].prop = propSum
			bars[i].display(p)
		}

		hoverInfo.bars = bars
		hoverInfo.showHoverWindow()

		// Print bar values 
		p.text('n = ' + nVal, 20, sliderYPosition - 10)
		p.text('p = ' + Math.round(pVal * 100) + '%', 700 - pBar.width - 20, sliderYPosition - 10)
	}

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if (canvas) //Make sure the canvas has been created
			p.fill(newProps.color)
	}

	// Make sure the sliders are in place
	p.windowResized = () => {
		nBar.position(20, canvas.position().y + canvas.height + sliderYPosition)
		pBar.position(700 - pBar.width - 20, canvas.position().y + sliderYPosition)
	}
}