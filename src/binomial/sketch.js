import Distribution from './math.js';
import Bar from './bar.js';

export default function sketch(p) {
	
	let canvas;
	let nBar, pBar;
	const sliderYPosition = 360;
	
	let m;
	m = new Distribution();

	p.setup = () => {
		canvas = p.createCanvas(700, 400);
		nBar = p.createSlider(0, 150);	
		pBar = p.createSlider(0, 1, 0.5, 0.01);

		nBar.position(20, canvas.position().y + sliderYPosition);
		pBar.position(700-pBar.width-20, canvas.position().y +sliderYPosition);
	}

	p.draw = () => {


		// Array with all bars
		let bars = [];

		// Get values from the sliders
		const nVal = nBar.value();
		const pVal = pBar.value();

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


		// Y-Axis - Label
		p.text(highestProp, 20, 80);

		p.strokeWeight(2);
		
		// Y - Axis
		p.line(30, 100, 30, 300);

		// X - Axis
		p.line(30, 300, 650, 300);

		p.strokeWeight(1);

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
		p.text('p = ' + (pVal*100)+'%', 700 - pBar.width - 20, sliderYPosition - 10);
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