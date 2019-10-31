import Distribution from '../math/distribution.js';
import Bar from '../display/bar.js';
import Data from '../display/data.js';
import Binomial from '../math/binomial.js';


export default function binomialDistributionGraph(p) {

	let canvas
	let nBar, pBar
	let dataDisplay

	// Global slider position
	const sliderYPosition = 360

	let distributionMath = new Distribution()
	let binomialMath = new Binomial()

	p.setup = () => {

		// Initialize canvas
		canvas = p.createCanvas(900, 400)

		// Initialize slider
		nBar = p.createSlider(1, 150)
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


		// Highest propability
		let highestProp = 0

		// Generate bars
		for (let i = 0; i < nVal; i++) {
			bars[i] = new Bar(30 + p.map(i, 0, nVal, 0, 600), 300, 600 / nVal, p)

			let currentPropability = binomialMath.bDistribution(nVal, pVal, i)

			// Find the highest propability
			if (currentPropability > highestProp && currentPropability <= 1) {
				highestProp = currentPropability
			}

			let absHeight = p.map(currentPropability, 0, 0.6, 0, 200)
			bars[i].height = absHeight
			bars[i].display(p)
		}


		// Y-Axis - Label
		p.text(Math.round(highestProp * 100) + '%', 20, 80)

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