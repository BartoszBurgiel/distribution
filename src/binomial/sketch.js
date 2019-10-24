import Distribution from './math.js';
import Bar from './bar.js';

export default function sketch(p) {
	
	let canvas;
	let nBar, pBar;
	const sliderXPosition = 360;
	
	let m;
	m = new Distribution();
	console.log(this);


	p.setup = () => {
		canvas = p.createCanvas(700, 400);

		nBar = p.createSlider(0, 150);
		nBar.position(20, sliderXPosition);

		pBar = p.createSlider(0, 100);
		pBar.position(700 - p.width - 20, sliderXPosition);
	}

	p.draw = () => {

		// Array with all bars
		let bars = [];

		// Get values from the sliders
		const nVal = nBar.value();
		const pVal = pBar.value() / 100;

		p.background(220, 0, 230);

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


		// Y-Axis
		p.text(highestProp, 20, 80);

		// Actual axies
		p.line()

		// Print bars
		for (let i = 0; i < nVal; i++) {

			let prop = m.bDistribution(nVal, pVal, i);

			let absHeight = p.map(prop, 0, highestProp, 0, 200);
			bars[i].height = absHeight;
			bars[i].display(p);
		}


		// Print bar values 
		p.text(nVal, 20, sliderXPosition - 10);
		p.text(pVal, 700 - p.width - 20, sliderXPosition - 10);
	}

	p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if (canvas) //Make sure the canvas has been created
			p.fill(newProps.color);
	}
}