import React from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper'
import SketchOnly from './components/sketchOnly.js';
import FromToCalculate from './components/formToCalculate.js';
import binomialDistributionGraph from './binomial/graph.js'
import normalDistributionGraph from './normal/graph.js'
import cumulatedBinomialDistributionGraph from './cBinomial/graph.js'
import Menu from './components/Menu.js'
import MenuElement from './components/MenuElement';

const App = () => {

	this.state = {
		sketch: ''
	}

	handler = () => {

	}

	return (
		<>
			<Menu name="Stochastik - Rechner">
				<Menu name="Playground">
					<MenuElement> Normalverteilung </MenuElement>
					<MenuElement> Binomialverteilung </MenuElement>
					<MenuElement> kumulierte Binomialverteilung </MenuElement>
				</Menu>

				<Menu name="Berechnen">
					<MenuElement> Normalverteilung </MenuElement>
					<MenuElement> Binomialverteilung </MenuElement>
					<MenuElement> kumulierte Binomialverteilung </MenuElement>
				</Menu>
			</Menu>
		</>
	);
}

export default App;