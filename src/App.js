import React from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper'
import SketchOnly from './components/sketchOnly.js';
import FromToCalculate from './components/formToCalculate.js';
import binomialDistributionGraph from './binomial/graph.js'
import normalDistributionGraph from './normal/graph.js'
import cumulatedBinomialDistributionGraph from './cBinomial/graph.js'
import Menu from './components/Menu.js'

const App = () => {
	return (
		<>
			<Menu name="Stochastik - Rechner">
				<Menu name="Playground">
					<li> Normalverteilung </li>
					<li> Binomialverteilung </li>
					<li> kumulierte Binomialverteilung </li>
				</Menu>

				<Menu name="Berechnen">
					<li> Normalverteilung </li>
					<li> Binomialverteilung </li>
					<li> kumulierte Binomialverteilung </li>
				</Menu>
			</Menu>
		</>
	);
}

export default App;