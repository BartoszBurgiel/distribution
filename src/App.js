import React from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper'
import SketchOnly from './components/sketchOnly.js';
import FromToCalculate from './components/formToCalculate.js';
import binomialDistributionGraph from './binomial/graph.js'
import normalDistributionGraph from './normal/graph.js'
import cumulatedBinomialDistributionGraph from './cBinomial/graph.js'

const App = () => {
	return (
		<>
			<FromToCalculate graph={binomialDistributionGraph} name="Binomialverteilung"></FromToCalculate>
			<FromToCalculate graph={normalDistributionGraph} name="Normalverteilung"></FromToCalculate>
			<FromToCalculate graph={cumulatedBinomialDistributionGraph} name="kumulierte Binomialverteilung"></FromToCalculate>

			<SketchOnly sketch={cumulatedBinomialDistributionGraph} />

		</>
	);
}

export default App;