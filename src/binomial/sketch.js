import Distribution from './math.js';
import Bar from './bar.js';
import Data from './data.js';


export default function sketch(p) {
	
	let canvas;
	let nBar, pBar;
	let dataDisplay;
	const sliderYPosition = 360;
	
	let m;
	m = new Distribution();

	p.setup = () => {

		// Initialize canvas
		canvas = p.createCanvas(900, 400);

		// Initialize slider
		nBar = p.createSlider(0, 150);	
		pBar = p.createSlider(0.01, 0.99, 0.5, 0.01);

		// Set slider
		nBar.position(20, canvas.position().y + sliderYPosition);
		pBar.position(700-pBar.width-20, canvas.position().y +sliderYPosition);

		// Data class
		dataDisplay = new Data(p, 700, 0, 400, 200)
	}

	p.draw = () => {

		// Reset screen
		p.background(220, 0, 230);

		// Array with all bars
		let bars = [];

		// Get values from the sliders
		const nVal = nBar.value();
		const pVal = pBar.value();

		dataDisplay.display()

		p.fill(0);


		// Highest propability
		let highestProp = 0;

		// Generate bars
		for (let i = 0; i < nVal; i++) {
			bars[i] = new Bar(30 + p.map(i, 0, nVal, 0, 600), 300, 600 / nVal, p);

			let currentPropability = m.bDistribution(nVal, pVal, i);

			// Find the highest propability
			if (currentPropability > highestProp && currentPropability <= 1) {
				highestProp = currentPropability;
			}
		}


		// Y-Axis - Label
		p.text(Math.round(highestProp*100) + '%', 20, 80);

		// Print bars and x-axis labeling
		for (let i = 0; i < nVal; i++) {

			let prop = m.bDistribution(nVal, pVal, i);

			let absHeight = p.map(prop, 0, highestProp, 0, 200);
			bars[i].height = absHeight;
			bars[i].display(p);

			p.text(i+1, 30 + ((600 * i / nVal) + (600 * (i+1) / nVal)) / 2, 312.5);
		}


		// Print bar values 
		p.text('n = ' + nVal, 20, sliderYPosition - 10);
		p.text('p = ' + Math.round(pVal*100)+'%', 700 - pBar.width - 20, sliderYPosition - 10);
	}

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if (canvas) //Make sure the canvas has been created
			p.fill(newProps.color);
	}

	p.windowResized = () => {
		nBar.position(20, canvas.position().y+ canvas.height+sliderYPosition);
		pBar.position(700-pBar.width-20, canvas.position().y+sliderYPosition);
	}
}