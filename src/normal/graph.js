import Distribution from '../math/distribution.js';
import Data from '../display/data.js';
import Normal from '../math/normal.js';
import HoverInfo from '../display/hoverInfo.js'


export default function normalDistributionGraph(p) {

	let canvas
	let nBar, pBar
	let dataDisplay

	// Global slider position
	const sliderYPosition = 360

	let distributionMath = new Distribution()
	let normalMath = new Normal()
	let hoverInfo = new HoverInfo([], p)

	p.setup = () => {

		// Initialize canvas
		canvas = p.createCanvas(900, 400)

		// Initialize slider
		nBar = p.createSlider(50, 500, 250)
		pBar = p.createSlider(0.01, 0.99, 0.5, 0.01)

		// Set slider
		nBar.position(20, canvas.position().y + sliderYPosition)
		pBar.position(700 - pBar.width - 20, canvas.position().y + sliderYPosition)

		// Data class
		dataDisplay = new Data(p, 700, 0, 400, 200)
	}

	p.draw = () => {

		// Reset screen
		p.background(250)

		// Get values from the sliders
		const nVal = nBar.value()
		const pVal = pBar.value()

		// temp Variables 
		let mu = Math.ceil(distributionMath.expectedValue(nVal, pVal))
		let sigma = distributionMath.standardDeviation(nVal, pVal)
		let variace = distributionMath.variance(nVal, pVal)
		let mostCommomValues = normalMath.mostCommonValues(sigma, mu)

		// Create labels for data 		
		dataDisplay.addLabel("μ", mu)
		dataDisplay.addLabel("σ", sigma)
		dataDisplay.addLabel("σ²", variace)
		dataDisplay.addLabel("[μ±σ]", '['+(Math.round((mu-sigma)*100)/100)+':'+(Math.round((mu+sigma)*100)/100)+']')
		dataDisplay.addLabel("P[μ±σ])", mostCommomValues)

		// Display dataDisplay 
		dataDisplay.display()

		// Set fill back
		p.fill(0)

		let asd = 0

		// plot function
		for(let i = 0; i<600; i++) {

			let x1 = 30 + i
			let y1 = 300 - p.map(normalMath.solve(p.map(i, 0, 600, 0, nVal), sigma, mu), 0, 1, 0, 300)
			let x2 = 30 + i+1
			let y2 = 300 - p.map(normalMath.solve(p.map(i+1, 0, 600, 0, nVal), sigma, mu), 0, 1, 0, 300)

			if (normalMath.solve(p.map(i, 0, 600, 0, nVal), sigma, mu) > asd) {
				asd = normalMath.solve(p.map(i, 0, 600, 0, nVal), sigma, mu)
			}

			p.line(x1, y1, x2, y2)
		}

		let hoverMousePos = p.map(p.mouseX, 30, 630, 0, nVal)
		hoverInfo.showHoverWindowNormal(hoverMousePos, normalMath.solve(hoverMousePos, sigma, mu))

		p.text(asd, 40, 40)

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