import Distribution from '../math/distribution.js';
import Data from '../display/data.js';
import Normal from '../math/normal.js';
import HoverInfo from '../display/hoverInfo.js'
import Labeling from '../display/labeling.js';


export default function normalDistributionGraph(p) {

	let canvas
	let nBar, pBar, yRangeBar
	let dataDisplay
	let yRange = 1

	// Global slider position
	const sliderYPosition = 360

	let distributionMath = new Distribution()
	let normalMath = new Normal()
	let hoverInfo = new HoverInfo([], p)
	let labeling = new Labeling(p)

	p.setup = () => {

		// Initialize canvas
		canvas = p.createCanvas(900, 400)

		// Initialize slider
		nBar = p.createSlider(100, 1000, 500)
		pBar = p.createSlider(0.01, 0.99, 0.5, 0.01)
		yRangeBar = p.createSlider(0.01, 0.99, yRange, 0.01)

		// Set slider
		nBar.position(20, canvas.position().y + sliderYPosition)
		pBar.position(700 - pBar.width - 20, canvas.position().y + sliderYPosition)
		yRangeBar.position(700 / 2 - yRangeBar.width / 2, canvas.position().y + sliderYPosition)

		// Data class
		dataDisplay = new Data(p, 700, 0, 400, 200)
	}

	p.draw = () => {

		// Reset screen
		p.background(240)

		// Get values from the sliders
		const nVal = nBar.value()
		const pVal = pBar.value()
		yRange = yRangeBar.value()

		// temp Variables 
		let mu = distributionMath.expectedValue(nVal, pVal)
		let sigma = distributionMath.standardDeviation(nVal, pVal)
		let variace = distributionMath.variance(nVal, pVal)
		let mostCommomValues = normalMath.mostCommonValues(sigma, mu)

		// Highest propability
		let highestPropability = normalMath.solve((nVal * pVal), sigma, mu)

		labeling.labelYAxis(50, 30, 600, 300, highestPropability, yRange)

		// Create labels for data 		
		dataDisplay.addLabel("μ", mu)
		dataDisplay.addLabel("P(μ)", highestPropability)
		dataDisplay.addLabel("σ", sigma)
		dataDisplay.addLabel("σ²", variace)
		dataDisplay.addLabel("[μ±σ]", '['+(Math.round((mu-sigma)*100)/100)+':'+(Math.round((mu+sigma)*100)/100)+']')
		dataDisplay.addLabel("P[μ±σ])", mostCommomValues)

		// Display dataDisplay 
		dataDisplay.display()

		// Set fill back
		p.fill(0)

		let sublines = 600

		p.strokeWeight(2)
		p.stroke(255, 0, 0)
		
		// plot function
		for(let i = 0; i<sublines; i++) {

			let x1 = 50 + i
			let y1 = 300 - p.map(normalMath.solve(p.map(i, 0, 600, 0, nVal), sigma, mu), 0, yRange, 0, 300-30)
			let x2 = 50 + i+1
			let y2 = 300 - p.map(normalMath.solve(p.map(i + 1, 0, 600, 0, nVal), sigma, mu), 0, yRange, 0, 300-30)

			p.line(x1, y1, x2, y2)
		}
		p.stroke(0)
		p.strokeWeight(1)

		labeling.xAxisNormal(50, 300, 600, nVal)
		
		let hoverMousePos = p.map(p.mouseX, 50, 650, 0, nVal)
		hoverInfo.showHoverWindowNormal(hoverMousePos, normalMath.solve(hoverMousePos, sigma, mu))

		// Print bar values 
		p.text('n = ' + nVal, 20, sliderYPosition - 10)
		p.text('p = ' + Math.round(pVal * 100) + '%', 700 - pBar.width - 20, sliderYPosition - 10)
		p.text('yRange = ' + Math.round(yRange * 100) + '%', 700 / 2 - pBar.width / 2, sliderYPosition - 10)
	}

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if (canvas) //Make sure the canvas has been created
			p.fill(newProps.color)
	}

	// Make sure the sliders are in place
	p.windowResized = () => {
		nBar.position(20, canvas.position().y + canvas.height + sliderYPosition)
		pBar.position(700 - pBar.width - 20, canvas.position().y + sliderYPosition)
		yRangeBar.position(700 / 2 - pBar.width / 2, canvas.position().y + sliderYPosition)
	}
}